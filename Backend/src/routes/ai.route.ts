import { Router } from "express";
import { aiController,aiHintController, aiReviewController } from "../controllers/Ai.controller";
import {isAuthenticated} from '../middlewares/auth.middleware';
import { generalLimiter } from '../middlewares/rateLimiter.middleware';
import {chat} from "../controllers/rag.controller"
const router  = Router();

router.post("/explain-compilation-error",isAuthenticated,generalLimiter,aiController);
router.post("/hint",isAuthenticated,generalLimiter,aiHintController);
router.post("/review/:submissionId",aiReviewController);
router.post("/chat",chat);

export default router