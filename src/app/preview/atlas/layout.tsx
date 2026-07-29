import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './atlas.css'

const sans = Geist({ subsets: ['latin'], variable: '--atlas-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--atlas-mono' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--atlas-serif' })

export const metadata: Metadata = {
  title: 'Atlas - Architecture studio',
  description: 'A cinematic architecture portfolio template by Hyzr.',
}

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return <div className={`atlas-root ${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</div>
}
