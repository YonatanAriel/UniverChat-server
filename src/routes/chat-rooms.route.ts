// // const express = require("express"),
// //   router = express.Router(),
// //   chatRoomServices = require("../BL/services/chat-rooms.service");

// // router.get("/", async (req, res) => {
// //   try {
// //     const allChatRooms = await chatRoomServices.getAllChatRooms()
// //     res.send(allChatRooms)
// //   } catch (err) {
// //     res.status(400).send(err);
// //   }
// // });

// // module.exports = router;
// import { Router, Request, Response } from 'express';
// import ChatRoomsService from '../BL/services/chat-rooms.service';

// const router = Router();

// router.get('/', (req: Request, res: Response) => {
//   const chatRooms = ChatRoomsService.getAllChatRooms();
//   res.json(chatRooms);
// });

// router.post('/', (req: Request, res: Response) => {
//   const { name, description } = req.body;
//   const id = ChatRoomsService.createChatRoom({ name, description });
//   res.status(201).json({ id });
// });

// export default router;
// //
