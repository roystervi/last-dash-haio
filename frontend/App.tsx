import React, { useState, useEffect } from "react";
import { DashboardProvider } from "./contexts/DashboardContext";
import { useScreenSize } from "./hooks/useScreenSize";
import { Sidebar } from "./components/Layout/Sidebar";
import { Header } from "./components/Layout/Header";
import { DeviceGrid } from "./components/Dashboard/DeviceGrid";
import { WeatherCard } from "./components/Dashboard/WeatherCard";
import { EnergyCard } from "./components/Dashboard/EnergyCard";
import { ActivityFeed } from "./components/Dashboard/ActivityFeed";
import { SystemStatus } from "./components/Dashboard/SystemStatus";
import { DashboardContent } from "./components/DashboardContent";

function AppInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize === "desktop") {
      setSidebarOpen(false);
    }
  }, [screenSize]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <DashboardContent />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <AppInner />
    </DashboardProvider>
  );
}
