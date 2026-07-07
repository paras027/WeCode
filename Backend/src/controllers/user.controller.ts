import asyncHandler from "../utils/asyncHandler"
import { AuthRequest } from "../middlewares/auth.middleware"
import Submission from "../models/submission.model"

export const getMe = asyncHandler(async(req:AuthRequest,res)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
})


export const userDetails = asyncHandler(async(req:AuthRequest,res)=>{
    const id = req.user._id;

    const submissions = await Submission.find()

})