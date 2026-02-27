'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import LiveDemo from '@/components/LiveDemo'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import CustomCursor from '@/components/CustomCursor'
import GlowOrb from '@/components/GlowOrb'
import LiveCounters from '@/components/LiveCounters'
import DarkModeToggle from '@/components/DarkModeToggle'
import LoadingScreen from '@/components/LoadingScreen'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <LoadingScreen />
      <CustomCursor />
      <GlowOrb />
      
      <div className="noise-overlay fixed inset-0 pointer-events-none" />
      
      <Navbar />
      <Hero />
      
      {/* Live Counters Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <LiveCounters />
        </div>
      </section>
      
      <Features />
      <LiveDemo />
      <Testimonials />
      <CTA />
    </main>
  )
}
