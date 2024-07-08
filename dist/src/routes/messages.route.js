"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_service_1 = __importDefault(require("../BL/services/messages.service"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    try {
        const allMessages = messages_service_1.default.getAllMessages();
        res.send(allMessages);
    }
    catch (err) {
        res.sendStatus(400).send(err);
    }
});
module.exports = router;
