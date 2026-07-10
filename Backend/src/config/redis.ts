import IORedis from "ioredis"
import env from "./env"
console.log(env.REDIS_HOST)
console.log(env.REDIS_PORT)

export const connectRedis = new IORedis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    maxRetriesPerRequest: null,
})

connectRedis.on("connect",()=>{
    console.log("redis connected in problem service")
})