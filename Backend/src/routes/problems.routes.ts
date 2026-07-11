import express from 'express';
import {  getProblem, getOneProblem,submitCode,runCode,submissions } from '../controllers/problems.controller';
import {isAuthenticated} from '../middlewares/auth.middleware';
import {isAdmin} from '../middlewares/role.middleware';
import { generalLimiter } from '../middlewares/rateLimiter.middleware';
const router = express.Router();

router.get("/problem", generalLimiter,getProblem);
router.get("/problem/:id",generalLimiter, getOneProblem);
router.post("/submit",isAuthenticated,generalLimiter, submitCode)
router.get("/submissions/:id",isAuthenticated,generalLimiter, submissions)
router.post("/run",isAuthenticated,generalLimiter, runCode)

export default router;