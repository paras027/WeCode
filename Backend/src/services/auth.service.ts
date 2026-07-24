import User from "../models/users.model";
import ApiError from "../utils/ApiError";
import { generateToken, generateRefreshToken } from "../utils/jwt";
import bcrypt from 'bcryptjs';

export async function registerService(name:string, username:string, email:string, password:string){
    const existingUser = await User.findOne({ email });

    if (existingUser) {
   
        throw new ApiError(400, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword
    })

    const token = generateToken(user._id.toString())
    const refreshToken = generateRefreshToken(user._id.toString())

    user.refreshToken = refreshToken;
    await user.save();

    return {user,token}
}