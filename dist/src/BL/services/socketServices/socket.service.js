"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServices = void 0;
const messages_service_1 = __importDefault(require("../messages.service"));
let roomsMessages = {
    public: [],
    loggedInPublic: [],
};
const socketServices = (io) => {
    io.on("connection", (socket) => {
        socket.on("send message", (data) => {
            console.log(data);
            const isPrivateMessage = data.isPrivate;
            console.log(`User ${socket.id} sent message ${data}`);
            if (!isPrivateMessage) {
                console.log(`Emitting to room: ${String(data === null || data === void 0 ? void 0 : data.chatRoomId)}`);
                io.to(String(data === null || data === void 0 ? void 0 : data.chatRoomId)).emit("receive message", data);
            }
            else {
            }
            const shouldSaveInDB = data.isLoggedIn;
            if (shouldSaveInDB) {
                console.log("need to store");
                messages_service_1.default.addMessage(data);
            }
        });
        socket.on("joinRoom", (room, callback) => {
            socket.join(String(room));
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
