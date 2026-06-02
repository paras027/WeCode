import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from 'express';
import ApiError from "../utils/ApiError";
import jwt from 'jsonwebtoken';
import env from "../config/env";
import User from "../models/user.model";


export interface AuthRequest extends Request{
    user?:any
}

interface JwtPayload{
    id:string,
    role:string
}

export const isAuthenticated = asyncHandler(async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new ApiError(401,"Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,env.JWT_SECRET as string) as JwtPayload;

    const user = await User.findById(decoded.id);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    
    req.user = user;
    next();
})