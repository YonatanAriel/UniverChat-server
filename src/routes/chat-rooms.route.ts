import express, { Request, Response } from "express";
import ChatRoomsServices from "../BL/services/chat-rooms.service";
const router = express.Router();

// // router.get("/", async (req, res) => {
// //   try {
// //     const allChatRooms = await chatRoomServices.getAllChatRooms()
// //     res.send(allChatRooms)
// //   } catch (err) {
// //     res.sendStatus(400).send(err);
// //   }
// // });

router.post("/add-chat-room", async (req: Request, res: Response) => {
  try {
    const roomId = ChatRoomsServices.addChatRoom(req.body);
    res.send({ roomId });
  } catch (err) {
    res.sendStatus(400).send(err);
  }
});

module.exports = router;
