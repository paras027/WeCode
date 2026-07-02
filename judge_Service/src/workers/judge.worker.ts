import { Worker } from "bullmq"
import { connectRedis } from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";
import Submission from "../models/submission.model";
import Problem from "../models/problem.model";
import { publisher } from "../config/pubsub";

export const worker = new Worker("judgeQueue", async (job) => {
    // console.log(" got the job here",job)
    console.log("Job user id----------------------: ", job.data.userId)
    const data = await Submission.findByIdAndUpdate(job.data.submissionId, {
        status: "Running"
    }, { new: true });
    if (!data) {
        console.error("Submission not found:", job.data.submissionId);
        return;
    }
    await publisher.publish("submission-update", JSON.stringify({
        data, userId: job.data.userId
    }))
    const probId = data.problemId;
    const problem = await Problem.findById(probId)
    let testcases = problem?.testCases || [];
    const code = data.code as string

    let Runtime = 0;
    console.log(typeof (testcases));
    const output = await submissionService(code, testcases, data.language!);
    console.log("Value checking: ",output)
    if(!output)
    {
        console.log("Nothing came out of the execution")
        return
    }
    console.log("Value checking: ",output)
    const newdata = await Submission.findByIdAndUpdate(job.data.submissionId, {
                    verdict: output.verdict,
                    error: output.error,
                    runtime: output.runtime,
                    result:output.result,
                    status:"Accepted"
                }, { new: true });
                console.log("new data: ",newdata)
                await publisher.publish("submission-update", JSON.stringify({
                    newdata, userId: job.data.userId
                }))
},
    {
        connection: connectRedis
    })

console.log("worker started")
