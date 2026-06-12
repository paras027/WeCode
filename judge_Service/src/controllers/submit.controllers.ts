import { Request,Response } from "express";
import { generateCppFile } from "../services/compiler/generateCppFile";
import { executeCode } from "../services/compiler/execute.services";
import { generateInputFile } from "../services/compiler/generateInputFile";


export async function submitController(req:Request,res:Response){
    const code = req.body.code;
    const input  = req.body.input;
    console.log("worked")
    let path:string = generateCppFile(code);
    let inputPath: string  = generateInputFile(input);
    let output = await executeCode(path,inputPath);
    res.status(201).json({
        message:"code sent successfully",
        result: output
    })
}