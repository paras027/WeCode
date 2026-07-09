import jwt from "jsonwebtoken"
import env from "../config/env"
interface JwtPayload {
    userId: string,
}
export const generateToken = (userId: string) => {
    return jwt.sign(
        {
            userId
        }, env.JWT_SECRET,
        {
           expiresIn: "15min",
        })
}
export const generateRefreshToken = (userId: string) => {
    return jwt.sign(
        {
            userId
        }, env.JWT_REFRESH_SECRET,
        {
           expiresIn: "7d",
        })
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token,env.JWT_SECRET)as JwtPayload;
}