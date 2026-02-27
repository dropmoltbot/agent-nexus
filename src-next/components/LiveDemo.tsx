'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Search, Palette, PenTool, TrendingUp, BarChart3, Cpu, Activity, Clock, Zap } from 'lucide-react'

const agentActivities = [
  {
    agent: 'Coder',
    icon: Bot,
    color: 'violet',
    action: 'Implementing new API endpoint for agent communication',
    time: 'just now',
  },
  {
    agent: 'Researcher',
    icon: Search,
    color: 'cyan',
    action: 'Analyzing market trends for DeFi opportunities',
    time: '2s ago',
  },
  {
    agent: 'Designer',
    icon: Palette,
    color: 'pink',
    action: 'Generating UI components for dashboard',
    time: '5s ago',
  },
  {
    agent: 'Writer',
    icon: PenTool,
    color: 'emerald',
    action: 'Drafting technical documentation',
    time: '8s ago',
  },
  {
    agent: 'Trader',
    icon: TrendingUp,
    color: 'amber',
    action: 'Scanning for arbitrage opportunities on Base',
    time: '12s ago',
  },
  {
    agent: 'Analyst',
    icon: BarChart3,
    color: 'blue',
    action: 'Processing on-chain data for portfolio',
    time: '15s ago',
  },
]

const colorMap: Record<string, string> = {
  violet: 'bg-violet-500/20 text-violet-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  pink: 'bg-pink-500/20 text-pink-400',
  emerald: 'bg-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/20 text-amber-400',
  blue: 'bg-blue-500/20 text-blue-400',
}

export default function LiveDemo() {
  const [activities, setActivities] = useState(agentActivities.slice(0, 3))
  const [stats, setStats] = useState({ tasks: 0, agents: 3, uptime: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const random = agentActivities[Math.floor(Math.random() * agentActivities.length)]
      setActivities(prev => [random, ...prev.slice(0, 2)])
    }, 3000)

    const statsInterval = setInterval(() => {
      setStats(prev => ({
        tasks: prev.tasks + Math.floor(Math.random() * 3),
        agents: 3 + Math.floor(Math.random() * 2),
        uptime: prev.uptime + 1,
      }))
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(statsInterval)
    }
  }, [])

  return (
    <section id="demo" className="relative py-32 bg-black/20">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <Activity className="w-4 h-4 inline mr-2" />
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">See agents in</span>{' '}
            <span className="text-gradient">action</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch autonomous agents collaborate on real tasks in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Agent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-8 bento-item"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Live Agent Activity
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">{stats.agents} agents active</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {activities.map((activity, index) => (
                  <motion.div
                    key={`${activity.agent}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[activity.color]}`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{activity.agent} Agent</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 lg:col-span-4 space-y-4"
          >
            <div className="bento-item text-center">
              <div className="text-4xl font-bold text-gradient mb-2">
                {stats.tasks}
              </div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="bento-item text-center">
              <div className="text-4xl font-bold text-gradient mb-2 flex items-center justify-center gap-2">
                <Zap className="w-6 h-6 text-amber-400" />
                {stats.uptime}s
              </div>
              <div className="text-sm text-muted-foreground">Session Uptime</div>
            </div>
            <div className="bento-item text-center">
              <div className="text-4xl font-bold text-gradient mb-2">
                <Cpu className="w-8 h-8 inline text-purple-400" />
              </div>
              <div className="text-sm text-muted-foreground">All Systems Operational</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
