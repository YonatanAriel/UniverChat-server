"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersTable = void 0;
const createUsersTable = (db) => {
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
exports.createUsersTable = createUsersTable;
