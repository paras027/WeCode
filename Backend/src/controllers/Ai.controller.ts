import { Request,Response } from "express";
import { compilationExplanation } from "../services/AiService";
import asyncHandler from "../utils/asyncHandler";
export const aiController = asyncHandler(async(req:Request,res:Response)=>{
    const {code,language,compileError} = req.body;
    console.log("reached here")
    const result = await compilationExplanation({code,language,compileError});

     return res.status(200).json({
            success: true,
            data: result,
        });

})