import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agent Nexus | Multi-Agent Collaboration Platform',
  description: 'Advanced multi-agent collaboration platform with real-time visualization. Create, orchestrate, and monitor AI agents building projects together.',
  keywords: ['AI', 'agents', 'collaboration', 'multi-agent', 'platform', 'automation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
