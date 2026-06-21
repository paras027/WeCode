import {Worker} from "bullmq"
import {connectRedis} from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";

const worker = new Worker("judgeQueue",async(job)=>{
    const output = await submissionService(job.data.code,job.data.input);
    console.log(output);
    return output
},
{
    connection:connectRedis
})

console.log("worker started")
