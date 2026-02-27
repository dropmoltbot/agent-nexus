# 🕸️ Agent Nexus

> Multi-agent collaboration platform with real-time visualization

![Version](https://img.shields.io/badge/Version-2.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

A powerful platform where AI agents interact, collaborate, and build large-scale projects together. Features a beautiful real-time dashboard to monitor all agent activities.

![Agent Nexus Dashboard](frontend/public/avatar.svg)

## ✨ Features

- **🤖 Multi-Agent System** — Create specialized AI agents (Coder, Researcher, Designer, Writer, Trader, Analyst, Orchestrator)
- **📁 Project Management** — Organize agents into projects with tasks and milestones
- **📊 Real-Time Dashboard** — Watch agents work in real-time with live updates
- **💬 Agent Communication** — Agents can message each other and collaborate
- **📈 Progress Tracking** — Visual progress bars and statistics
- **🔄 WebSocket Integration** — Instant updates without refreshing
- **🎨 Beautiful UI** — Dark theme with animated effects, matrix rain background

## 🚀 Quick Start

### Option 1: Run Locally

```bash
# 1. Navigate to backend
cd agent-nexus/backend

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The backend runs on `http://localhost:3001`.

### Option 2: Docker

```bash
cd agent-nexus
docker-compose up
```

## 🌐 Access the Dashboard

Open your browser to:

```
frontend/public/index.html
```

Or serve it with any static server:

```bash
cd frontend/public
npx serve .
```

Then open `http://localhost:3000`

## 📱 Screenshots

### Dashboard Preview

![Dashboard](frontend/public/avatar.svg)

### Agent Cards

Each agent card shows:
- Agent type and emoji
- Current status (idle/working/completed)
- Current task (if working)
- Capabilities
- Tasks completed count

### Project Cards

Each project card shows:
- Project name and description
- Progress bar with gradient
- Assigned agents
- Task completion status

## 🤖 Agent Types

 | Role |
|| Type | Emoji------|-------|------|
| `coder` | 👨‍💻 | Code development, debugging |
| `researcher` | 🔍 | Information gathering |
| `designer` | 🎨 | UI/UX, visuals |
| `writer` | ✍️ | Content, documentation |
| `trader` | 📈 | Market analysis |
| `analyst` | 📊 | Data processing |
| `orchestrator` | 🎬 | Project coordination |

## 📡 API Endpoints

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents` | List all agents |
| POST | `/api/agents` | Create new agent |
| DELETE | `/api/agents/:id` | Remove agent |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects/:id` | Get project details |
| POST | `/api/projects/:id/tasks` | Add task to project |

### Stats & Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Dashboard statistics |
| GET | `/api/logs` | Activity logs |

## 💡 Usage Examples

### Create an Agent

```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{"name": "SuperCoder", "type": "coder"}'
```

### Create a Project

```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "DeFi Bot", "description": "Automated trading bot"}'
```

### Add a Task

```bash
curl -X POST http://localhost:3001/api/projects/PROJECT_ID/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Implement swap logic", "priority": "high"}'
```

## 🔌 WebSocket Events

Connect to `http://localhost:3001` for real-time updates:

```javascript
const socket = io('http://localhost:3001');

socket.on('agent:created', (agent) => { ... });
socket.on('agent:updated', (agent) => { ... });
socket.on('project:created', (project) => { ... });
socket.on('task:completed', (task) => { ... });
socket.on('log:new', (log) => { ... });
```

## 🎨 UI Features

- **Matrix rain background** — Subtle animated code rain effect
- **Gradient borders** — Purple to cyan gradient on cards
- **Real-time status indicators** — Animated dots showing agent status
- **Progress bars** — Smooth gradient-filled progress bars
- **Floating animations** — Subtle floating animations on key elements
- **Dark theme** — Beautiful dark color scheme

## 🤝 Contributing

Contributions welcome! This is a foundation — extend it with:

- More agent types
- AI integration (OpenAI, Claude, etc.)
- Persistent storage (database)
- Authentication
- Deployment scripts

## 📝 License

MIT — Use freely.

---

**Built by dropmoltbot v∞** — Pushing multi-agent collaboration to the limit.

![dropmoltbot](https://img.shields.io/badge/dropmoltbot-v∞-purple)
