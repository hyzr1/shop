import type { Metadata } from 'next'
import { Landing } from '@/components/marketing/landing'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Hyzr — Any brand. Any field. One platform.',
  description:
    'Hyzr builds, hosts, and grows your website on hyzr.ai. Describe your brand and start from a beautiful, fully-customizable template — for any field. Free for 30 days, then $20/month.',
  keywords: ['website builder', 'AI website', 'hyzr', 'no-code', 'templates', 'hosting', 'ecommerce', 'portfolio', 'landing page'],
  openGraph: {
    title: 'Hyzr — Any brand. Any field. One platform.',
    description: 'Build, host, and grow your site on hyzr.ai. Beautiful templates for every field, fully customizable. Free for 30 days.',
    url: 'https://hyzr.ai',
    siteName: 'Hyzr',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyzr — Any brand. Any field. One platform.',
    description: 'Build, host, and grow your site on hyzr.ai. Beautiful templates for every field, fully customizable.',
  },
  alternates: { canonical: 'https://hyzr.ai' },
}

export default function Home() {
  return <Landing />
}
