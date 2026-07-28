import { Request,Response } from "express";
import { compilationExplanation } from "../services/AiService";
import asyncHandler from "../utils/asyncHandler";
import { generateHints } from "../services/AiService";
import { generateReview } from "../services/AiService";


type ReviewParams = {
    submissionId: string;
};

export const aiController = asyncHandler(async(req:Request,res:Response)=>{
    const {code,language,compileError} = req.body;
    console.log("reached here")
    const result = await compilationExplanation({code,language,compileError});

     return res.status(200).json({
            success: true,
            data: result,
        });

})


export const aiHintController = asyncHandler(async(req:Request,res:Response)=>{
    const hint = await generateHints(req.body);

    return res.status(200).json({
        hint,
        message:"Hint Generated"
    })
})

export const aiReviewController = asyncHandler(async(req:Request,res:Response)=>{
    const {submissionId} = req.params;
    console.log("sub id: ",submissionId)
    if (!submissionId) {
        return res.status(400).json({
            success: false,
            message: "Submission ID is required.",
        });
    }

    const review = await generateReview(submissionId as string);

    return res.status(200).json({
        success:true,
        data:review
    })

})