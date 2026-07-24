import { Request,Response } from "express";
import { compilationExplanation } from "../services/AiService";
import asyncHandler from "../utils/asyncHandler";
import { generateHints } from "../services/AiService";

export const aiController = asyncHandler(async(req:Request,res:Response)=>{
    const {code,language,compileError} = req.body;
    console.log("reached here")
    const result = await compilationExplanation({code,language,compileError});

     return res.status(200).json({
            success: true,
            data: result,
        });

})


export const aiHintController = asyncHandler(async(req,res)=>{
    const hint = await generateHints(req.body);

    return res.status(200).json({
        hint,
        message:"Hint Generated"
    })
})