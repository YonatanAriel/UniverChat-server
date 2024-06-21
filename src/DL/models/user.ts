import { Database } from "better-sqlite3";

export interface User {
  id: number;
  userName: string;
  password: string;
  email?: string;
  photoUrl?: string;
  isActive: boolean;
}

export const createUsersTable = (db: Database) => {
  const query = `--sql
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT,
      photo_url TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true
    )
  `;
  const statement = db.prepare(query);
  statement.run();
};
