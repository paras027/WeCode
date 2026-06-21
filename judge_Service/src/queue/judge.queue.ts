import { Queue } from "bullmq";
import { connectRedis } from "../config/redis";

export const judgeQueue = new Queue("judgeQueue",{
    connection:connectRedis,
});