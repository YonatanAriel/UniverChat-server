import { Database } from "better-sqlite3";
import { DateData } from "../../types/types";

export interface Message {
  id?: number;
  chatRoomId?: number;
  sqlUserId?: number;
  userName?: string;
  msgText: string;
  timestamp: Date | string;
  localSenderId: string;
}

export const createMessagesTable = (db: Database) => {
  const query = `--sql
CREATE TABLE IF NOt EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    --chat_room_id INTEGER NOT NULL,
    --user_id INTEGER NOT NULL,
    msg_text TEXT NOT NULL,
    photo_url TEXT,
    sender_client_id TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP 
    --FOREIGN KEY(chat_room_id) REFERENCES chat_rooms(id),
    --FOREIGN KEY(user_id) REFERENCES users(id)
)`;
  const statement = db.prepare(query);
  statement.run();
};
