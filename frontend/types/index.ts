export interface Device {
  id: string;
  name: string;
  type: "light" | "thermostat" | "lock" | "speaker";
  room: string;
  isOnline: boolean;
  value: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
}

export interface EnergyData {
  currentUsage: number;
  dailyTotal: number;
  savings: number;
  hourlyUsage: number[];
}

export interface Activity {
  id: number;
  type: string;
  message: string;
  location: string;
  timestamp: Date;
}

export interface SystemStatus {
  devicesOnline: number;
  totalDevices: number;
  networkStatus: "connected" | "disconnected" | "weak";
  lastUpdate: Date;
}
