import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt";
export let io: Server;
import logger from "../config/logger";

export function initializeSocket(server: any) {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:8080",
            credentials: true,
        },
    });

    io.use((socket, next) => {
        try{
            logger.info("Socker middleware executed")
        const cookieHeader = socket.handshake.headers.cookie
        if (!cookieHeader) {
            return next(new Error("No cookie found"));
        }
        const token = cookieHeader
            .split("; ")
            .find((cookie) => cookie.startsWith("token="))
            ?.split("=")[1];

        console.log(token);
        if (!token) {
            return next(new Error("Token not found"));
        }
        const payload = verifyToken(token);
        console.log(payload)
        socket.data.user = payload
        next();
        }
        catch(e)
        {
            throw new Error("Unauthorized")
        }
        
    })

    io.on("connection", (socket) => {

        logger.info(`Client Connected: ${socket.id}`);

        const userId = socket.data.user.userId
        if (userId) {
            socket.join(userId)
            logger.info(`Joined Room: ${userId}`)
        }

        socket.on("disconnect", () => {
            logger.info(`Disconnected: ${socket.id}`);
        });

    });

}