import express from 'express';
import asyncHandler from './utils/asyncHandler';
import ApiError from './utils/ApiError';
import errorMiddleware from './middlewares/error.middleware';
import User from './models/users.model';
import authRoutes from './routes/auth.routes';
import problemRoutes from './routes/problems.routes';
import getMe from './routes/user.routes'
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin:"http://localhost:8080",
    credentials:true
}))
app.use(express.json());
console.log("app loaded successfully"); 
app.use(cookieParser())
app.get('/test',asyncHandler(async (req,res)=>{
    const user = await User.create({
        name:"Paras",
        email:"abc#gmail.com",
        password:"134",
    })
    res.json(user);
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user",getMe)
app.use("/api/v1/problems", problemRoutes);

app.use(errorMiddleware);

export default app;

