"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_rooms_service_1 = __importDefault(require("../BL/services/chat-rooms.service"));
const router = express_1.default.Router();
// // router.get("/", async (req, res) => {
// //   try {
// //     const allChatRooms = await chatRoomServices.getAllChatRooms()
// //     res.send(allChatRooms)
// //   } catch (err) {
// //     res.sendStatus(400).send(err);
// //   }
// // });
router.post("/add-chat-room", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = chat_rooms_service_1.default.addChatRoom(req.body);
        res.send({ roomId });
    }
    catch (err) {
        res.sendStatus(400).send(err);
    }
}));
module.exports = router;
