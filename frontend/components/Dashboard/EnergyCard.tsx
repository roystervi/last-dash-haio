import React from "react";
import { Zap, TrendingDown, BarChart3 } from "lucide-react";
import { useDashboard } from "../../contexts/DashboardContext";

export function EnergyCard() {
  const { state } = useDashboard();
  const energy = state.energy;

  if (!energy) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  const maxUsage = Math.max(...energy.hourlyUsage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Usage</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">{energy.currentUsage} kW</div>
            <div className="text-xs text-gray-500">Current</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
              <BarChart3 className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">{energy.dailyTotal} kWh</div>
            <div className="text-xs text-gray-500">Today</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2">
              <TrendingDown className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">${energy.savings}</div>
            <div className="text-xs text-gray-500">Saved</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">24-Hour Usage</div>
          <div className="flex items-end space-x-1 h-16">
            {energy.hourlyUsage.map((usage, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-200 rounded-sm transition-all hover:bg-blue-300"
                style={{
                  height: `${(usage / maxUsage) * 100}%`,
                  minHeight: "4px",
                }}
                title={`Hour ${i}: ${usage.toFixed(1)} kW`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
