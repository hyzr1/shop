import type { Metadata } from 'next'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/templates/aurora/smooth-scroll'
import './forge.css'

const sans = Geist({ subsets: ['latin'], variable: '--f-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--f-mono' })
const display = Fraunces({ subsets: ['latin'], style: ['italic', 'normal'], variable: '--f-display' })

export const metadata: Metadata = {
  title: 'Forge - Project-led digital academy',
  description: 'A bold cohort-course website template by Hyzr.',
}

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`forge-root ${sans.variable} ${mono.variable} ${display.variable}`}>
      <div className="f-grain" aria-hidden />
      <SmoothScroll />
      {children}
    </div>
  )
}
