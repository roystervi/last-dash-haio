import { api } from "encore.dev/api";

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
}

// Gets current weather information.
export const get = api<void, WeatherData>(
  { expose: true, method: "GET", path: "/weather" },
  async (): Promise<WeatherData> => {
    // Mock weather data - in a real app, this would fetch from a weather API
    return {
      temperature: 72,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 8.5,
      visibility: 10,
      pressure: 30.15,
      icon: "partly-cloudy"
    };
  }
);
