import { api, APIError } from "encore.dev/api";
import db from "../db";

export interface UpdateDeviceRequest {
  id: string;
  value?: number;
  isOnline?: boolean;
}

export interface UpdateDeviceResponse {
  success: boolean;
}

// Updates a smart home device.
export const update = api<UpdateDeviceRequest, UpdateDeviceResponse>(
  { expose: true, method: "PATCH", path: "/devices/:id" },
  async ({ id, value, isOnline }): Promise<UpdateDeviceResponse> => {
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (value !== undefined) {
      updates.push(`value = $${paramIndex++}`);
      params.push(value);
    }

    if (isOnline !== undefined) {
      updates.push(`is_online = $${paramIndex++}`);
      params.push(isOnline);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no updates provided");
    }

    updates.push(`updated_at = NOW()`);
    params.push(id);

    const query = `
      UPDATE devices 
      SET ${updates.join(", ")} 
      WHERE id = $${paramIndex}
    `;

    await db.rawExec(query, ...params);

    return { success: true };
  }
);
