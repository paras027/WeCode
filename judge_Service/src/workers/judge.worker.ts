import {Worker} from "bullmq"
import {connectRedis} from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";
import Submission from "../models/submission.model";
import Problem from "../models/problem.model";

export const worker = new Worker("judgeQueue",async(job)=>{
    // console.log(" got the job here",job)
    const data = await Submission.findByIdAndUpdate(job.data.submissionId,{
        status:"Running"
    });
    if(!data)
    {
        console.log("Got nthing")
    }
    const probId = data?.problemId;
    const problem = await Problem.findById(probId)
    let testcases = problem?.testCases || [];
    console.log(data?.code)
    let verdict = ""
    let error = ""
    let result = []
    for(const testcase of testcases){
        const output = await submissionService(data?.code,testcase.input);
        console.log("output of the result ",output);
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
        });
    }
    else{
        try{
            const data = await Submission.findByIdAndUpdate(job.data.submissionId,{
                status:"Accepted",
                verdict:verdict,
                result:result,
                error:error
            });
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
