import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './arbor.css'

const sans = Geist({ subsets: ['latin'], variable: '--arbor-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--arbor-mono' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--arbor-serif',
})

export const metadata: Metadata = {
  title: 'Arbor - Distributed intelligence',
  description: 'A cinematic AI infrastructure template by Hyzr.',
}

export default function ArborLayout({ children }: { children: React.ReactNode }) {
  return <div className={`arbor-root ${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</div>
}
