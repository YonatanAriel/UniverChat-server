"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_rooms_controller_1 = __importDefault(require("../../DL/controllers/chat-rooms.controller"));
class ChatRoomsServices {
}
ChatRoomsServices.addChatRoom = (data) => {
    if (!data.name)
        return "name is missing";
    const isRoomExist = chat_rooms_controller_1.default.readOne("name", data.name);
    if (isRoomExist) {
        const roomId = isRoomExist.id;
        return roomId;
    }
    const roomId = chat_rooms_controller_1.default.create(data);
    return roomId;
};
exports.default = ChatRoomsServices;
