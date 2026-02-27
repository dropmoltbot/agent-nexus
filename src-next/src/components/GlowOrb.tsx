'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function GlowOrb() {
  const orbRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    const moveOrb = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', moveOrb)
    return () => window.removeEventListener('mousemove', moveOrb)
  }, [x, y])

  return (
    <motion.div
      ref={orbRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{
        x: xSpring,
        y: ySpring,
      }}
    >
      <div className="relative">
        {/* Main orb */}
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-transparent blur-3xl" />
        {/* Inner glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-violet-400/20 blur-xl" />
        {/* Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 blur-md" />
      </div>
    </motion.div>
  )
}
