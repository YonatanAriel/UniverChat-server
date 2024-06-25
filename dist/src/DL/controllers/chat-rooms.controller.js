"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../DB");
class ChatRoomsController {
    static create(data) {
        const statement = DB_1.db.prepare("INSERT INTO chat_rooms (name) VALUES (?)");
        const { name } = data;
        const info = statement.run(name);
        const rowId = info.lastInsertRowid;
        return rowId;
    }
    static read(query = "SELECT * FROM chat_rooms") {
        const statement = DB_1.db.prepare(query);
        const filteredRes = statement
            .all()
            .filter((item) => item !== undefined);
        console.log("filteredRes", filteredRes);
        return filteredRes;
    }
    static readOne(id) {
        const statement = DB_1.db.prepare("SELECT * FROM chat_rooms WHERE id  = ?");
        const chatRoom = statement.get(id);
        return chatRoom;
    }
    static updateOne(name, id) {
        const statement = DB_1.db.prepare("UPDATE chat_rooms SET name = COALESCE(?, name) WHERE id = ?");
        const info = statement.run(name, id);
        const hasUpdated = info.changes > 0;
        return hasUpdated;
    }
    static updateOne2(name, id) {
        const statement = DB_1.db.prepare("UPDATE chat_rooms SET name = COALESCE(?, name) WHERE id = ?");
        const info = statement.run(name, id);
        const hasUpdated = info.changes > 0;
        return hasUpdated;
    }
    static updateOne3(name, id) {
        const statement = DB_1.db.prepare(`UPDATE chat_rooms SET name = COALESCE(:name, name) WHERE id = :id`);
        const info = statement.run({
            id,
            name,
        });
        const hasUpdated = info.changes > 0;
        return hasUpdated;
    }
    static updateMany(updates) {
        const transaction = DB_1.db.transaction((updates) => {
            const statement = DB_1.db.prepare(`UPDATE chat_rooms SET name = COALESCE(:name, name) WHERE id = :id
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
    static delete(id) {
        const statement = DB_1.db.prepare("DELETE FROM chat_rooms WHERE id = ?");
        const info = statement.run(id);
        const haeDeleted = info.changes > 0;
        return haeDeleted;
    }
}
exports.default = ChatRoomsController;
