import { db } from "../DB";
import { ChatRoom } from "../models/chat-room";

class ChatRoomsController {
  static create(data: ChatRoom) {
    const statement = db.prepare("INSERT INTO chat_rooms (name) VALUES (?)");
    const { name } = data;
    const info = statement.run(name);
    const rowId = info.lastInsertRowid;
    return rowId;
  }

  static read(query: string = "SELECT * FROM chat_rooms"): ChatRoom[] {
    const statement = db.prepare(query);
    const filteredRes = statement
      .all()
      .filter((item): item is ChatRoom => item !== undefined);
    console.log("filteredRes", filteredRes);
    return filteredRes;
  }

  static readOne(id: string): ChatRoom | undefined {
    const statement = db.prepare("SELECT * FROM chat_rooms WHERE id  = ?");
    const chatRoom = statement.get(id) as ChatRoom | undefined;
    return chatRoom;
  }

  static updateOne(name: string, id: string) {
    const statement = db.prepare(
      "UPDATE chat_rooms SET name = COALESCE(?, name) WHERE id = ?"
    );
    const info = statement.run(name, id);
    const hasUpdated = info.changes > 0;
    return hasUpdated;
  }

  static updateOne2(name: string, id: string) {
    const statement = db.prepare(
      "UPDATE chat_rooms SET name = COALESCE(?, name) WHERE id = ?"
    );
    const info = statement.run(name, id);
    const hasUpdated = info.changes > 0;
    return hasUpdated;
  }
  static updateOne3(name: string, id: string) {
    const statement = db.prepare(
      `UPDATE chat_rooms SET name = COALESCE(:name, name) WHERE id = :id`
    );
    const info = statement.run({
      id,
      name,
    });
    const hasUpdated = info.changes > 0;
    return hasUpdated;
  }

  static updateMany(updates: ChatRoom[]) {
    const transaction = db.transaction((updates: ChatRoom[]) => {
      const statement =
        db.prepare(`UPDATE chat_rooms SET name = COALESCE(:name, name) WHERE id = :id
          `);
      for (const update of updates) {
        statement.run({
          id: update.id,
          name: update.name,
        });
      }
    });
    transaction(updates);
  }

  static delete(id: string) {
    const statement = db.prepare("DELETE FROM chat_rooms WHERE id = ?");
    const info = statement.run(id);
    const haeDeleted = info.changes > 0;
    return haeDeleted;
  }
}

export default ChatRoomsController;
