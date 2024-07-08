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
}

export default MessagesServices;
