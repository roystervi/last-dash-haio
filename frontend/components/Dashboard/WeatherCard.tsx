import React from "react";
import { Cloud, Droplets, Wind, Eye, Gauge } from "lucide-react";
import { useDashboard } from "../../contexts/DashboardContext";

export function WeatherCard() {
  const { state } = useDashboard();
  const weather = state.weather;

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Cloud className="w-12 h-12 text-gray-400" />
          <div>
            <div className="text-3xl font-bold text-gray-900">{weather.temperature}°F</div>
            <div className="text-sm text-gray-500">{weather.condition}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Wind: {weather.windSpeed} mph</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-purple-500" />
            <span className="text-gray-600">Visibility: {weather.visibility} mi</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-orange-500" />
            <span className="text-gray-600">Pressure: {weather.pressure} in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
