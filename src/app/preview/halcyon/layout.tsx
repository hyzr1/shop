import type { Metadata } from 'next'
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google'
import './halcyon.css'

const sans = Geist({ subsets: ['latin'], variable: '--halcyon-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--halcyon-mono' })
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], variable: '--halcyon-serif' })

export const metadata: Metadata = {
  title: 'Halcyon - Coastal retreat',
  description: 'A remote retreat and hospitality template by Hyzr.',
}

export default function HalcyonLayout({ children }: { children: React.ReactNode }) {
  return <div className={`halcyon-root ${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</div>
}
