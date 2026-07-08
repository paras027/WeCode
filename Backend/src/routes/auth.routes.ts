import express from "express";

import { registerUser, loginUser, logout, forgotPass, resetPass } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema } from "../validations/auth.validation";
const router = express.Router();

router.post("/register",validate(signupSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);
router.post("/logout",logout);
router.post("/forgot-password", forgotPass)
router.post("/reset-password/:token", resetPass)

export default router;