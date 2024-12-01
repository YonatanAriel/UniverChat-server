import { Server, Socket } from "socket.io";
import { Message } from "../../../DL/models/message";
import MessagesServices from "../messages.service";
import UsersServices from "../users.service";
// import translationQueue from "../translationServices/translationQueue";
//for after I download the libreTranslation

let roomsMessages = {
  public: [],
  loggedInPublic: [],
};

export const socketServices = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("send message", (data: Message) => {
      const userImg = UsersServices.getUserById(String(data.userId))?.photo;
      data.userImg = userImg;

      const isPrivateMessage = data.isPrivate;
      console.log(`User ${socket.id} sent message ${data}`);

      if (!isPrivateMessage) {
        console.log(`Emitting to room: ${String(data?.chatRoomId)}`);
        io.to(String(data?.chatRoomId)).emit("receive message", data);

        // io.to(String(data?.chatRoomId)).emit("receive message", {
        //   ...data,
        //   status: 'sending'
        // })
        //for after I download the libreTranslation
      } else {
      }
      const shouldSaveInDB = data.isLoggedIn;
      if (shouldSaveInDB) {
        MessagesServices.addMessage(data);

        // const savedMessage = await MessagesServices.addMessage(data);
        // Queue for translation in background
        // translationQueue.queueMessage(savedMessage);
        //for after I download the libreTranslation
      }
    });

    socket.on("joinRoom", (room, callback) => {
      socket.join(String(room));

      if (room === 9) {
        //only for now, when will be more chats with logged in users, i should fetch the prev messages as well
        try {
          const prevMessages = MessagesServices.getPrevMessages(50, 9);

          // const processedMessages = await Promise.all(
          //   prevMessages.map(async (msg) => {
          //     if (!msg.translatedText) {
          //       return {
          //         ...msg,
          //         translationStatus: 'pending'
          //       };
          //     }
          //     return msg;
          //   })
          // );
          //for after I download the libreTranslation

          socket.emit("previous messages", prevMessages);
        } catch (e) {
          console.error("error fetching previous messages:", e);
        }
      }

      // callback(roomsMessages[room]);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    // socket.on("leaveRoom", (room: string) => {
    //   socket.leave(room);
    //   console.log(`User ${socket.id} left room: ${room}`);
    // });
  });
};
