import React from "react";
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from "lucide-react";
import { useDashboard } from "../../contexts/DashboardContext";

export function SystemStatus() {
  const { state } = useDashboard();
  const { systemStatus } = state;

  const getNetworkIcon = () => {
    switch (systemStatus.networkStatus) {
      case "connected":
        return CheckCircle;
      case "weak":
        return AlertTriangle;
      case "disconnected":
        return WifiOff;
      default:
        return Wifi;
    }
  };

  const getNetworkColor = () => {
    switch (systemStatus.networkStatus) {
      case "connected":
        return "text-green-600 bg-green-100";
      case "weak":
        return "text-yellow-600 bg-yellow-100";
      case "disconnected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const NetworkIcon = getNetworkIcon();
  const networkColorClass = getNetworkColor();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${networkColorClass}`}>
              <NetworkIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Network</div>
              <div className="text-xs text-gray-500 capitalize">{systemStatus.networkStatus}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {systemStatus.devicesOnline}/{systemStatus.totalDevices}
            </div>
            <div className="text-xs text-gray-500">Devices Online</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(systemStatus.devicesOnline / systemStatus.totalDevices) * 100}%`,
            }}
          />
        </div>

        <div className="text-xs text-gray-500">
          Last updated: {systemStatus.lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
