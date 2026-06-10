import express from "express"
import cors from "cors"
import SubmitRoute from "./routes/submit.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/submit",SubmitRoute);

export default app;
