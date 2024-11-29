import convertDBRowToMessage from "../../BL/utils/convertDBRowToMessage";
import { MessageRow } from "../../types/types";
import { db } from "../DB";
import { Message } from "../models/message";

class MessagesController {
  static create(data: Message) {
    const statement = db.prepare(
      "INSERT INTO messages (msg_text, timestamp, user_id, chat_room_id, user_photo) VALUES (?,?,?,?,?)"
    );
    const { msgText, timestamp, userId, chatRoomId, userImg } = data;
    const info = statement.run(msgText, timestamp, userId, chatRoomId, userImg);
    const rowId = info.lastInsertRowid;
    return rowId;
  }

  static read(query: string = "SELECT * FROM messages") {
    const statement = db.prepare(query);
    const filteredRows = statement
      .all()
      .filter((item): item is MessageRow => item !== undefined);
    const messages = convertDBRowToMessage(filteredRows);
    return messages;
  }

  static readOne(id: number) {
    const statement = db.prepare("SELECT * FROM messages WHERE id  = ?");
    const dbRow = statement.get(id) as MessageRow | undefined;
    const message = convertDBRowToMessage(dbRow);
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
