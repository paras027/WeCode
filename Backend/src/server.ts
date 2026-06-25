import app from "./index"
import env from './config/env';
import { connectDB } from "./config/db";
import { initializeSocket } from "./socket/socket";
import http from "http"

const startServer = async () => {
  try {
    const server = http.createServer(app);
    initializeSocket(server);
    await connectDB();
    server.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  }
  catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
}

startServer();
