import express, { Express, Request, Response } from "express";
import { db, initializeDB } from "./src/DL/DB";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import { socketServices } from "./src/BL/services/socketServices/socket.service";

const app: Express = express();
const httpServer = createServer(app);
const dotenv = config();
const PORT = process.env.PORT || 4001;

app.use(require("cors")());
app.use(express.json());

const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

initializeDB();

socketServices(io);

app.use("/users", require("./src/routes/users.route"));
app.use("/messages", require("./src/routes/messages.route"));
app.use("/chat-rooms", require("./src/routes/chat-rooms.route"));

httpServer.listen(PORT, () => {
  console.log(`i'm listening, http://localhost:${PORT}/`);
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world!!!");
// });
