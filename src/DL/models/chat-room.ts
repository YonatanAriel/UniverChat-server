import { Database } from "better-sqlite3";

export interface ChatRoom {
  id?: string;
  name: string;
}

export const createChatRoomsTable = (db: Database) => {
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
