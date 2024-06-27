import { Database } from "better-sqlite3";

export interface User {
  id?: number;
  userName: string;
  password?: string;
  email?: string;
  photoUrl?: string;
  clientId?: string;
  isActive?: boolean;
}

export const createUsersTable = (db: Database) => {
  const query = `--sql
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT,
      photo_url TEXT,
      client_id TEXT,
      is_active BOOLEAN NOT NULL DEFAULT 1
    )
  `;
  const statement = db.prepare(query);
  statement.run();
};
