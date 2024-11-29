"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessagesTable = void 0;
const createMessagesTable = (db) => {
    const query = `--sql
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_room_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    msg_text TEXT NOT NULL,
    photo_url TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(chat_room_id) REFERENCES chat_rooms(id)
)`;
    const statement = db.prepare(query);
    statement.run();
};
exports.createMessagesTable = createMessagesTable;
