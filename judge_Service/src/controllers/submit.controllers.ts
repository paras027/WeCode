import { Request,Response } from "express";
import { generateCppFile } from "../services/compiler/generateCppFile";
import { executeCode } from "../services/compiler/execute.services";
export function submitController(req:Request,res:Response){
    const code = req.body.code;
    let path:string = generateCppFile(code);
    let output = executeCode(path);
    res.status(201).json({
        message:"code sent successfully",
        result: output
    })
}