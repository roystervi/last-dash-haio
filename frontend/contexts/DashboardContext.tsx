import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { Device, WeatherData, EnergyData, Activity, SystemStatus } from "../types";

interface DashboardState {
  devices: Device[];
  weather: WeatherData | null;
  energy: EnergyData | null;
  activities: Activity[];
  systemStatus: SystemStatus;
  loading: boolean;
  error: string | null;
}

type DashboardAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_DEVICES"; payload: Device[] }
  | { type: "SET_WEATHER"; payload: WeatherData }
  | { type: "SET_ENERGY"; payload: EnergyData }
  | { type: "SET_ACTIVITIES"; payload: Activity[] }
  | { type: "UPDATE_DEVICE"; payload: { id: string; updates: Partial<Device> } }
  | { type: "UPDATE_SYSTEM_STATUS"; payload: Partial<SystemStatus> };

const initialState: DashboardState = {
  devices: [],
  weather: null,
  energy: null,
  activities: [],
  systemStatus: {
    devicesOnline: 0,
    totalDevices: 0,
    networkStatus: "connected",
    lastUpdate: new Date(),
  },
  loading: true,
  error: null,
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_DEVICES":
      return {
        ...state,
        devices: action.payload,
        systemStatus: {
          ...state.systemStatus,
          devicesOnline: action.payload.filter(d => d.isOnline).length,
          totalDevices: action.payload.length,
          lastUpdate: new Date(),
        },
      };
    case "SET_WEATHER":
      return { ...state, weather: action.payload };
    case "SET_ENERGY":
      return { ...state, energy: action.payload };
    case "SET_ACTIVITIES":
      return { ...state, activities: action.payload };
    case "UPDATE_DEVICE":
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id
            ? { ...device, ...action.payload.updates }
            : device
        ),
      };
    case "UPDATE_SYSTEM_STATUS":
      return {
        ...state,
        systemStatus: { ...state.systemStatus, ...action.payload },
      };
    default:
      return state;
  }
}

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
