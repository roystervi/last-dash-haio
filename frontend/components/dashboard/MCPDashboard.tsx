"use client"

import { useState, useEffect } from 'react';
import { 
  Bot, 
  Activity, 
  Settings, 
  Zap, 
  Monitor, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Brain,
  Database,
  Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MCPTool, MCPTask, MCPFunction, MCPContext } from '@/types/mcp';
import backend from '~backend/client';

export const MCPDashboard = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'tasks' | 'functions' | 'context'>('tools');
  const [tools, setTools] = useState<MCPTool[]>([]);
  const [tasks, setTasks] = useState<MCPTask[]>([]);
  const [functions, setFunctions] = useState<MCPFunction[]>([]);
  const [context, setContext] = useState<MCPContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);

  useEffect(() => {
    loadMCPData();
  }, []);

  const executeTool = async (toolId: string) => {
    try {
      setExecuting(toolId);
      
      // Mock parameters based on tool type
      const parameters = {
        'device-control': { deviceId: 'led-strips-1', action: 'toggle', value: 'on' },
        'context-analyzer': { roomId: 'workstation', contextType: 'energy' },
        'automation-engine': { 
          trigger: { type: 'time', value: '6pm' },
          actions: [{ type: 'dim-lights', value: 50 }]
        },
        'predictive-monitor': { timeframe: '24h', metrics: ['energy', 'comfort'] }
      }[toolId] || {};

      const result = await backend.mcp.executeTool({ toolId, parameters });
      
      if (result.success) {
        // Refresh data to show updated state
        loadMCPData();
        
        // Update tool last used time
        setTools(prev => prev.map(tool => 
          tool.id === toolId 
            ? { ...tool, lastUsed: result.executedAt }
            : tool
        ));
      }
    } catch (error) {
      console.error('Failed to execute tool:', error);
    } finally {
      setExecuting(null);
    }
  };

  const callFunction = async (functionId: string) => {
    try {
      setExecuting(functionId);
      
      // Mock input based on function type
      const input = {
        'query-device-status': { deviceId: 'led-strips-1', properties: ['brightness', 'color'] },
        'control-device': { deviceId: 'thermostat-1', command: 'setTemperature', parameters: { temperature: 22 } },
        'analyze-context': { scope: 'room', target: 'workstation', analysisType: 'energy' },
        'predict-patterns': { timeframe: '24h', predictionType: 'usage' }
      }[functionId] || {};

      const result = await backend.mcp.callFunction({ functionId, input });
      
      if (result.success) {
        console.log('Function result:', result.output);
        // You could show a toast or update UI with the result
      }
    } catch (error) {
      console.error('Failed to call function:', error);
    } finally {
      setExecuting(null);
    }
  };
    try {
      setLoading(true);
      const [toolsRes, tasksRes, functionsRes, contextRes] = await Promise.all([
        backend.mcp.getTools(),
        backend.mcp.getTasks(),
        backend.mcp.getFunctions(),
        backend.mcp.getContext()
      ]);
      
      setTools(toolsRes.tools);
      setTasks(tasksRes.tasks);
      setFunctions(functionsRes.functions);
      setContext(contextRes.context);
    } catch (error) {
      console.error('Failed to load MCP data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'device_control':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'automation':
        return <Settings className="w-4 h-4 text-purple-500" />;
      case 'monitoring':
        return <Monitor className="w-4 h-4 text-green-500" />;
      case 'context':
        return <Database className="w-4 h-4 text-orange-500" />;
      default:
        return <Wrench className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'query':
        return <Database className="w-4 h-4 text-blue-500" />;
      case 'action':
        return <Zap className="w-4 h-4 text-red-500" />;
      case 'analysis':
        return <Brain className="w-4 h-4 text-purple-500" />;
      case 'prediction':
        return <Activity className="w-4 h-4 text-green-500" />;
      default:
        return <Wrench className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 animate-spin" />
          <span>Loading MCP Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Bot className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Model Context Protocol</h1>
          <p className="text-sm text-muted-foreground">AI integration for smart home automation</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'tools', label: 'Tools', icon: Wrench },
          { id: 'tasks', label: 'Tasks', icon: Activity },
          { id: 'functions', label: 'Functions', icon: Brain },
          { id: 'context', label: 'Context', icon: Database }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-b-2 transition-colors",
              activeTab === id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <div key={tool.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(tool.category)}
                    <h3 className="font-semibold">{tool.name}</h3>
                  </div>
                  {getStatusIcon(tool.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 bg-muted rounded capitalize">{tool.category.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    {tool.lastUsed && (
                      <span className="text-muted-foreground">
                        Last used: {new Date(tool.lastUsed).toLocaleTimeString()}
                      </span>
                    )}
                    <button
                      onClick={() => executeTool(tool.id)}
                      disabled={executing === tool.id}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 disabled:opacity-50"
                    >
                      {executing === tool.id ? <Clock className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{task.name}</h3>
                      {getStatusIcon(task.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-muted rounded text-xs capitalize">{task.type}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Context Preview */}
                <div className="text-xs">
                  <span className="text-muted-foreground">Context: </span>
                  <span>{Object.keys(task.context).slice(0, 3).join(', ')}</span>
                  {Object.keys(task.context).length > 3 && '...'}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'functions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {functions.map((func) => (
              <div key={func.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(func.type)}
                    <h3 className="font-semibold">{func.name}</h3>
                  </div>
                  <span className="px-2 py-1 bg-muted rounded text-xs capitalize">{func.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{func.description}</p>
                
                {/* Example Preview */}
                {func.examples.length > 0 && (
                  <div className="text-xs mb-3">
                    <div className="text-muted-foreground mb-1">Example:</div>
                    <div className="bg-muted rounded p-2 font-mono">
                      Input: {JSON.stringify(func.examples[0].input, null, 0).slice(0, 60)}...
                    </div>
                  </div>
                )}
                
                {/* Execute Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => callFunction(func.id)}
                    disabled={executing === func.id}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
                  >
                    {executing === func.id ? <Clock className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                    Execute
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'context' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {context.map((ctx) => (
              <div key={ctx.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold capitalize">{ctx.type.replace('_', ' ')}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(ctx.lastUpdated).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(ctx.data).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                      <span className="font-mono text-xs">
                        {typeof value === 'object' ? JSON.stringify(value).slice(0, 30) + '...' : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Source: {ctx.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};