import { db } from "../DB";
import { Message } from "../models/message";

class MessagesController {
  static create(data: Message) {
    const statement = db.prepare(
      "INSERT INTO messages (msg_text, timestamp, sender_client_id) VALUES (?,?,?)"
    );
    const { msgText, timestamp, localSenderId } = data;
    const info = statement.run(msgText, timestamp, localSenderId);
    const rowId = info.lastInsertRowid;
    return rowId;
  }

  static read(query: string = "SELECT * FROM messages"): Message[] {
    const statement = db.prepare(query);
    const filteredRes = statement
      .all()
      .filter((item): item is Message => item !== undefined);
    return filteredRes;
  }

  static readOne(id: number): Message | undefined {
    const statement = db.prepare("SELECT * FROM messages WHERE id  = ?");
    const message = statement.get(id) as Message | undefined;
    return message;
  }

  static updateOne(id: number, msgText: string) {
    const statement = db.prepare(
      "UPDATE messages SET msg_text = COALESCE(?, msg_text) WHERE id = ?"
    );
    const info = statement.run(msgText, id);
    const hasUpdated = info.changes > 0;
    return hasUpdated;
  }

  static delete(id: number) {
    const statement = db.prepare("DELETE FROM messages WHERE id = ?");
    const info = statement.run(id);
    const haeDeleted = info.changes > 0;
    return haeDeleted;
  }
}

export default MessagesController;
