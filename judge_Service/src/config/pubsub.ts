import IORedis from "ioredis"
import env from "./env"

export const publisher = new IORedis({
    host:env.REDIS_HOST,
    port:env.REDIS_PORT
})