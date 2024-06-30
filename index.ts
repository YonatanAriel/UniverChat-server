import express, { Express, Request, Response } from "express";
import { db, initializeDB } from "./src/DL/DB";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import { publicChatSocketServices } from "./src/BL/services/socketServices/publicChatServices";

const app: Express = express();
const httpServer = createServer(app);
const dotenv = config();
const PORT = process.env.PORT || 4001;

app.use(require("cors")());
app.use(express.json());

const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "http://localhost:5173",
  },
});

initializeDB();

publicChatSocketServices(io);

app.use("/users", require("./src/routes/users.route"));
// app.use("/messages", require("./routes/messages.route"));
// app.use("/chat-rooms", require("./routes/chat-rooms.route"));

httpServer.listen(PORT, () => {
  console.log(`i'm listening, http://localhost:${PORT}/`);
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world!!!");
// });
