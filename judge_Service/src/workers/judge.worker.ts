import {Worker} from "bullmq"
import {connectRedis} from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";
import Submission from "../models/submission.model";
import Problem from "../models/problem.model";
import { publisher } from "../config/pubsub";

export const worker = new Worker("judgeQueue",async(job)=>{
    // console.log(" got the job here",job)
    console.log("Job user id----------------------: ",job.data.userId)
    const data = await Submission.findByIdAndUpdate(job.data.submissionId,{
        status:"Running"
    },{new:true});
    if(!data)
    {
        console.log("Got nthing")
    }
    await publisher.publish("submission-update",JSON.stringify({
            data,userId:job.data.userId
    }))
    const probId = data?.problemId;
    const problem = await Problem.findById(probId)
    let testcases = problem?.testCases || [];
    const code = data!.code as string
    let verdict = ""
    let error = ""
    let result = []
    let Runtime = 0;
    for(const testcase of testcases){
        const output = await submissionService(code,testcase.input);
        if(output.message == "Compilation Error")
        {
            verdict = "Compilation Error"
            error = output.output
            break;
        }
        if(output.message == "Runtime Error")
        {
            verdict = "Runtime Error"
            error = output.output
            break;
        }
        if(output.message == "TLE")
        {
            verdict = "Time Limit Exceeded"
            error = output.output
            break;
        }
        Runtime+=output.Runtime
        let ans = {
            input:testcase.input,
            expected:testcase.output,
            output:output.output,
            passed:testcase.output.trim() === output.output.trim()
        }
        if(ans.passed===false)
        {
            verdict = "Wrong Answer"
            result.push(ans);
            break;
        }
        result.push(ans);
    }
    if(verdict==="")
    {
        verdict = "Passed"
        const data = await Submission.findByIdAndUpdate(job.data.submissionId,{
            status:"Accepted",
            verdict:"Passed",
            result:result,
            runtime:Runtime
        },{new:true});
        await publisher.publish("submission-update",JSON.stringify({
            data,userId:job.data.userId
        }))
    }
    else{
        try{
            const data = await Submission.findByIdAndUpdate(job.data.submissionId,{
                status:"Accepted",
                verdict:verdict,
                result:result,
                error:error,
                runtime:Runtime
            },{new:true});
            await publisher.publish("submission-update",JSON.stringify({
                data,userId:job.data.userId
            }))
        }
        catch(e){
            console.log("error: ",e)
        }
        
    }
},
{
    connection:connectRedis
})

console.log("worker started")
