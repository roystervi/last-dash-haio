import React, { useEffect } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useScreenSize } from "../hooks/useScreenSize";
import { DeviceGrid } from "./Dashboard/DeviceGrid";
import { WeatherCard } from "./Dashboard/WeatherCard";
import { EnergyCard } from "./Dashboard/EnergyCard";
import { ActivityFeed } from "./Dashboard/ActivityFeed";
import { SystemStatus } from "./Dashboard/SystemStatus";
import backend from "~backend/client";

export function DashboardContent() {
  const { state, dispatch } = useDashboard();
  const screenSize = useScreenSize();

  useEffect(() => {
    async function loadDashboardData() {
      dispatch({ type: "SET_LOADING", payload: true });
      
      try {
        const [devicesRes, weatherRes, energyRes, activitiesRes] = await Promise.all([
          backend.devices.list(),
          backend.weather.get(),
          backend.energy.get(),
          backend.activity.list(),
        ]);

        dispatch({ type: "SET_DEVICES", payload: devicesRes.devices });
        dispatch({ type: "SET_WEATHER", payload: weatherRes });
        dispatch({ type: "SET_ENERGY", payload: energyRes });
        dispatch({ type: "SET_ACTIVITIES", payload: activitiesRes.activities });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        dispatch({ type: "SET_ERROR", payload: "Failed to load dashboard data" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    loadDashboardData();
  }, [dispatch]);

  const getGridLayout = () => {
    switch (screenSize) {
      case "mobile":
        return "grid-cols-1";
      case "tablet":
        return "grid-cols-1 lg:grid-cols-2";
      default:
        return "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3";
    }
  };

  if (state.loading) {
    return (
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (state.error) {
    return (
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-600">{state.error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DeviceGrid />
        
        <div className={`grid ${getGridLayout()} gap-6`}>
          <WeatherCard />
          <EnergyCard />
          <SystemStatus />
          <ActivityFeed />
        </div>
      </div>
    </main>
  );
}
