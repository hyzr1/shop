'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

const links = [
  { href: '#templates', label: 'Templates' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#customers', label: 'Customers' },
]

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`lp-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="lp-nav-inner">
        <Link href="/" aria-label="Hyzr home" className="lp-nav-brand">
          <Logo size={18} />
        </Link>
        <nav className="lp-nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="lp-nav-link">{l.label}</a>
          ))}
        </nav>
        <div className="lp-nav-actions">
          <Link href="/auth/login" className="lp-nav-signin">Sign in</Link>
          <Link href="/auth/signup" className="lp-nav-cta">
            <span>Get started</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
