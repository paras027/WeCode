import IORedis from "ioredis"
import { io } from "../socket/socket";
import logger from "./logger";

export const subscriber = new IORedis({
    host:"127.0.0.1",
    port:6379
})

export const publisher = new IORedis({
    host:"127.0.0.1",
    port:6379
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