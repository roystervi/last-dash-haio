import { api } from 'encore.dev/api';
import type { MCPContext } from './types';

export const getContext = api(
  { method: "GET", path: "/mcp/context", expose: true },
  async (): Promise<{ context: MCPContext[] }> => {
    // Mock MCP context data
    const context: MCPContext[] = [
      {
        id: 'device-states',
        type: 'device_state',
        data: {
          lights: { 'led-strips-1': { on: true, brightness: 35, color: 'purple-pink' } },
          thermostat: { 'thermostat-1': { temperature: 15, target: 15, mode: 'cooling' } },
          cameras: { 'camera-1': { status: 'online', recording: false } },
          router: { 'router-1': { status: 'offline', lastSeen: '2024-12-29T11:30:00Z' } }
        },
        lastUpdated: new Date(),
        source: 'device-manager'
      },
      {
        id: 'environment',
        type: 'environment',
        data: {
          weather: { temperature: 72, condition: 'Partly Cloudy', humidity: 65 },
          location: { zipCode: '32277', coordinates: { lat: 30.3322, lng: -81.3934 } },
          timeOfDay: 'afternoon',
          season: 'winter'
        },
        lastUpdated: new Date(Date.now() - 1800000), // 30 minutes ago
        source: 'weather-service'
      },
      {
        id: 'user-preferences',
        type: 'user_preferences',
        data: {
          themes: { preferred: 'dark', auto: true },
          automation: { enabled: true, aggressiveness: 'balanced' },
          notifications: { enabled: true, types: ['security', 'energy'] },
          rooms: { favorite: 'workstation', priority: ['workstation', 'living-room'] }
        },
        lastUpdated: new Date(Date.now() - 86400000), // 24 hours ago
        source: 'user-settings'
      },
      {
        id: 'system-status',
        type: 'system_status',
        data: {
          connectivity: { wifi: 'excellent', internet: 'good' },
          performance: { cpu: 25, memory: 60, storage: 45 },
          security: { threatLevel: 'low', lastScan: '2024-12-29T06:00:00Z' },
          energy: { currentUsage: '2.4kW', dailyUsage: '15.6kWh', efficiency: 78 }
        },
        lastUpdated: new Date(Date.now() - 300000), // 5 minutes ago
        source: 'system-monitor'
      }
    ];

    return { context };
  }
);