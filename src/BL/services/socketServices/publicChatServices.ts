import { Server, Socket } from "socket.io";
import { Message } from "../../../DL/models/message";

export const publicChatSocketServices = (io: Server) => {
  io.on("connection", (socket) => {
    // Handle chat events (e.g., messages)
    socket.on("publicMessage", (data: Message) => {
      // Broadcast the message to all connected clients
      console.log(
        "message data - ",
        data.msgText,
        data.userName,
        " | ",
        data.timestamp,
        data.localSenderId
      );
      io.emit("receiveMessage", data);
    });
  });
};
