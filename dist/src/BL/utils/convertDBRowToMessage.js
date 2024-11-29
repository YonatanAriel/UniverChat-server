"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertDBRowToMessage = (rowOrRows) => {
    if (!rowOrRows)
        return undefined;
    const transformRow = (row) => ({
        id: row.id,
        chatRoomId: row.chat_room_id,
        msgText: row.msg_text,
        timestamp: row.timestamp,
        userId: row.user_id,
        userImg: row.user_photo,
        photo: row.photo_url,
    });
    if (Array.isArray(rowOrRows)) {
        const rows = rowOrRows;
        return rows.map(transformRow);
    }
    const row = rowOrRows;
    return transformRow(row);
};
exports.default = convertDBRowToMessage;
