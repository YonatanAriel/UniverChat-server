import Database from "better-sqlite3";

import { createChatRoomsTable } from "./models/chat-room";
import { createUsersTable } from "./models/user";
import { createMessagesTable } from "./models/message";
import ChatRoomsController from "./controllers/chat-rooms.controller";
import MessagesController from "./controllers/messages.controller";

const db = new Database("univerchat.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

const initializeDB = () => {
  //only for development to insure that the tables will update when i change the create table query
  // db.exec(`
  //     DROP TABLE IF EXISTS users;
  //   `);

  // db.exec(`
  //     DROP TABLE IF EXISTS chat_rooms;
  //   `);

  // db.exec(`
  //      DROP TABLE IF EXISTS messages;
  //   `);
  createUsersTable(db);
  createMessagesTable(db);
  createChatRoomsTable(db);
  const data = {
    msgText: "mama mia",
    timestamp: new Date().toISOString(),
    localSenderId: "346263576.324",
  };
  const a = MessagesController.delete(2);
  console.log(a);
};

// db.backup(`backup-${Date.now()}.db`)
//   .then(() => {
//     console.log('backup complete!');
//   })
//   .catch((err) => {
//     console.log('backup failed:', err);
//   });

export { db, initializeDB };
