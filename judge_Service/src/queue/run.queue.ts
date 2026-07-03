import { Queue } from "bullmq";
import { connectRedis } from "../config/redis";

export const runQueue = new Queue("runQueue",{
    connection:connectRedis,
});