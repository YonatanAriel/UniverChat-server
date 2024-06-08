import express, { Express, Request, Response } from "express";
import db from "./src/DL/DB";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Express = express();
const httpServer = createServer(app);
const PORT = 4000;

const io = new Server(httpServer, {
  /* options */
});
io.on("connection", (socket) => {
  // ...
});

httpServer.listen(PORT, () => {
  console.log(`i'm listening, http://localhost:${PORT}/`);
});

app.get("/", (req: Request, res: Response) => {
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
