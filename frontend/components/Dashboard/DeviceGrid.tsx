import React from "react";
import { DeviceCard } from "./DeviceCard";
import { useDashboard } from "../../contexts/DashboardContext";
import { useScreenSize } from "../../hooks/useScreenSize";

export function DeviceGrid() {
  const { state } = useDashboard();
  const screenSize = useScreenSize();

  const getGridColumns = () => {
    switch (screenSize) {
      case "mobile":
        return "grid-cols-1";
      case "tablet":
        return "grid-cols-2";
      default:
        return "grid-cols-3 xl:grid-cols-4";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Devices</h3>
      <div className={`grid ${getGridColumns()} gap-4`}>
        {state.devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}
