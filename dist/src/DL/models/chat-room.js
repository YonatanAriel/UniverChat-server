"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatRoomsTable = void 0;
const createChatRoomsTable = (db) => {
    const query = `--sql
    CREATE TABLE IF NOT EXISTS chat_rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `;
    // db.prepare(query).run();
    const statement = db.prepare(query);
    statement.run();
};
exports.createChatRoomsTable = createChatRoomsTable;
