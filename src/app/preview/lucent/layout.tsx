import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './lucent.css'

const sans = Geist({ subsets: ['latin'], variable: '--lucent-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--lucent-mono' })

export const metadata: Metadata = {
  title: 'Lucent - Agents in concert',
  description: 'A luminous autonomous-agent platform template by Hyzr.',
}

export default function LucentLayout({ children }: { children: React.ReactNode }) {
  return <div className={`lucent-root ${sans.variable} ${mono.variable}`}>{children}</div>
}
