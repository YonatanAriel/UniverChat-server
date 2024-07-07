import ChatRoomsController from "../../DL/controllers/chat-rooms.controller";
import { ChatRoom } from "../../DL/models/chat-room";

class ChatRoomsServices {
  static addChatRoom = (data: ChatRoom) => {
    if (!data.name) return "name is missing";
    const isRoomExist = ChatRoomsController.readOne("name", data.name);
    if (isRoomExist) {
      const roomId = isRoomExist.id;
      return roomId;
    }
    const roomId = ChatRoomsController.create(data);
    return roomId;
  };
  //   static getAllChatRooms(): ChatRoom[] {
  //     return ChatRoomsController.getAllChatRooms();
  //   }

  //   static createChatRoom(chatRoom: ChatRoom): number {
  //     return ChatRoomsController.createChatRoom(chatRoom);
  //   }

  //   // Add more methods as needed
}

export default ChatRoomsServices;
