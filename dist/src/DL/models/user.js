"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersTable = void 0;
const createUsersTable = (db) => {
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
exports.createUsersTable = createUsersTable;
