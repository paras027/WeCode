import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: any) {

    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {

        console.log("Client Connected:", socket.id);

        socket.emit("hello", {
            message: "Welcome to WeCode Socket!"
        });

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });

    });
 
}