import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './olea.css'

const sans = Manrope({ subsets: ['latin'], variable: '--olea-sans' })
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--olea-serif',
})

export const metadata: Metadata = {
  title: 'Olea - Botanical skin rituals',
  description: 'An editorial botanical skincare commerce template by Hyzr.',
}

export default function OleaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`olea-root ${sans.variable} ${serif.variable}`}>{children}</div>
}
