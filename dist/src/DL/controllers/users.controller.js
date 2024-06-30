"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertDBRowToUser_1 = require("../../BL/utils/convertDBRowToUser");
const DB_1 = require("../DB");
class UsersController {
    static create(data) {
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
        const statement = DB_1.db.prepare(`INSERT INTO users (${columns.join(", ")}) VALUES (${columns.map((column) => "?")})`);
        const info = statement.run(...values);
        const rowId = info.lastInsertRowid;
        return rowId;
    }
    static read(query = "SELECT * FROM users") {
        const statement = DB_1.db.prepare(query);
        const filteredRows = statement
            .all()
            .filter((item) => item !== undefined);
        const users = (0, convertDBRowToUser_1.convertDBRowToUser)(filteredRows);
        return users;
    }
    static readOne(identifier, value) {
        const statement = DB_1.db.prepare(`SELECT * FROM users WHERE ${identifier} = ?`);
        const row = statement.get(value);
        if (!row)
            return undefined;
        const user = (0, convertDBRowToUser_1.convertDBRowToUser)(row);
        return user;
    }
    // static readOne(id: number): User | undefined {
    //   const statement = db.prepare("SELECT * FROM users WHERE id  = ?");
    //   const chatRoom = statement.get(id) as User | undefined;
    //   return chatRoom;
    // }
    static updateOne(data, id) {
        var _a, _b, _c, _d;
        const statement = DB_1.db.prepare("UPDATE users SET user_name = COALESCE(?, user_name), password = COALESCE(?,password), email = COALESCE(?,email), photo_url = COALESCE(?,photo_url) WHERE id = ?");
        const info = statement.run((_a = data.userName) !== null && _a !== void 0 ? _a : null, (_b = data.password) !== null && _b !== void 0 ? _b : null, (_c = data.email) !== null && _c !== void 0 ? _c : null, (_d = data.photo) !== null && _d !== void 0 ? _d : null, id);
        const hasUpdated = info.changes > 0;
        return hasUpdated;
    }
    static delete(id) {
        const statement = DB_1.db.prepare("UPDATE users SET is_active = 0 WHERE id = ?");
        const info = statement.run(id);
        const haeDeleted = info.changes > 0;
        return haeDeleted;
    }
}
exports.default = UsersController;
