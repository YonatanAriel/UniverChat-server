import { Server, Socket } from "socket.io";
import { Message } from "../../../DL/models/message";

export const socketServices = (io: Server) => {
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
        data.userId
      );
      io.emit("receiveMessage", data);
    });
    // socket.on("joinRoom", (room: string) => {
    //   socket.join(room);
    //   console.log(`User ${socket.id} joined room: ${room}`);
    // });

    // socket.on("leaveRoom", (room: string) => {
    //   socket.leave(room);
    //   console.log(`User ${socket.id} left room: ${room}`);
    // });

    socket.on("loggedInPublicMessage", (data: Message) => {
      console.log(
        `Logged-in message - ${data.msgText}, ${data.userName}, ${data.timestamp}, ${data.userId}`
      );
      // io.to("loggedInRoom").emit("receiveMessage", data);
      io.to("loggedInRoom").emit("receiveMessage", data);
    });
  });
};
