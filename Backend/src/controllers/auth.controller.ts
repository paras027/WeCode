import asyncHandler from "../utils/asyncHandler"; 
import ApiError from "../utils/ApiError";
import User from "../models/user.model";
import bcrypt from 'bcryptjs';
import env from "../config/env";
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const registerUser = asyncHandler(async(req:Request,res:Response)=>{
    const {name,email,password,role}= req.body;

    if(!name || !email || !password || !role){
        throw new ApiError(400,"All fields are required");
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new ApiError(400,"User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    })

    res.status(201).json({
        message:"User registered successfully",
        user,
        success:true
    })

})

export const loginUser = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"All fields are required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404,"User not found");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        throw new ApiError(400,"Invalid credentials");
    }

    const token = jwt.sign({id:user._id,role:user.role},env.JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({
        message:"User logged in successfully",
        token,
        success:true
    })
})