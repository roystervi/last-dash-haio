import { api } from "encore.dev/api";
import db from "../db";

export interface Device {
  id: string;
  name: string;
  type: "light" | "thermostat" | "lock" | "speaker";
  room: string;
  isOnline: boolean;
  value: number;
}

export interface ListDevicesResponse {
  devices: Device[];
}

// Gets all smart home devices.
export const list = api<void, ListDevicesResponse>(
  { expose: true, method: "GET", path: "/devices" },
  async (): Promise<ListDevicesResponse> => {
    const devices: Device[] = [];
    
    for await (const row of db.query`
      SELECT id, name, type, room, is_online, value 
      FROM devices 
      ORDER BY room, name
    `) {
      devices.push({
        id: row.id,
        name: row.name,
        type: row.type as Device["type"],
        room: row.room,
        isOnline: row.is_online,
        value: row.value
      });
    }
    
    return { devices };
  }
);
