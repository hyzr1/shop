'use client'

import { useEffect, useState } from 'react'
import { Magnetic } from '@/components/templates/aurora/magnetic'
import { Zap } from 'lucide-react'

export function PulseNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`p-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="p-nav-inner">
        <a href="#" className="p-brand"><span className="p-brand-mark"><Zap size={16} fill="currentColor" /></span> Pulse</a>
        <nav className="p-nav-links">
          {['Product', 'Features', 'Pricing', 'Customers', 'Docs'].map((l) => (
            <a key={l} href="#" className="p-nav-link">{l}</a>
          ))}
        </nav>
        <div className="p-nav-actions">
          <a href="#" className="p-btn p-btn-ghost" style={{ height: 40 }} data-cursor>Sign in</a>
          <Magnetic strength={0.2}><a href="#" className="p-btn p-btn-primary" style={{ height: 40 }} data-cursor>Get started</a></Magnetic>
        </div>
      </div>
    </header>
  )
}
