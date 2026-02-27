'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Bot, Zap, Activity } from 'lucide-react'

export default function LiveCounters() {
  const [stats, setStats] = useState({
    users: 1247,
    agents: 342,
    tasks: 8934,
    uptime: 99.9,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        agents: prev.agents + Math.floor(Math.random() * 2),
        tasks: prev.tasks + Math.floor(Math.random() * 10),
        uptime: 99.5 + Math.random() * 0.5,
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const counters = [
    { icon: Users, value: stats.users, label: 'Active Users', color: 'violet' },
    { icon: Bot, value: stats.agents, label: 'Active Agents', color: 'cyan' },
    { icon: Zap, value: stats.tasks, label: 'Tasks Completed', color: 'amber' },
    { icon: Activity, value: `${stats.uptime.toFixed(1)}%`, label: 'Uptime', color: 'emerald', isPercent: true },
  ]

  const colorMap: Record<string, string> = {
    violet: 'text-violet-400 bg-violet-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/20',
    amber: 'text-amber-400 bg-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/20',
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {counters.map((counter, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bento-item text-center"
        >
          <div className={`w-12 h-12 rounded-xl ${colorMap[counter.color]} flex items-center justify-center mx-auto mb-3`}>
            <counter.icon className="w-6 h-6" />
          </div>
          <motion.div
            key={counter.value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl md:text-3xl font-bold text-gradient"
          >
            {counter.isPercent ? counter.value : counter.value.toLocaleString()}
          </motion.div>
          <div className="text-sm text-muted-foreground">{counter.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
