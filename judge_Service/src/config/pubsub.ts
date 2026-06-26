import IORedis from "ioredis"

export const publisher = new IORedis({
    host:"127.0.0.1",
    port:6379
})