import express from "express"
import app from "./app"
import env from "./config/env";
import { judgeQueueEvents } from "./queue/judge.events";

const startServer = async () => {
  try {
    await judgeQueueEvents.waitUntilReady()
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
