import Database from "better-sqlite3";

import { createChatRoomsTable } from "./models/chat-room";
import { createUsersTable } from "./models/user";
import { createMessagesTable } from "./models/message";
import ChatRoomsController from "./controllers/chat-rooms.controller";

const db = new Database("univerchat.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

const initializeDB = () => {
  createUsersTable(db);
  createMessagesTable(db);
  createChatRoomsTable(db);
};

// db.backup(`backup-${Date.now()}.db`)
//   .then(() => {
//     console.log('backup complete!');
//   })
//   .catch((err) => {
//     console.log('backup failed:', err);
//   });

export { db, initializeDB };
