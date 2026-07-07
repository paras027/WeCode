import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getMe, userDetails } from "../controllers/user.controller";
const router = express.Router();

router.get("/me",isAuthenticated,getMe);

router.get("/details",isAuthenticated,userDetails);

export default router;