import { Database } from "better-sqlite3";

export interface Message {
  id?: number;
  chatRoomId?: number;
  userId: number;
  userName?: string;
  msgText: string;
  timestamp: Date | string;
  isPrivate: boolean;
  to: string;
}

export const createMessagesTable = (db: Database) => {
  const query = `--sql
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    --chat_room_id INTEGER NOT NULL,
    --user_id INTEGER NOT NULL,
    msg_text TEXT NOT NULL,
    photo_url TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP 
    --FOREIGN KEY(user_id) REFERENCES users(id)
    --FOREIGN KEY(chat_room_id) REFERENCES chat_rooms(id),
)`;
  const statement = db.prepare(query);
  statement.run();
};
