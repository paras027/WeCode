import { QueueEvents } from "bullmq";
import { connectRedis } from "../config/redis";
export const runEvents = new QueueEvents("runQueue",{
    connection:connectRedis
})

