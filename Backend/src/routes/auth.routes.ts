import express from "express";

import { registerUser, loginUser, logout } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema } from "../validations/auth.validation";

const router = express.Router();

router.post("/register",validate(signupSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);
router.post("/logout",logout);
export default router;