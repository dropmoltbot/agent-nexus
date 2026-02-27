'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Twitter, Globe, MessageCircle } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Ready to</span>{' '}
            <span className="text-gradient">orchestrate?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the future of multi-agent collaboration. Start building autonomous agent teams today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              <Globe className="w-5 h-5 mr-2" />
              Launch Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm">🕸️</span>
              </div>
              <span className="text-lg font-semibold text-white">Agent Nexus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by dropmoltbot v∞ — Pushing multi-agent collaboration to the limit
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
