import { Request,Response } from "express";
import { judgeQueue } from "../queue/judge.queue";
import { judgeQueueEvents } from "../queue/judge.events";

export async function submitController(req:Request,res:Response){
    const code = req.body.code;
    const input  = req.body.input;
    console.log("worked")
    const job = await judgeQueue.add("submission",{
        code:code,
        input:input
    })
    const result = await job.waitUntilFinished(judgeQueueEvents)
    console.log(result+"Result we got from workererrrr")
    res.status(201).json({
        message:"Result",
        result: result,
    })
}