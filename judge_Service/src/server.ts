import express from "express"
import app from "./app"
import env from "./config/env";
import { judgeQueueEvents } from "./queue/judge.events";
import { runEvents } from "./queue/run.event";
import "./workers/judge.worker"
import "./workers/run.worker"
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    await connectDB();
    await judgeQueueEvents.waitUntilReady()
    await runEvents.waitUntilReady()
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  }
  catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
}

startServer();
