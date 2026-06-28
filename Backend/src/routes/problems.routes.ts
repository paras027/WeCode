import express from 'express';
import { createProblem, getProblem, updateProblem, deleteProblem, getOneProblem,submitCode } from '../controllers/problems.controller';
import {isAuthenticated} from '../middlewares/auth.middleware';
import {isAdmin} from '../middlewares/role.middleware';

const router = express.Router();

router.get("/problem", getProblem);
router.get("/problem/:id", getOneProblem);
router.post("/problem",isAuthenticated, isAdmin, createProblem);
router.put("/problem/:id",isAuthenticated, isAdmin, updateProblem);
router.delete("/problem/:id",isAuthenticated, isAdmin, deleteProblem);
router.post("/submit",submitCode)

export default router;