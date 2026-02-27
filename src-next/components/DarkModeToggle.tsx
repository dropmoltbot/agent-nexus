'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Default is dark, so we're always in dark mode
    document.documentElement.classList.add('dark')
  }, [])

  const toggle = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.button
      onClick={toggle}
      className="relative w-16 h-8 rounded-full bg-white/10 border border-white/10 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="dark"
            initial={{ x: -40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-end pr-1"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Moon className="w-5 h-5 text-violet-400" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            exit={{ x: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-start pl-1"
          >
            <Sun className="w-5 h-5 text-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Track */}
      <motion.div
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-1 w-6 h-6 rounded-full bg-violet-500"
      />
    </motion.button>
  )
}
