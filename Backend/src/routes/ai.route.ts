import { Router } from "express";
import { aiController } from "../controllers/Ai.controller";

const router  = Router();

router.post("/explain-compilation-error",aiController);

export default router