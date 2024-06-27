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
    if (data.photoUrl) {
      columns.push("photo_url");
      values.push(data.photoUrl);
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
    const filteredRes = statement
      .all()
      .filter((item): item is User => item !== undefined);
    console.log("filteredRes", filteredRes);
    return filteredRes;
  }

  static readOne(id: number): User | undefined {
    const statement = db.prepare("SELECT * FROM users WHERE id  = ?");
    const chatRoom = statement.get(id) as User | undefined;
    return chatRoom;
  }

  static updateOne(data: User, id: number) {
    const statement = db.prepare(
      "UPDATE users SET user_name = COALESCE(?, user_name), password = COALESCE(?,password), email = COALESCE(?,email), photo_url = COALESCE(?,photo_url) WHERE id = ?"
    );
    const info = statement.run(
      data.userName ?? null,
      data.password ?? null,
      data.email ?? null,
      data.photoUrl ?? null,
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
