import mongoose from "mongoose";
import env from "./env";

export const connectDB = async()=>{
    
    try{
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(e){
        console.error("MongoDB connection failed:", e);
        process.exit(1); // Exit process with failure
    }
};
 