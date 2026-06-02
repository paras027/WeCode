import { Request, Response, NextFunction } from 'express';
import {AuthRequest} from './auth.middleware';
import ApiError from '../utils/ApiError';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user.role !== "admin")
    {
        throw new ApiError(403,"Access denied");
    }
    next();
};