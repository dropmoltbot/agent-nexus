'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Agent Nexus transformed how we build AI products. We went from 3 engineers managing bots to 50+ autonomous agents handling customer support, coding, and research simultaneously.",
    author: "Sarah Chen",
    role: "CTO at TechFlow",
    avatar: "SC",
  },
  {
    quote: "The real-time visualization is game-changing. Watching agents collaborate on complex tasks feels like witnessing a new form of intelligence emerge.",
    author: "Marcus Webb",
    role: "Founder, AI Ventures",
    avatar: "MW",
  },
  {
    quote: "We deployed 12 specialized agents in 2 days. The orchestration layer handles communication, conflict resolution, and task allocation automatically.",
    author: "Elena Rodriguez",
    role: "Head of Automation, DataCorp",
    avatar: "ER",
  },
]

const clients = [
  { name: 'TechFlow', logo: 'TF' },
  { name: 'AI Ventures', logo: 'AV' },
  { name: 'DataCorp', logo: 'DC' },
  { name: 'Neural Labs', logo: 'NL' },
  { name: 'Quantum AI', logo: 'QA' },
  { name: 'Synapse', logo: 'SY' },
]

export default function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-cyan-500/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Trusted by</span>{' '}
            <span className="text-gradient">innovators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what industry leaders are building with Agent Nexus.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-12 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`col-span-12 ${index === 1 ? 'md:col-span-8 md:col-start-3' : 'md:col-span-6 lg:col-span-4'}`}
            >
              <div className="bento-item h-full">
                <Quote className="w-8 h-8 text-violet-500/50 mb-4" />
                <p className="text-lg text-white mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">Powering teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl md:text-2xl font-bold text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                {client.logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
