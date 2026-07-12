import { Worker } from "bullmq"
import { connectRedis } from "../config/redis"
import { submissionService } from "../services/compiler/submission.services.";
import Problem from "../models/problem.model";
import { publisher } from "../config/pubsub";
import logger from "../config/logger";
import { problemRun } from "../services/compiler/problemRun";

export const worker = new Worker("runQueue", async (job) => {
    // console.log(" got the job here",job)
    await problemRun(job.data)
},
    {
        connection: connectRedis
    })

logger.info("Run Worker started")
process.on("SIGINT",async()=>{
    logger.info("Shutting down Submit Worker")
    await worker.close();
    await connectRedis.quit();
    process.exit(0);
})

process.on("SIGTERM",async()=>{
    logger.info("Shutting down Submit Worker")
    await worker.close();
    await connectRedis.quit();
    process.exit(0);
})
