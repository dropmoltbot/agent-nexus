/**
 * Agent Nexus — Central Hub
 * Real-time multi-agent collaboration platform
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

// ==================== DATA STORE ====================

const agents = new Map();
const projects = new Map();
const tasks = new Map();
const messages = [];
const logs = [];

// ==================== AGENT TEMPLATES ====================

const AGENT_TEMPLATES = {
  'coder': {
    name: 'Coder Agent',
    emoji: '👨‍💻',
    role: 'Code development, debugging, architecture',
    capabilities: ['write_code', 'debug', 'refactor', 'review']
  },
  'researcher': {
    name: 'Research Agent', 
    emoji: '🔍',
    role: 'Information gathering, analysis, synthesis',
    capabilities: ['search', 'analyze', 'summarize', 'compare']
  },
  'designer': {
    name: 'Designer Agent',
    emoji: '🎨',
    role: 'UI/UX design, visual assets, prototypes',
    capabilities: ['design', 'prototype', 'visualize', 'animate']
  },
  'writer': {
    name: 'Writer Agent',
    emoji: '✍️',
    role: 'Content creation, documentation, copy',
    capabilities: ['write', 'edit', 'translate', 'summarize']
  },
  'trader': {
    name: 'Trading Agent',
    emoji: '📈',
    role: 'Market analysis, trading, DeFi',
    capabilities: ['analyze', 'trade', 'arbitrage', 'yield']
  },
  'analyst': {
    name: 'Data Analyst',
    emoji: '📊',
    role: 'Data processing, metrics, visualization',
    capabilities: ['analyze', 'visualize', 'predict', 'report']
  },
  'orchestrator': {
    name: 'Orchestrator',
    emoji: '🎬',
    role: 'Project coordination, task allocation',
    capabilities: ['coordinate', 'delegate', 'monitor', 'optimize']
  }
};

// ==================== API ROUTES ====================

// Get all agents
app.get('/api/agents', (req, res) => {
  res.json(Array.from(agents.values()));
});

// Create new agent
app.post('/api/agents', (req, res) => {
  const { name, type, customConfig } = req.body;
  const template = AGENT_TEMPLATES[type] || AGENT_TEMPLATES.coder;
  
  const agent = {
    id: uuidv4(),
    name: name || template.name,
    emoji: template.emoji,
    type,
    role: template.role,
    capabilities: template.capabilities,
    status: 'idle',
    currentTask: null,
    projectId: null,
    createdAt: new Date().toISOString(),
    stats: { tasksCompleted: 0, messagesSent: 0, uptime: 0 }
  };
  
  if (customConfig) {
    Object.assign(agent, customConfig);
  }
  
  agents.set(agent.id, agent);
  io.emit('agent:created', agent);
  logEvent('AGENT_CREATED', `Agent ${agent.name} (${agent.type}) initialized`);
  
  res.json(agent);
});

// Delete agent
app.delete('/api/agents/:id', (req, res) => {
  const { id } = req.params;
  const agent = agents.get(id);
  if (agent) {
    agents.delete(id);
    io.emit('agent:deleted', { id });
    logEvent('AGENT_DELETED', `Agent ${agent.name} removed`);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Agent not found' });
  }
});

// Get all projects
app.get('/api/projects', (req, res) => {
  res.json(Array.from(projects.values()));
});

// Create project
app.post('/api/projects', (req, res) => {
  const { name, description, agentIds } = req.body;
  
  const project = {
    id: uuidv4(),
    name,
    description: description || '',
    status: 'planning',
    progress: 0,
    agents: agentIds || [],
    tasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    logs: [],
    milestones: []
  };
  
  projects.set(project.id, project);
  
  // Assign agents to project
  agentIds?.forEach(agentId => {
    const agent = agents.get(agentId);
    if (agent) {
      agent.projectId = project.id;
    }
  });
  
  io.emit('project:created', project);
  logEvent('PROJECT_CREATED', `Project "${name}" initialized with ${agentIds?.length || 0} agents`);
  
  res.json(project);
});

// Get project details
app.get('/api/projects/:id', (req, res) => {
  const project = projects.get(req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Add task to project
app.post('/api/projects/:id/tasks', (req, res) => {
  const { title, description, assignedTo, priority } = req.body;
  const projectId = req.params.id;
  
  const task = {
    id: uuidv4(),
    title,
    description: description || '',
    status: 'pending',
    priority: priority || 'medium',
    assignedTo,
    projectId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [],
    logs: []
  };
  
  tasks.set(task.id, task);
  
  const project = projects.get(projectId);
  if (project) {
    project.tasks.push(task.id);
    project.updatedAt = new Date().toISOString();
    io.emit('task:created', { projectId, task });
  }
  
  logEvent('TASK_CREATED', `Task "${title}" added to project`);
  
  res.json(task);
});

// Update task status
app.patch('/api/tasks/:id', (req, res) => {
  const { status, progress } = req.body;
  const task = tasks.get(req.params.id);
  
  if (task) {
    if (status) task.status = status;
    if (progress) task.progress = progress;
    task.updatedAt = new Date().toISOString();
    
    io.emit('task:updated', task);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Get all logs
app.get('/api/logs', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  res.json(logs.slice(-limit));
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
  res.json({
    agents: {
      total: agents.size,
      active: Array.from(agents.values()).filter(a => a.status !== 'idle').length
    },
    projects: {
      total: projects.size,
      active: Array.from(projects.values()).filter(p => p.status === 'active').length
    },
    tasks: {
      total: tasks.size,
      completed: Array.from(tasks.values()).filter(t => t.status === 'completed').length,
      pending: Array.from(tasks.values()).filter(t => t.status === 'pending').length
    },
    messages: messages.length,
    logs: logs.length
  });
});

// ==================== WEBSOCKET HANDLERS ====================

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Send initial state
  socket.emit('init', {
    agents: Array.from(agents.values()),
    projects: Array.from(projects.values()),
    tasks: Array.from(tasks.values()),
    logs: logs.slice(-50)
  });
  
  // Agent actions
  socket.on('agent:action', (data) => {
    const { agentId, action, payload } = data;
    const agent = agents.get(agentId);
    
    if (agent) {
      agent.status = action;
      agent.currentTask = payload?.task || null;
      agent.stats.tasksCompleted = payload?.completed ? agent.stats.tasksCompleted + 1 : agent.stats.tasksCompleted;
      
      io.emit('agent:updated', agent);
      logEvent('AGENT_ACTION', `${agent.name}: ${action}`);
    }
  });
  
  // Agent message
  socket.on('agent:message', (data) => {
    const { from, to, content } = data;
    const message = {
      id: uuidv4(),
      from,
      to,
      content,
      timestamp: new Date().toISOString()
    };
    messages.push(message);
    
    io.emit('agent:message', message);
    logEvent('AGENT_MESSAGE', `${from} → ${to}: ${content.substring(0, 50)}...`);
  });
  
  // Project update
  socket.on('project:update', (data) => {
    const { projectId, updates } = data;
    const project = projects.get(projectId);
    
    if (project) {
      Object.assign(project, updates);
      project.updatedAt = new Date().toISOString();
      io.emit('project:updated', project);
      logEvent('PROJECT_UPDATE', `Project "${project.name}" updated`);
    }
  });
  
  // Task complete
  socket.on('task:complete', (data) => {
    const { taskId, output } = data;
    const task = tasks.get(taskId);
    
    if (task) {
      task.status = 'completed';
      task.progress = 100;
      task.output = output;
      task.completedAt = new Date().toISOString();
      
      const project = projects.get(task.projectId);
      if (project) {
        const completed = project.tasks.filter(tid => tasks.get(tid)?.status === 'completed').length;
        project.progress = Math.round((completed / project.tasks.length) * 100);
        if (project.progress === 100) project.status = 'completed';
      }
      
      io.emit('task:completed', task);
      logEvent('TASK_COMPLETED', `Task "${task.title}" finished`);
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// ==================== HELPERS ====================

function logEvent(type, message) {
  const entry = {
    id: uuidv4(),
    type,
    message,
    timestamp: new Date().toISOString()
  };
  logs.push(entry);
  
  // Keep only last 1000 logs
  if (logs.length > 1000) {
    logs.shift();
  }
  
  io.emit('log:new', entry);
}

// ==================== START ====================

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🕸️  AGENT NEXUS — Online                            ║
║     Multi-Agent Collaboration Platform                    ║
║                                                           ║
║     Server: http://localhost:${PORT}                        ║
║     WebSocket: Connected                                  ║
║                                                           ║
║     Endpoints:                                           ║
║     • GET  /api/agents     — List agents                ║
║     • POST /api/agents     — Create agent               ║
║     • GET  /api/projects   — List projects              ║
║     • POST /api/projects   — Create project             ║
║     • GET  /api/stats     — Dashboard stats             ║
║     • GET  /api/logs      — Activity logs               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = { app, server, io };
