"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessagesTable = void 0;
//need to change that in the client to the interface !
// (also in public chat services.ts and in types.ts in the server), I should use the interface instead!!!
// type Message = {
//   text: string;
//   name: string;
//   messageTime: DateData;
// }
const createMessagesTable = (db) => {
    const query = `--sql
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_room_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    msg_text TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(chat_room_id) REFERENCES chat_rooms(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
)`;
    // db.prepare(query).run();
    const statement = db.prepare(query);
    statement.run();
};
exports.createMessagesTable = createMessagesTable;
