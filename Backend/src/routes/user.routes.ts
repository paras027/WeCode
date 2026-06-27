import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getMe } from "../controllers/user.controller";
const router = express.Router();

router.get("/me",isAuthenticated,getMe);

export default router;