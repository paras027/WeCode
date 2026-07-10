import { QueueEvents } from "bullmq";
import { connectRedis } from "../config/redis";
export const judgeQueueEvents = new QueueEvents("judgeQueue",{
    connection:connectRedis
})

judgeQueueEvents.on("completed",({jobId})=>{
    console.log(`Job ${jobId} completed`)
})

judgeQueueEvents.on("failed",({jobId})=>{
    console.log(`Job ${jobId} failed`)
})

judgeQueueEvents.on("stalled",({jobId})=>{
    console.log(`Job ${jobId} stalled`)
})
