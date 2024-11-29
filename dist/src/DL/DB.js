"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDB = exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const chat_room_1 = require("./models/chat-room");
const user_1 = require("./models/user");
const message_1 = require("./models/message");
const db = new better_sqlite3_1.default("univerchat.db", { verbose: console.log });
exports.db = db;
db.pragma("journal_mode = WAL");
const initializeDB = () => {
    //only for development to insure that the tables will update when i change the create table query
    // db.exec(`
    //     DROP TABLE IF EXISTS users;
    //   `);
    // db.exec(`
    //     DROP TABLE IF EXISTS chat_rooms;
    //   `);
    db.exec(`
       DROP TABLE IF EXISTS messages;
    `);
    (0, user_1.createUsersTable)(db);
    (0, message_1.createMessagesTable)(db);
    (0, chat_room_1.createChatRoomsTable)(db);
};
exports.initializeDB = initializeDB;
