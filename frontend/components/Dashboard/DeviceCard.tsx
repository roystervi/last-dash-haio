import React from "react";
import { Lightbulb, Thermometer, Lock, Speaker, Wifi, WifiOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import type { Device } from "../../types";
import { useDashboard } from "../../contexts/DashboardContext";
import backend from "~backend/client";

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const { dispatch } = useDashboard();

  const getDeviceIcon = () => {
    switch (device.type) {
      case "light":
        return Lightbulb;
      case "thermostat":
        return Thermometer;
      case "lock":
        return Lock;
      case "speaker":
        return Speaker;
      default:
        return Lightbulb;
    }
  };

  const getDeviceValue = () => {
    switch (device.type) {
      case "light":
        return `${Math.round(device.value)}%`;
      case "thermostat":
        return `${Math.round(device.value)}°F`;
      case "lock":
        return device.value > 0 ? "Locked" : "Unlocked";
      case "speaker":
        return `${Math.round(device.value)}%`;
      default:
        return device.value.toString();
    }
  };

  const handleToggle = async (checked: boolean) => {
    const newValue = checked ? (device.type === "lock" ? 1 : 50) : 0;
    
    dispatch({
      type: "UPDATE_DEVICE",
      payload: { id: device.id, updates: { value: newValue } },
    });

    try {
      await backend.devices.update({ id: device.id, value: newValue });
    } catch (error) {
      console.error("Failed to update device:", error);
      // Revert on error
      dispatch({
        type: "UPDATE_DEVICE",
        payload: { id: device.id, updates: { value: device.value } },
      });
    }
  };

  const handleSliderChange = async (values: number[]) => {
    const newValue = values[0];
    
    dispatch({
      type: "UPDATE_DEVICE",
      payload: { id: device.id, updates: { value: newValue } },
    });

    try {
      await backend.devices.update({ id: device.id, value: newValue });
    } catch (error) {
      console.error("Failed to update device:", error);
    }
  };

  const Icon = getDeviceIcon();

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon
            className={`w-5 h-5 ${
              device.value > 0 && device.isOnline ? "text-blue-600" : "text-gray-400"
            }`}
          />
          <span className="font-medium text-sm text-gray-900">{device.name}</span>
        </div>
        {device.isOnline ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
      </div>

      <div className="text-xs text-gray-500">{device.room}</div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{getDeviceValue()}</span>
        <Switch
          checked={device.value > 0}
          onCheckedChange={handleToggle}
          disabled={!device.isOnline}
        />
      </div>

      {device.type !== "lock" && device.value > 0 && device.isOnline && (
        <div className="space-y-2">
          <Slider
            value={[device.value]}
            onValueChange={handleSliderChange}
            max={device.type === "thermostat" ? 85 : 100}
            min={device.type === "thermostat" ? 60 : 0}
            step={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
