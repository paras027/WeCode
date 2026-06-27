import asyncHandler from "../utils/asyncHandler"
import { AuthRequest } from "../middlewares/auth.middleware"

export const getMe = asyncHandler(async(req:AuthRequest,res)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
})