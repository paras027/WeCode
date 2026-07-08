import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import User from "../models/users.model";
import bcrypt from 'bcryptjs';
import env from "../config/env";
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { generateToken, generateRefreshToken } from "../utils/jwt";
import crypto from "crypto"
import { Resend } from "resend"

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, username, email, password, role } = req.body;
    console.log(req.body)
    if (!name || !username || !email || !password || !role) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        role,
    })

    const token = generateToken(user._id.toString(), user.role)
    const refreshToken = generateRefreshToken(user._id.toString(), user.role)

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("token", token, {
        httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message: "User registered successfully",
        user,
        success: true
    })
    console.log("worked")
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credentials");
    }

    const token = generateToken(user._id.toString(), user.role)
    const refreshToken = generateRefreshToken(user._id.toString(), user.role)

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("token", token, {
        httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({
        message: "User Logged in successfully",
        user,
        success: true
    })
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    })
})


export const forgotPass = asyncHandler(async (req: Request, res: Response) => {

    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(200).json({
            success: true,
            message:
                "If an account with this email exists, a reset link has been sent."
        });
    }
    console.log("worked or not")
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save()

    const resend = new Resend(env.RESEND_API_KEY)
    const resetLink =
        `http://localhost:8080/reset-password/${resetToken}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Your Password',
        html: `<h2>Password Reset</h2>

            <p>
Click below to reset your password.
</p>

           ${resetLink}"
            Reset Password
            </ a >

        <p>
        This link expires in 10 minutes.
</p>`
    });
    console.log("asdasd")
    return res.status(200).json({
        success: true,
        message:
            "If an account with this email exists, a reset link has been sent."
    });

})

export const resetPass = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token as string;
    const { password } = req.body;

    const presentToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(presentToken)
    const user = await User.findOne({
        passwordResetToken: presentToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    })

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired reset link."
        );
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null;

    user.passwordResetExpires = null;
    await user.save();
    return res.status(200).json({
        success: true,
        message:
            "Password updated successfully."
    });
})

interface MyJwtPayload {
    userId: string;
    role: string;
}

export const refreshToken = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken as string;
    console.log(refreshToken)
    if (!refreshToken) {
        throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(
        refreshToken,
        env.JWT_REFRESH_SECRET!
    ) as MyJwtPayload;
    console.log("decoded: ",decoded)
    const user = await User.findById(decoded.userId);

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    if (user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

    const accessToken = generateToken(
        user._id.toString(),
        user.role
    );

    res.cookie(
        "token",
        accessToken, {
        httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000
    }
    );

    return res.status(200).json({
        success: true,
        accessToken
    });
});