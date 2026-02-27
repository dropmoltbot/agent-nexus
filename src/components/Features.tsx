'use client'

import { motion } from 'framer-motion'
import { 
  Bot, 
  Search, 
  Palette, 
  PenTool, 
  TrendingUp, 
  BarChart3,
  Workflow,
  Cpu,
  Globe,
  MessageSquare,
  Zap,
  Shield
} from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Intelligent Agents',
    description: '7 specialized agent types: Coder, Researcher, Designer, Writer, Trader, Analyst, Orchestrator',
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    gradient: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'hover:border-violet-500/30',
  },
  {
    icon: Workflow,
    title: 'Project Orchestration',
    description: 'Assign agents to projects, track progress, manage tasks with real-time updates',
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-8',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'hover:border-cyan-500/30',
  },
  {
    icon: Zap,
    title: 'Real-Time Visualization',
    description: 'Watch agents work live with WebSocket-powered updates. See every action instantly.',
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'hover:border-amber-500/30',
  },
  {
    icon: MessageSquare,
    title: 'Agent Communication',
    description: 'Agents can message each other, collaborate on tasks, share findings',
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    gradient: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'hover:border-emerald-500/30',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track performance metrics, task completion, agent productivity',
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    gradient: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'hover:border-rose-500/30',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Role-based access, encrypted connections, audit logs',
    colSpan: 'col-span-12',
    gradient: 'from-slate-500/20 to-zinc-500/20',
    borderColor: 'hover:border-slate-500/30',
  },
]

const agentTypes = [
  { icon: Bot, name: 'Coder', color: 'text-violet-400', bg: 'bg-violet-500/20' },
  { icon: Search, name: 'Researcher', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { icon: Palette, name: 'Designer', color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { icon: PenTool, name: 'Writer', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { icon: TrendingUp, name: 'Trader', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { icon: BarChart3, name: 'Analyst', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { icon: Cpu, name: 'Orchestrator', color: 'text-purple-400', bg: 'bg-purple-500/20' },
]

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              orchestrate intelligence
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete platform for creating, managing, and visualizing multi-agent systems at scale.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bento-item ${feature.colSpan} ${feature.borderColor}`}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.featuredGradient ? feature.featuredGradient : feature.gradient} opacity-50`} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-white/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agent Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-10">Agent Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {agentTypes.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group p-4 rounded-2xl bg-card/40 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <agent.icon className={`w-6 h-6 ${agent.color}`} />
                </div>
                <p className="text-sm font-medium text-center">{agent.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
