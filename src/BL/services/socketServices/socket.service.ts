import { Server, Socket } from "socket.io";
import { Message } from "../../../DL/models/message";

let roomsMessages = {
  public: [],
  loggedInPublic: [],
};

export const socketServices = (io: Server) => {
  io.on("connection", (socket) => {
    // socket.on("publicMessage", (data: Message) => {
    //   io.emit("receiveMessage", data);
    // });

    socket.on("send message", (data: Message) => {
      const isPrivateMessage = data.isPrivate;
      console.log(`User ${socket.id} sent message ${data}`);

      if (!isPrivateMessage) {
        io.to(data.to).emit("receive message", data);
      } else {
      }
    });

    socket.on("joinRoom", (room: string, callback) => {
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
