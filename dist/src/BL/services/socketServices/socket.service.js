"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServices = void 0;
const socketServices = (io) => {
    io.on("connection", (socket) => {
        // Handle chat events (e.g., messages)
        socket.on("publicMessage", (data) => {
            // Broadcast the message to all connected clients
            console.log("message data - ", data.msgText, data.userName, " | ", data.timestamp, data.userId);
            io.emit("receiveMessage", data);
        });
        // socket.on("joinRoom", (room: string) => {
        //   socket.join(room);
        //   console.log(`User ${socket.id} joined room: ${room}`);
        // });
        // socket.on("leaveRoom", (room: string) => {
        //   socket.leave(room);
        //   console.log(`User ${socket.id} left room: ${room}`);
        // });
        socket.on("loggedInPublicMessage", (data) => {
            console.log(`Logged-in message - ${data.msgText}, ${data.userName}, ${data.timestamp}, ${data.userId}`);
            // io.to("loggedInRoom").emit("receiveMessage", data);
            io.to("loggedInRoom").emit("receiveMessage", data);
        });
    });
};
exports.socketServices = socketServices;
