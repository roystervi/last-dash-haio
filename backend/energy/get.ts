import { api } from "encore.dev/api";
import db from "../db";

export interface EnergyData {
  currentUsage: number;
  dailyTotal: number;
  savings: number;
  hourlyUsage: number[];
}

// Gets current energy usage data.
export const get = api<void, EnergyData>(
  { expose: true, method: "GET", path: "/energy" },
  async (): Promise<EnergyData> => {
    const row = await db.queryRow`
      SELECT current_usage, daily_total, savings
      FROM energy_data
      ORDER BY timestamp DESC
      LIMIT 1
    `;

    // Generate mock hourly usage data for the last 24 hours
    const hourlyUsage = Array.from({ length: 24 }, (_, i) => {
      const baseUsage = 1.5 + Math.sin((i - 6) * Math.PI / 12) * 0.8;
      return Math.max(0.2, baseUsage + (Math.random() - 0.5) * 0.4);
    });

    return {
      currentUsage: row?.current_usage || 2.4,
      dailyTotal: row?.daily_total || 45.8,
      savings: row?.savings || 8.2,
      hourlyUsage
    };
  }
);
