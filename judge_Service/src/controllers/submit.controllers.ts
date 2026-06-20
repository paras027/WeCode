import { Request,Response } from "express";
import { submissionService } from "../services/compiler/submission.services.";


export async function submitController(req:Request,res:Response){
    const code = req.body.code;
    const input  = req.body.input;
    console.log("worked")
    const output = await submissionService(code,input);
    console.log(output)
    res.status(201).json({
        message:"Result",
        result: output,
    })
}