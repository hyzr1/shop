'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Magnetic } from './magnetic'

const links = [
  { href: '/preview/aurora', label: 'Home' },
  { href: '/preview/aurora/products', label: 'Shop' },
  { href: '/preview/aurora/faq', label: 'FAQ' },
  { href: '/preview/aurora/contact', label: 'Contact' },
]

export function AuroraNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`a-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="a-nav-wrap">
        <div className="a-nav-inner">
          <Link href="/preview/aurora" className="a-brand">
            <span className="a-brand-mark">A</span> Aurora
          </Link>
          <nav className="a-nav-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="a-nav-link">{l.label}</Link>
            ))}
          </nav>
          <div className="a-nav-actions">
            <Magnetic strength={0.25}>
              <button className="a-nav-cart" aria-label="Cart">
                <ShoppingBag size={17} strokeWidth={1.6} />
                <span>2</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </header>
  )
}
