"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDBRowToUser = void 0;
const convertDBRowToUser = (rowOrRows) => {
    if (!rowOrRows)
        return undefined;
    if (Array.isArray(rowOrRows)) {
        const rows = rowOrRows;
        return rows.map((row) => ({
            id: row.id,
            userName: row.user_name,
            password: row.password,
            email: row.email,
            photo: row.photo_url,
            clientId: row.client_id,
            isActive: row.is_active,
        }));
    }
    else {
        const row = rowOrRows;
        return {
            id: row.id,
            userName: row.user_name,
            password: row.password,
            email: row.email,
            photo: row.photo_url,
            clientId: row.client_id,
            isActive: row.is_active,
        };
    }
};
exports.convertDBRowToUser = convertDBRowToUser;
