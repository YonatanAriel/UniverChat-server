import { Server, Socket } from "socket.io";
import { Message } from "../../../DL/models/message";
import MessagesServices from "../messages.service";
import UsersServices from "../users.service";

let roomsMessages = {
  public: [],
  loggedInPublic: [],
};

export const socketServices = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("send message", (data: Message) => {
      console.log(data);
      const userImg = UsersServices.getUserById(String(data.userId))?.photo;
      data.userImg = userImg;
      const isPrivateMessage = data.isPrivate;
      console.log(`User ${socket.id} sent message ${data}`);

      if (!isPrivateMessage) {
        console.log(`Emitting to room: ${String(data?.chatRoomId)}`);
        io.to(String(data?.chatRoomId)).emit("receive message", data);
      } else {
      }
      const shouldSaveInDB = data.isLoggedIn;
      if (shouldSaveInDB) {
        console.log("need to store");
        MessagesServices.addMessage(data);
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
