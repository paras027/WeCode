import express from "express";

import { registerUser, loginUser, logout, forgotPass, resetPass,refreshToken } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema } from "../validations/auth.validation";
import { loginLimiter,forgotPassLimiter } from "../middlewares/rateLimiter.middleware";

const router = express.Router();

router.post("/register",validate(signupSchema),registerUser);
router.post("/login",loginLimiter, validate(loginSchema),loginUser);
router.post("/logout",logout);
router.post("/forgot-password", forgotPassLimiter,forgotPass)
router.post("/reset-password/:token", resetPass)
router.post("/refresh-token", refreshToken);

export default router;