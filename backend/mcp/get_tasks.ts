import { api } from 'encore.dev/api';
import type { MCPTask } from './types';

export const getTasks = api(
  { method: "GET", path: "/mcp/tasks", expose: true },
  async (): Promise<{ tasks: MCPTask[] }> => {
    // Mock MCP tasks for smart home automation
    const tasks: MCPTask[] = [
      {
        id: 'energy-optimization',
        name: 'Energy Optimization',
        description: 'AI-driven energy usage optimization across all devices',
        type: 'automation',
        status: 'running',
        progress: 75,
        tools: ['device-control', 'context-analyzer'],
        context: {
          currentUsage: '2.4kW',
          target: '2.0kW',
          affectedDevices: ['LED strips', 'Thermostat', 'Router']
        },
        createdAt: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: 'weather-adaptation',
        name: 'Weather-Based Adaptation',
        description: 'Automatically adjust home settings based on weather conditions',
        type: 'workflow',
        status: 'completed',
        progress: 100,
        tools: ['context-analyzer', 'automation-engine'],
        context: {
          weather: 'rainy',
          adjustments: ['increased heating', 'dimmed lights'],
          energyImpact: '+0.3kW'
        },
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        completedAt: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        id: 'security-monitor',
        name: 'Security Monitoring',
        description: 'AI-powered security analysis and threat detection',
        type: 'monitoring',
        status: 'running',
        progress: 100,
        tools: ['predictive-monitor', 'context-analyzer'],
        context: {
          camerasActive: 1,
          lastIncident: 'none',
          threatLevel: 'low'
        },
        createdAt: new Date(Date.now() - 86400000) // 24 hours ago
      },
      {
        id: 'usage-prediction',
        name: 'Usage Prediction',
        description: 'Predict device usage patterns for next week',
        type: 'prediction',
        status: 'pending',
        progress: 0,
        tools: ['predictive-monitor'],
        context: {
          historicalData: '30 days',
          targetPeriod: 'next 7 days'
        },
        createdAt: new Date()
      }
    ];

    return { tasks };
  }
);