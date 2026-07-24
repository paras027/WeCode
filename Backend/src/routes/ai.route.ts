import { Router } from "express";
import { aiController } from "../controllers/Ai.controller";
import {isAuthenticated} from '../middlewares/auth.middleware';
import { generalLimiter } from '../middlewares/rateLimiter.middleware';
const router  = Router();

router.post("/explain-compilation-error",isAuthenticated,generalLimiter,aiController);

export default router