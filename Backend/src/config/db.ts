import mongoose from "mongoose";
import env from "./env";
import logger from "./logger";

export const connectDB = async()=>{
    
    try{
        await mongoose.connect(env.MONGO_URI);
        logger.info("MongoDB connected successfully");
    }
    catch(e){
        logger.error(`MongoDB connection failed: ${e}`);
        process.exit(1); // Exit process with failure
    }
};
 