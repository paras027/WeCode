import express from 'express';
import {  getProblem, getOneProblem,submitCode,runCode,submissions } from '../controllers/problems.controller';
import {isAuthenticated} from '../middlewares/auth.middleware';
import {isAdmin} from '../middlewares/role.middleware';

const router = express.Router();

router.get("/problem", getProblem);
router.get("/problem/:id", getOneProblem);
router.post("/submit",isAuthenticated, submitCode)
router.get("/submissions/:id",isAuthenticated, submissions)
router.post("/run",isAuthenticated, runCode)

export default router;