import { submissionService } from "./submission.services.";
import Submission from "../../models/submission.model";
import Problem from "../../models/problem.model";
import { publisher } from "../../config/pubsub";
import logger from "../../config/logger";
import { runService } from "./runService";

interface JobData{
    userId:string,
    language:string,
    problemId:object,
    code:string
}
export async function problemRun(jobData:JobData){
    console.log("Job user id----------------------: ", jobData.userId)

    const probId = jobData.problemId;
    const problem = await Problem.findById(probId)
    if (!problem) {
        logger.error("problem not found")
        throw new Error("Problem not found")
    }
    let testcases = problem?.examples || [];
    const code = jobData.code
    let Runtime = 0;
    console.log(typeof (testcases));
    const output = await runService(code, testcases, jobData.language, problem.timeLimit, problem.memoryLimit);
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
        newdata, userId: jobData.userId
    }))
}