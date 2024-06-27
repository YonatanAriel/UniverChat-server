"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicChatSocketServices = void 0;
const publicChatSocketServices = (io) => {
    io.on("connection", (socket) => {
        // Handle chat events (e.g., messages)
        socket.on("publicMessage", (data) => {
            // Broadcast the message to all connected clients
            console.log("message data - ", data.msgText, data.userName, " | ", data.timestamp, data.localSenderId);
            io.emit("receiveMessage", data);
        });
    });
};
exports.publicChatSocketServices = publicChatSocketServices;
