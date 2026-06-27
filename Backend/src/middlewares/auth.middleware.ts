import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from 'express';
import ApiError from "../utils/ApiError";
import jwt from 'jsonwebtoken';
import env from "../config/env";
import User from "../models/users.model";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: any
}

interface JwtPayload {
    id: string,
    role: string
}

export const isAuthenticated = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if(!token)
    {
        throw new ApiError(404,"UnAuthorized")
    }
    let decoded;
    try {
        decoded = verifyToken(token) as JwtPayload;
    } catch (err) {
        throw new ApiError(401, "Invalid or expired token");
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
})