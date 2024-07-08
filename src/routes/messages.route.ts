import express, { Request, Response } from "express";
import MessagesServices from "../BL/services/messages.service";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const allMessages = MessagesServices.getAllMessages();
    res.send(allMessages);
  } catch (err) {
    res.sendStatus(400).send(err);
  }
});

module.exports = router;
