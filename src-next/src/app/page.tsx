import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import LiveDemo from '@/components/LiveDemo'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="noise-overlay fixed inset-0 pointer-events-none" />
      <Navbar />
      <Hero />
      <Features />
      <LiveDemo />
      <Testimonials />
      <CTA />
    </main>
  )
}
