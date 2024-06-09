import { Server, Socket } from "socket.io";
import { Message } from "../../../types/types";

export const publicChatSocketServices = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle chat events (e.g., messages)
    socket.on("publicMessage", (data: Message) => {
      // Broadcast the message to all connected clients
      console.log(data.text, "11111");
      io.emit("publicMessage", data);
    });
  });
};
