"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const publicChatServices_1 = require("./src/BL/services/socketServices/publicChatServices");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const PORT = 4000;
app.use(require("cors")());
const io = new socket_io_1.Server(httpServer, {
    /* options */
    cors: {
        origin: "http://localhost:5173",
    },
});
(0, publicChatServices_1.publicChatSocketServices)(io);
httpServer.listen(PORT, () => {
    console.log(`i'm listening, http://localhost:${PORT}/`);
});
app.get("/", (req, res) => {
    res.send("hello world!!!");
});
