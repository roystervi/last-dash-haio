import { api } from 'encore.dev/api';
import type { MCPTool } from './types';

export const getTools = api(
  { method: "GET", path: "/mcp/tools", expose: true },
  async (): Promise<{ tools: MCPTool[] }> => {
    // Mock MCP tools for smart home integration
    const tools: MCPTool[] = [
      {
        id: 'device-control',
        name: 'Device Control',
        description: 'Control smart home devices via AI commands',
        category: 'device_control',
        parameters: {
          deviceId: 'string',
          action: 'string',
          value: 'any'
        },
        status: 'active',
        lastUsed: new Date()
      },
      {
        id: 'context-analyzer',
        name: 'Context Analyzer',
        description: 'Analyze smart home context for AI decision making',
        category: 'context',
        parameters: {
          roomId: 'string',
          contextType: 'string'
        },
        status: 'active'
      },
      {
        id: 'automation-engine',
        name: 'Automation Engine',
        description: 'Create and manage automated workflows',
        category: 'automation',
        parameters: {
          trigger: 'object',
          actions: 'array',
          conditions: 'object'
        },
        status: 'active'
      },
      {
        id: 'predictive-monitor',
        name: 'Predictive Monitor',
        description: 'Monitor system health and predict issues',
        category: 'monitoring',
        parameters: {
          metrics: 'array',
          timeframe: 'string'
        },
        status: 'active'
      }
    ];

    return { tools };
  }
);