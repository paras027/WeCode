import express from "express"
import { submitController } from "../controllers/submit.controllers";
const route = express.Router();

route.post("/code",submitController);

export default route;