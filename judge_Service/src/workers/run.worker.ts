import { Worker } from "bullmq"
import { connectRedis } from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";
import Submission from "../models/submission.model";
import Problem from "../models/problem.model";
import { publisher } from "../config/pubsub";

export const worker = new Worker("runQueue", async (job) => {
    // console.log(" got the job here",job)
    console.log("Job user id----------------------: ", job.data.userId)


    const probId = job.data.problemId;
    const problem = await Problem.findById(probId)
    if (!problem) {
        console.log("Problem not found");
        return;
    }
    let testcases = problem?.examples || [];
    const code = job.data.code as string
    let Runtime = 0;
    console.log(typeof (testcases));
    const output = await submissionService(code, testcases, job.data.language!, problem.timeLimit, problem.memoryLimit);

    console.log("Value checking: ", output)
    if (!output) {
        console.log("Nothing came out of the execution")
        return
    }
    console.log("Value checking: ", output)
    const newdata =  {
        verdict: output.verdict,
        error: output.error,
        runtime: output.runtime,
        result: output.result,
        status: "Accepted"
    };
    // console.log("new data: ", newdata)
    await publisher.publish("run-update", JSON.stringify({
        newdata, userId: job.data.userId
    }))
},
    {
        connection: connectRedis
    })

console.log("run worker started")
