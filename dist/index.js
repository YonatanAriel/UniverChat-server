"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_1 = require("./src/DL/DB");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const socket_service_1 = require("./src/BL/services/socketServices/socket.service");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const dotenv = (0, dotenv_1.config)();
const PORT = process.env.PORT || 4001;
app.use(require("cors")());
app.use(express_1.default.json());
const io = new socket_io_1.Server(httpServer, {
    /* options */
    cors: {
        origin: "http://localhost:5173",
    },
});
(0, DB_1.initializeDB)();
(0, socket_service_1.socketServices)(io);
app.use("/users", require("./src/routes/users.route"));
// app.use("/messages", require("./routes/messages.route"));
// app.use("/chat-rooms", require("./routes/chat-rooms.route"));
httpServer.listen(PORT, () => {
    console.log(`i'm listening, http://localhost:${PORT}/`);
});
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world!!!");
// });
