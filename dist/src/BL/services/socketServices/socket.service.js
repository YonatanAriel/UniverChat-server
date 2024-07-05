"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServices = void 0;
let roomsMessages = {
    public: [],
    loggedInPublic: [],
};
const socketServices = (io) => {
    io.on("connection", (socket) => {
        // socket.on("publicMessage", (data: Message) => {
        //   io.emit("receiveMessage", data);
        // });
        socket.on("send message", (data) => {
            const isPrivateMessage = data.isPrivate;
            console.log(`User ${socket.id} sent message ${data}`);
            if (!isPrivateMessage) {
                io.to(data.to).emit("receive message", data);
            }
            else {
            }
        });
        socket.on("joinRoom", (room, callback) => {
            socket.join(room);
            // callback(roomsMessages[room]);
            console.log(`User ${socket.id} joined room: ${room}`);
        });
        // socket.on("leaveRoom", (room: string) => {
        //   socket.leave(room);
        //   console.log(`User ${socket.id} left room: ${room}`);
        // });
    });
};
exports.socketServices = socketServices;
