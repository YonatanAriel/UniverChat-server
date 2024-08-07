"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_controller_1 = __importDefault(require("../../DL/controllers/messages.controller"));
class MessagesServices {
}
MessagesServices.getAllMessages = () => {
    const allMessages = messages_controller_1.default.read();
    return allMessages;
};
MessagesServices.addMessage = (data) => {
    const rowId = messages_controller_1.default.create(data);
    return rowId;
};
exports.default = MessagesServices;
