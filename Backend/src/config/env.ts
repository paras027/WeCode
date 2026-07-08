import dotenv from 'dotenv';
import {SignOptions} from "jsonwebtoken"
dotenv.config();

const env = {
    PORT:process.env.PORT || 5000,
    MONGO_URI:process.env.MONGO_URI || "",
    NODE_ENV:process.env.NODE_ENV || "development",
    JWT_SECRET:process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"],
    RESEND_API_KEY:process.env.RESEND_API_KEY||''
}

export default env;