import { api } from "encore.dev/api";
import db from "../db";

export interface Activity {
  id: number;
  type: string;
  message: string;
  location: string;
  timestamp: Date;
}

export interface ListActivitiesResponse {
  activities: Activity[];
}

// Gets recent activity feed.
export const list = api<void, ListActivitiesResponse>(
  { expose: true, method: "GET", path: "/activities" },
  async (): Promise<ListActivitiesResponse> => {
    const activities: Activity[] = [];
    
    for await (const row of db.query`
      SELECT id, type, message, location, timestamp
      FROM recent_activities
      ORDER BY timestamp DESC
      LIMIT 20
    `) {
      activities.push({
        id: row.id,
        type: row.type,
        message: row.message,
        location: row.location,
        timestamp: new Date(row.timestamp)
      });
    }
    
    return { activities };
  }
);
