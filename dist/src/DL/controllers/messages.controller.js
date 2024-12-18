"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convertDBRowToMessage_1 = __importDefault(require("../../BL/utils/convertDBRowToMessage"));
const DB_1 = require("../DB");
class MessagesController {
    static create(data) {
        const statement = DB_1.db.prepare("INSERT INTO messages (msg_text, timestamp, user_id, chat_room_id, user_photo) VALUES (?,?,?,?,?)");
        const { msgText, timestamp, userId, chatRoomId, userImg } = data;
        const info = statement.run(msgText, timestamp, userId, chatRoomId, userImg);
        const rowId = info.lastInsertRowid;
        return rowId;
    }
    static read(query = "SELECT * FROM messages") {
        const statement = DB_1.db.prepare(query);
        const filteredRows = statement
            .all()
            .filter((item) => item !== undefined);
        const messages = (0, convertDBRowToMessage_1.default)(filteredRows);
        return messages;
    }
    static readOne(id) {
        const statement = DB_1.db.prepare("SELECT * FROM messages WHERE id  = ?");
        const dbRow = statement.get(id);
        const message = (0, convertDBRowToMessage_1.default)(dbRow);
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
