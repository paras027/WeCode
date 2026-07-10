import dotenv from "dotenv"

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});
console.log("Redis Host: ",process.env.REDIS_HOST)
const env={
    PORT:process.env.PORT || 4000,
    MONGO_URI:process.env.MONGO_URI || "",
    NODE_ENV:process.env.NODE_ENV || "development",
    REDIS_HOST:process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT:Number(process.env.REDIS_PORT) || 6379
}

export default env;