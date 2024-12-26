"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServices = void 0;
const messages_service_1 = __importDefault(require("../messages.service"));
const users_service_1 = __importDefault(require("../users.service"));
// import translationQueue from "../translationServices/translationQueue";
//for after I download the libreTranslation
let roomsMessages = {
    public: [],
    loggedInPublic: [],
};
const socketServices = (io) => {
    io.on("connection", (socket) => {
        socket.on("send message", (data) => {
            var _a;
            const userImg = (_a = users_service_1.default.getUserById(String(data.userId))) === null || _a === void 0 ? void 0 : _a.photo;
            data.userImg = userImg;
            const isPrivateMessage = data.isPrivate;
            console.log(`User ${socket.id} sent message ${data}`);
            if (!isPrivateMessage) {
                console.log(`Emitting to room: ${String(data === null || data === void 0 ? void 0 : data.chatRoomId)}`);
                io.to(String(data === null || data === void 0 ? void 0 : data.chatRoomId)).emit("receive message", data);
                // io.to(String(data?.chatRoomId)).emit("receive message", {
                //   ...data,
                //   status: 'sending'
                // })
                //for after I download the libreTranslation
            }
            else {
            }
            const shouldSaveInDB = data.isLoggedIn;
            if (shouldSaveInDB) {
                messages_service_1.default.addMessage(data);
                // const savedMessage = await MessagesServices.addMessage(data);
                // Queue for translation in background
                // translationQueue.queueMessage(savedMessage);
                //for after I download the libreTranslation
            }
        });
        socket.on("joinRoom", (room, callback) => {
            socket.join(String(room));
            if (room === 9) {
                //only for now, when will be more chats with logged in users, i should fetch the prev messages as well
                try {
                    const prevMessages = messages_service_1.default.getPrevMessages(50, 9);
                    // const processedMessages = await Promise.all(
                    //   prevMessages.map(async (msg) => {
                    //     if (!msg.translatedText) {
                    //       return {
                    //         ...msg,
                    //         translationStatus: 'pending'
                    //       };
                    //     }
                    //     return msg;
                    //   })
                    // );
                    //for after I download the libreTranslation
                    socket.emit("previous messages", prevMessages);
                }
                catch (e) {
                    console.error("error fetching previous messages:", e);
                }
            }
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
