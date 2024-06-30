import { User } from "../../DL/models/user";

type RowsOrRow = any | any[] | undefined;
type ReturnUser = User | User[] | undefined;

export const convertDBRowToUser = (rowOrRows: RowsOrRow): ReturnUser => {
  if (!rowOrRows) return undefined;

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
  } else {
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
