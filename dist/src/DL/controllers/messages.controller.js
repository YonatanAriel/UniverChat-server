"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../DB");
class MessagesController {
    static create(data) {
        const statement = DB_1.db.prepare("INSERT INTO messages (msg_text, timestamp, user_id) VALUES (?,?,?)");
        const { msgText, timestamp, userId } = data;
        const info = statement.run(msgText, timestamp, userId);
        const rowId = info.lastInsertRowid;
        return rowId;
    }
    static read(query = "SELECT * FROM messages") {
        const statement = DB_1.db.prepare(query);
        const filteredRes = statement
            .all()
            .filter((item) => item !== undefined);
        return filteredRes;
    }
    static readOne(id) {
        const statement = DB_1.db.prepare("SELECT * FROM messages WHERE id  = ?");
        const message = statement.get(id);
        return message;
    }
    static updateOne(id, msgText) {
        const statement = DB_1.db.prepare("UPDATE messages SET msg_text = COALESCE(?, msg_text) WHERE id = ?");
        const info = statement.run(msgText, id);
        const hasUpdated = info.changes > 0;
        return hasUpdated;
    }
    static delete(id) {
        const statement = DB_1.db.prepare("DELETE FROM messages WHERE id = ?");
        const info = statement.run(id);
        const haeDeleted = info.changes > 0;
        return haeDeleted;
    }
}
exports.default = MessagesController;
