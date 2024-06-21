import { Database } from "better-sqlite3";
import { DateData } from "../../types/types";

interface Message {
  id?: number;
  chatRoomId?: number;
  userId?: number;
  msgText: string;
  timestamp: number;
  messageTime: DateData;
}

//need to change that in the client to the interface !
// (also in public chat services.ts and in types.ts in the server), I should use the interface instead!!!
// type Message = {
//   text: string;
//   name: string;
//   messageTime: DateData;
// }

export const createMessagesTable = (db: Database) => {
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
