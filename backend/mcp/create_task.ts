import { api } from 'encore.dev/api';

export interface CreateTaskRequest {
  name: string;
  description: string;
  type: 'automation' | 'workflow' | 'monitoring' | 'prediction';
  tools: string[];
  context: Record<string, any>;
}

export interface CreateTaskResponse {
  taskId: string;
  status: 'created';
  estimatedDuration: string;
}

export const createTask = api(
  { method: "POST", path: "/mcp/tasks", expose: true },
  async (req: CreateTaskRequest): Promise<CreateTaskResponse> => {
    // Simulate task creation
    const taskId = `task-${Date.now()}`;
    
    // Estimate duration based on task type
    const durations: Record<string, string> = {
      automation: '5-10 minutes',
      workflow: '15-30 minutes',
      monitoring: 'Continuous',
      prediction: '2-5 minutes'
    };
    
    return {
      taskId,
      status: 'created',
      estimatedDuration: durations[req.type] || '5-10 minutes'
    };
  }
);