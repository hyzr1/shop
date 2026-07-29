import type { Metadata } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import './aurora.css'
import { SmoothScroll } from '@/components/templates/aurora/smooth-scroll'
import { AuroraNav } from '@/components/templates/aurora/nav'
import { AuroraFooter } from '@/components/templates/aurora/footer'

const sans = Geist({ subsets: ['latin'], variable: '--a-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--a-mono' })
const display = Fraunces({ subsets: ['latin'], style: ['italic', 'normal'], variable: '--a-display' })

export const metadata: Metadata = {
  title: 'Aurora — Editorial storefront',
  description: 'A considered, editorial storefront template by Hyzr.',
}

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`aurora-root ${sans.variable} ${mono.variable} ${display.variable}`}>
      <div className="aurora-grain" aria-hidden />
      <SmoothScroll />
      <AuroraNav />
      <main>{children}</main>
      <AuroraFooter />
    </div>
  )
}
