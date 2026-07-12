import { Queue } from "bullmq";
import { connectRedis } from "../config/redis";

export const runQueue = new Queue("runQueue",{
    connection:connectRedis,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:2000
        },
        removeOnComplete:true,
        removeOnFail:100,
    },
});