"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const PORT = 4000;
const io = new socket_io_1.Server(httpServer, {
/* options */
});
io.on("connection", (socket) => {
    // ...
});
httpServer.listen(PORT, () => {
    console.log(`i'm listening, http://localhost:${PORT}/`);
});
app.get("/", (req, res) => {
    res.send("hello world!!!");
});
// import express, { Express, Request, Response } from "express";
// import db from "./src/DL/DB";
// const app: Express = express();
// const PORT = 4000;
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world!!!");
// });
// app.listen(PORT, () => {
//   console.log(`i'm listening, http://localhost:${PORT}/`);
// });
