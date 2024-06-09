"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicChatSocketServices = void 0;
const publicChatSocketServices = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        // Handle chat events (e.g., messages)
        socket.on("publicMessage", (data) => {
            // Broadcast the message to all connected clients
            console.log(data.text, "11111");
            io.emit("publicMessage", data);
        });
    });
};
exports.publicChatSocketServices = publicChatSocketServices;
