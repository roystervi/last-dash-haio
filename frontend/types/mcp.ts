export interface MCPTool {
  id: string;
  name: string;
  description: string;
  category: 'device_control' | 'automation' | 'monitoring' | 'context';
  parameters: Record<string, any>;
  lastUsed?: Date;
  status: 'active' | 'inactive' | 'error';
}

export interface MCPTask {
  id: string;
  name: string;
  description: string;
  type: 'automation' | 'workflow' | 'monitoring' | 'prediction';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  tools: string[]; // Tool IDs
  context: Record<string, any>;
  createdAt: Date;
  completedAt?: Date;
}

export interface MCPContext {
  id: string;
  type: 'device_state' | 'environment' | 'user_preferences' | 'system_status';
  data: Record<string, any>;
  lastUpdated: Date;
  source: string;
}

export interface MCPFunction {
  id: string;
  name: string;
  description: string;
  type: 'query' | 'action' | 'analysis' | 'prediction';
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
  examples: Array<{
    input: Record<string, any>;
    output: Record<string, any>;
  }>;
}