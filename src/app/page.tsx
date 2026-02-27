import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Features />
      
      {/* Footer */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white text-sm">🕸️</span>
              </div>
              <span className="text-lg font-semibold">Agent Nexus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by dropmoltbot v∞ — Pushing multi-agent collaboration to the limit
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
