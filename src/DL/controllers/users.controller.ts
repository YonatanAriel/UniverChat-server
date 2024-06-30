import { convertDBRowToUser } from "../../BL/utils/convertDBRowToUser";
import { db } from "../DB";
import { User } from "../models/user";

class UsersController {
  static create(data: User) {
    const columns = ["user_name", "password", "client_id", "is_active"];
    const values = [data.userName, data.password, data.clientId, 1];
    if (data.email) {
      columns.push("email");
      values.push(data.email);
    }
    if (data.photo) {
      columns.push("photo_url");
      values.push(data.photo);
    }

    const statement = db.prepare(
      `INSERT INTO users (${columns.join(", ")}) VALUES (${columns.map(
        (column) => "?"
      )})`
    );
    const info = statement.run(...values);
    const rowId = info.lastInsertRowid;
    return rowId;
  }

  static read(query: string = "SELECT * FROM users"): User[] {
    const statement = db.prepare(query);
    const filteredRows = statement
      .all()
      .filter((item): item is User => item !== undefined);
    const users = convertDBRowToUser(filteredRows) as User[];
    return users;
  }

  static readOne(identifier: string, value: string): User | undefined {
    const statement = db.prepare(`SELECT * FROM users WHERE ${identifier} = ?`);
    const row = statement.get(value);
    if (!row) return undefined;
    const user = convertDBRowToUser(row) as User;
    return user;
  }
  // static readOne(id: number): User | undefined {
  //   const statement = db.prepare("SELECT * FROM users WHERE id  = ?");
  //   const chatRoom = statement.get(id) as User | undefined;
  //   return chatRoom;
  // }

  static updateOne(data: User, id: number) {
    const statement = db.prepare(
      "UPDATE users SET user_name = COALESCE(?, user_name), password = COALESCE(?,password), email = COALESCE(?,email), photo_url = COALESCE(?,photo_url) WHERE id = ?"
    );
    const info = statement.run(
      data.userName ?? null,
      data.password ?? null,
      data.email ?? null,
      data.photo ?? null,
      id
    );
    const hasUpdated = info.changes > 0;
    return hasUpdated;
  }

  static delete(id: number) {
    const statement = db.prepare("UPDATE users SET is_active = 0 WHERE id = ?");
    const info = statement.run(id);
    const haeDeleted = info.changes > 0;
    return haeDeleted;
  }
}

export default UsersController;
