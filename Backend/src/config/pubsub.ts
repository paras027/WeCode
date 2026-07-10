import IORedis from "ioredis"
import { io } from "../socket/socket";
import logger from "./logger";
import env from "./env";

export const subscriber = new IORedis({
    host:env.REDIS_HOST,
    port:env.REDIS_PORT
})

export const publisher = new IORedis({
    host:env.REDIS_HOST,
    port:env.REDIS_PORT
})

export function setSubscriber(){
    subscriber.subscribe("submission-update",(err)=>{
        if(err)
        {
            logger.error(`error: ${err}`);
            return;
        }
        logger.info("Subscribed")
    })
    subscriber.subscribe("run-update",(err)=>{
        if(err)
        {
            logger.error(`error: ${err}`);
            return;
        }
        logger.info("Subscribed")
    })

    subscriber.on("message",(channel,message)=>{
        const data = JSON.parse(message);
        logger.info(`User id coming or not: ${data}`)
        if(channel === "submission-update")
        {
            io.to(data.userId).emit("submission-update",data);
        }
        else
        {
            io.to(data.userId).emit("run-update",data);
        }
    }) 
}