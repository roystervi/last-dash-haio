import React from "react";
import { Home, Zap, Activity, Settings, Wifi } from "lucide-react";
import { useAudioLevel } from "../../hooks/useAudioLevel";
import { useDashboard } from "../../contexts/DashboardContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const audioLevel = useAudioLevel();
  const { state } = useDashboard();

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Zap, label: "Energy" },
    { icon: Activity, label: "Activity" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">SmartHome</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-800"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Audio Visualizer */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">System Audio</span>
            <span className="text-xs text-green-400">Live</span>
          </div>
          <div className="flex items-end space-x-1 h-12">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-700 rounded-sm transition-all duration-100"
                style={{
                  height: `${Math.max(8, (Math.sin((i * 0.5) + (audioLevel * 10)) * 0.5 + 0.5) * 100)}%`,
                  backgroundColor: audioLevel > 0.7 ? "#ef4444" : audioLevel > 0.4 ? "#f59e0b" : "#10b981",
                }}
              />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">
                {state.systemStatus.devicesOnline}/{state.systemStatus.totalDevices} Online
              </span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
