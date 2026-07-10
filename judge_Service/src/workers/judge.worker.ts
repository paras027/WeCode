import { Worker } from "bullmq"
import { connectRedis } from "../config/redis"
import logger from "../config/logger";

import { problemSubmission } from "../services/compiler/problemSubmission";
export const worker = new Worker("judgeQueue", async (job) => {
    // console.log(" got the job here",job)
    await problemSubmission(job.data);
},
    {
        connection: connectRedis
    })

logger.info("Submit Worker started")
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