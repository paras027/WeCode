import { QueueEvents } from "bullmq";
import { connectRedis } from "../config/redis";
export const runEvents = new QueueEvents("runQueue",{
    connection:connectRedis
})

runEvents.on("completed",({jobId})=>{
    console.log(`Job ${jobId} completed`)
})

runEvents.on("failed",({jobId})=>{
    console.log(`Job ${jobId} failed`)
})

runEvents.on("stalled",({jobId})=>{
    console.log(`Job ${jobId} stalled`)
})

