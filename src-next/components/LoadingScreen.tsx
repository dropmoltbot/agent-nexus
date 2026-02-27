'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-2 border-violet-500/20"
        />
        
        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 w-20 h-20 rounded-full border-2 border-cyan-500/30 border-t-cyan-500"
        />
        
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 w-16 h-16 rounded-full border-2 border-violet-500/40 border-t-violet-500"
        />
        
        {/* Center icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Globe className="w-8 h-8 text-violet-400" />
        </motion.div>
      </div>
      
      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-1/4"
      >
        <span className="text-gradient text-lg font-semibold">Loading Agent Nexus</span>
      </motion.div>
    </motion.div>
  )
}
