import {rateLimit} from "express-rate-limit"

export const generalLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests. Please try again later"
    }
})

export const forgotPassLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:3,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests. Please try again later"
    }
})

export const loginLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:5,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests. Please try again later"
    }
})