import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './pulse.css'
import { SmoothScroll } from '@/components/templates/aurora/smooth-scroll'
import { PulseNav } from '@/components/templates/pulse/nav'
import { PulseFooter } from '@/components/templates/pulse/footer'

const sans = Geist({ subsets: ['latin'], variable: '--p-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--p-mono' })

export const metadata: Metadata = {
  title: 'Pulse — Ship faster than ever',
  description: 'The all-in-one platform for modern teams. A Hyzr template.',
}

export default function PulseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pulse-root ${sans.variable} ${mono.variable}`}>
      <SmoothScroll />
      <PulseNav />
      <main>{children}</main>
      <PulseFooter />
    </div>
  )
}
