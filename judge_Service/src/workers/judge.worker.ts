import {Worker} from "bullmq"
import {connectRedis} from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";

export const worker = new Worker("judgeQueue",async(job)=>{
    console.log("got the job here")
    const output = await submissionService(job.data.code,job.data.input);
    console.log(output);
    return output
},
{
    connection:connectRedis
})

console.log("worker started")
