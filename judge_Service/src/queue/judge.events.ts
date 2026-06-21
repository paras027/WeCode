import { QueueEvents } from "bullmq";
import { connectRedis } from "../config/redis";
export const judgeQueueEvents = new QueueEvents("judgeQueue",{
    connection:connectRedis
})

