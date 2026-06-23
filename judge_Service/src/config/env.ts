import dotenv from "dotenv"

dotenv.config();

const env={
    PORT:process.env.PORT || 4000,
    MONGO_URI:process.env.MONGO_URI || "",
    NODE_ENV:process.env.NODE_ENV || "development",
}

export default env;