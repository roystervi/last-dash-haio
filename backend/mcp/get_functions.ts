import { api } from 'encore.dev/api';
import type { MCPFunction } from './types';

export const getFunctions = api(
  { method: "GET", path: "/mcp/functions", expose: true },
  async (): Promise<{ functions: MCPFunction[] }> => {
    // Mock MCP functions for AI integration
    const functions: MCPFunction[] = [
      {
        id: 'query-device-status',
        name: 'Query Device Status',
        description: 'Get current status and properties of any smart home device',
        type: 'query',
        inputSchema: {
          type: 'object',
          properties: {
            deviceId: { type: 'string', description: 'Device identifier' },
            properties: { type: 'array', items: { type: 'string' }, description: 'Specific properties to query' }
          },
          required: ['deviceId']
        },
        outputSchema: {
          type: 'object',
          properties: {
            deviceId: { type: 'string' },
            status: { type: 'string' },
            properties: { type: 'object' },
            lastUpdated: { type: 'string', format: 'date-time' }
          }
        },
        examples: [
          {
            input: { deviceId: 'led-strips-1', properties: ['brightness', 'color'] },
            output: { deviceId: 'led-strips-1', status: 'on', properties: { brightness: 35, color: 'purple-pink' }, lastUpdated: '2024-12-29T12:45:00Z' }
          }
        ]
      },
      {
        id: 'control-device',
        name: 'Control Device',
        description: 'Execute commands on smart home devices',
        type: 'action',
        inputSchema: {
          type: 'object',
          properties: {
            deviceId: { type: 'string', description: 'Device identifier' },
            command: { type: 'string', description: 'Command to execute' },
            parameters: { type: 'object', description: 'Command parameters' }
          },
          required: ['deviceId', 'command']
        },
        outputSchema: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            deviceId: { type: 'string' },
            newState: { type: 'object' },
            executedAt: { type: 'string', format: 'date-time' }
          }
        },
        examples: [
          {
            input: { deviceId: 'thermostat-1', command: 'setTemperature', parameters: { temperature: 22 } },
            output: { success: true, deviceId: 'thermostat-1', newState: { temperature: 22, mode: 'cooling' }, executedAt: '2024-12-29T12:45:00Z' }
          }
        ]
      },
      {
        id: 'analyze-context',
        name: 'Analyze Context',
        description: 'Analyze current home context for AI decision making',
        type: 'analysis',
        inputSchema: {
          type: 'object',
          properties: {
            scope: { type: 'string', enum: ['room', 'home', 'device'], description: 'Analysis scope' },
            target: { type: 'string', description: 'Target identifier (room/device ID)' },
            analysisType: { type: 'string', enum: ['energy', 'comfort', 'security', 'automation'], description: 'Type of analysis' }
          },
          required: ['scope', 'analysisType']
        },
        outputSchema: {
          type: 'object',
          properties: {
            analysis: { type: 'object' },
            recommendations: { type: 'array', items: { type: 'object' } },
            confidence: { type: 'number', minimum: 0, maximum: 1 },
            analyzedAt: { type: 'string', format: 'date-time' }
          }
        },
        examples: [
          {
            input: { scope: 'room', target: 'workstation', analysisType: 'energy' },
            output: { 
              analysis: { currentUsage: '250W', efficiency: 0.75, peakHours: ['9am-11am', '2pm-4pm'] },
              recommendations: [{ action: 'dim-lights', impact: '-50W', confidence: 0.9 }],
              confidence: 0.85,
              analyzedAt: '2024-12-29T12:45:00Z'
            }
          }
        ]
      },
      {
        id: 'predict-patterns',
        name: 'Predict Patterns',
        description: 'Predict future usage patterns and device behavior',
        type: 'prediction',
        inputSchema: {
          type: 'object',
          properties: {
            timeframe: { type: 'string', description: 'Prediction timeframe (e.g., "24h", "7d")' },
            devices: { type: 'array', items: { type: 'string' }, description: 'Device IDs to analyze' },
            predictionType: { type: 'string', enum: ['usage', 'failure', 'optimization'], description: 'Type of prediction' }
          },
          required: ['timeframe', 'predictionType']
        },
        outputSchema: {
          type: 'object',
          properties: {
            predictions: { type: 'array', items: { type: 'object' } },
            confidence: { type: 'number', minimum: 0, maximum: 1 },
            factors: { type: 'array', items: { type: 'string' } },
            predictedAt: { type: 'string', format: 'date-time' }
          }
        },
        examples: [
          {
            input: { timeframe: '24h', devices: ['thermostat-1'], predictionType: 'usage' },
            output: {
              predictions: [{ device: 'thermostat-1', expectedUsage: '2.4kWh', peakTime: '6pm-8pm' }],
              confidence: 0.78,
              factors: ['weather forecast', 'historical patterns', 'current season'],
              predictedAt: '2024-12-29T12:45:00Z'
            }
          }
        ]
      }
    ];

    return { functions };
  }
);