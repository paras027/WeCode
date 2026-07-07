import asyncHandler from "../utils/asyncHandler"
import { AuthRequest } from "../middlewares/auth.middleware"
import Submission from "../models/submission.model"
import Problem from "../models/problem.model"

export const getMe = asyncHandler(async(req:AuthRequest,res)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
})


export const userDetails = asyncHandler(async(req:AuthRequest,res)=>{
    const id = req.user._id;

    const submissions = await Submission.find({userId:id})
    console.log(submissions)
    return res.status(201).json({
        user:req.user,sub:submissions,
    })

})