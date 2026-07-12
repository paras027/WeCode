import { submissionService } from "./submission.services.";
import Submission from "../../models/submission.model";
import Problem from "../../models/problem.model";
import { publisher } from "../../config/pubsub";
import logger from "../../config/logger";

interface JobData{
    userId:string,
    submissionId:object
}
export async function problemSubmission(jobData:JobData){
    console.log("Job user id----------------------: ", jobData.userId)
    const subId = jobData.submissionId
    let submission = await Submission.findByIdAndUpdate(jobData.submissionId, {
        userId:jobData.userId,
        status: "Running"
    }, { new: true });
    logger.info(`submission update: ${submission}`)
    if (!submission) {
        logger.error("Submission not found")
       throw new Error("Submission not found")
    }
    await publisher.publish("submission-update", JSON.stringify({
        submission, userId: jobData.userId
    }))
    const probId = submission.problemId;
    const problem = await Problem.findById(probId)
    if (!problem) {
        logger.error("problem not found")
        throw new Error("Problem not found")
    }
    let testcases = problem?.testCases || [];
    const code = submission.code as string
    let Runtime = 0;
    console.log(typeof (testcases));
    const output = await submissionService(code, testcases, submission.language!, problem.timeLimit, problem.memoryLimit,subId);
    if (!output) {
        logger.error("Nothing came out of the execution")
        throw new Error("Nothing came out of the execution")
    }
    submission = await Submission.findByIdAndUpdate(jobData.submissionId, {
        verdict: output.verdict,
        error: output.error,
        runtime: output.runtime,
        memory:output.memory,
        result: output.result,
        status: "Accepted"
    }, { new: true });

    await publisher.publish("submission-update", JSON.stringify({
        submission, userId: jobData.userId
    }))
}