import MessagesController from "../../DL/controllers/messages.controller";
import { Message } from "../../DL/models/message";

class MessagesServices {
  static getAllMessages = () => {
    const allMessages = MessagesController.read();
    return allMessages;
  };

  static addMessage = (data: Message) => {
    const rowId = MessagesController.create(data);
    return rowId;
  };

  static getPrevMessages = (numberOfMessages: number, chatRoomId: number) => {
    const query = `SELECT * FROM messages WHERE chat_room_id = ${chatRoomId} ORDER BY timestamp DESC LIMIT ${numberOfMessages}`;
    const prevMessages = MessagesController.read(query);
    if (!prevMessages) return null;
    if (Array.isArray(prevMessages)) return prevMessages.reverse();
    return prevMessages;
  };

  static updateMessageTranslation = () => {};
}

export default MessagesServices;
