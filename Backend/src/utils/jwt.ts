import jwt from "jsonwebtoken"
import env from "../config/env"
interface JwtPayload {
    userId: string,
    role: string
}
export const generateToken = (userId: string, role: string) => {
    return jwt.sign(
        {
            userId, role
        }, env.JWT_SECRET,
        {
           expiresIn: "15min",
        })
}
export const generateRefreshToken = (userId: string, role: string) => {
    return jwt.sign(
        {
            userId, role
        }, env.JWT_REFRESH_SECRET,
        {
           expiresIn: "7d",
        })
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token,env.JWT_SECRET)as JwtPayload;
}