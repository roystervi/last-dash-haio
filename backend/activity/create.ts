import { api } from "encore.dev/api";
import db from "../db";

export interface CreateActivityRequest {
  type: string;
  message: string;
  location: string;
}

export interface CreateActivityResponse {
  success: boolean;
}

// Creates a new activity entry.
export const create = api<CreateActivityRequest, CreateActivityResponse>(
  { expose: true, method: "POST", path: "/activities" },
  async ({ type, message, location }): Promise<CreateActivityResponse> => {
    await db.exec`
      INSERT INTO recent_activities (type, message, location)
      VALUES (${type}, ${message}, ${location})
    `;

    return { success: true };
  }
);
