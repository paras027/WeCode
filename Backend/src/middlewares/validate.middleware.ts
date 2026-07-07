import { ZodType } from "zod";
import { Request,Response,NextFunction } from "express";

export const validate = (schema:ZodType)=>(req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req.body);
    if(!result.success)
    {
        return res.status(400).json({
            success:false,
            message:"validation Failed",
            errors:result.error
        })
    }
    console.log("validated")
    req.body = result.data;
    next();

}