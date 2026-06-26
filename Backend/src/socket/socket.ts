import { Server } from "socket.io";

export let io: Server;

export function initializeSocket(server: any) {

    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    

    io.on("connection", (socket) => {

        console.log("Client Connected:", socket.id);
        const userId = socket.handshake.query.userId as string
        if(userId)
        {
            socket.join(userId)
            console.log("Joined Room: ",userId)
        }
        
        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });

    });
 
}