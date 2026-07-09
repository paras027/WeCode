import { Worker } from "bullmq"
import { connectRedis } from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";
import Submission from "../models/submission.model";
import Problem from "../models/problem.model";
import { publisher } from "../config/pubsub";

export const worker = new Worker("judgeQueue", async (job) => {
    // console.log(" got the job here",job)
    console.log("Job user id----------------------: ", job.data.userId)
    const subId = job.data.submissionId
    let submission = await Submission.findByIdAndUpdate(job.data.submissionId, {
        userId:job.data.userId,
        status: "Running"
    }, { new: true });
    if (!submission) {
        console.error("Submission not found:", job.data.submissionId);
        return;
    }
    await publisher.publish("submission-update", JSON.stringify({
        submission, userId: job.data.userId
    }))
    const probId = submission.problemId;
    const problem = await Problem.findById(probId)
    if (!problem) {
        console.log("Problem not found");
        return;
    }
    let testcases = problem?.testCases || [];
    const code = submission.code as string
    let Runtime = 0;
    console.log(typeof (testcases));
    const output = await submissionService(code, testcases, submission.language!, problem.timeLimit, problem.memoryLimit,subId);
    console.log("Value checking: ", output)
    if (!output) {
        console.log("Nothing came out of the execution")
        return
    }
    console.log("Value checking: ", output)
    submission = await Submission.findByIdAndUpdate(job.data.submissionId, {
        verdict: output.verdict,
        error: output.error,
        runtime: output.runtime,
        memory:output.memory,
        result: output.result,
        status: "Accepted"
    }, { new: true });
    console.log("new data: ", submission)
    await publisher.publish("submission-update", JSON.stringify({
        submission, userId: job.data.userId
    }))
},
    {
        connection: connectRedis
    })

console.log("worker started")
