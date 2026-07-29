'use client'
import type { Section } from '@/sections/types'
import { Search, ShoppingBag } from 'lucide-react'
import { PulseIcon } from './pulse-icons'
import { getScheme } from '@/sections/lib/scheme'
import Link from 'next/link'

export function HeaderSection({ section }: { section: Section }) {
  const s = section.settings as Record<string, unknown>
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'

  const sticky = s.sticky !== false
  const logoUrl = (s.logo as { url?: string } | undefined)?.url
  const logoWidth = (s.logo_width as number) ?? 120
  const showSearch = s.show_search === true
  const showCart = s.show_cart === true
  const brandText = (s.brand_text as string) ?? 'Pulse'
  const brandIcon = (s.brand_icon as string) ?? 'zap'

  const menuLinks = section.blocks.filter((b) => b.type === 'menu-link')
  const actionButtons = section.blocks.filter((b) => b.type === 'action-button')

  // Hover background for nav links
  const navLinkHoverBg = isDark ? 'rgba(255,255,255,0.06)' : '#f7f8fa'
  const navLinkColor = isDark ? 'rgba(255,255,255,0.85)' : '#2b2b38'

  // Brand: small Pulse mark + text — matches `.p-brand` (18px, 700, -0.02em)
  const brand = (
    <Link
      href="/"
      className="inline-flex items-center"
      style={{ gap: '9px', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', color: c.text }}
    >
      {logoUrl ? (
        <img src={logoUrl} alt={brandText || ''} style={{ width: logoWidth }} />
      ) : (
        <>
          <span
            className="grid place-items-center"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
            }}
          >
            <PulseIcon name={brandIcon} size={16} fill="currentColor" />
          </span>
          {brandText && <span>{brandText}</span>}
        </>
      )}
    </Link>
  )

  return (
    <header
      data-section-id={section.id}
      data-section-type="header"
      className={sticky ? 'sticky top-0 z-50' : ''}
      style={{
        background: c.background,
        color: c.text,
        borderBottom: `1px solid ${c.hair}`,
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1200px',
          padding: '14px clamp(20px, 4vw, 48px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Brand (left column, naturally aligned left) */}
        <div className="flex items-center" style={{ justifyContent: 'flex-start' }}>
          {brand}
        </div>

        {/* Centered nav (middle column) */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: '4px', justifyContent: 'center' }}
        >
          {menuLinks.map((b) => (
            <a
              key={b.id}
              href={(b.settings.url as string) ?? '#'}
              className="transition-colors"
              style={{
                padding: '8px 14px',
                borderRadius: '9px',
                fontSize: '14px',
                fontWeight: 500,
                color: navLinkColor,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = navLinkHoverBg
                ;(e.currentTarget as HTMLElement).style.color = c.text
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = navLinkColor
              }}
            >
              {(b.settings.label as string) ?? 'Link'}
            </a>
          ))}
        </nav>

        {/* Right cluster: action buttons (preferred) OR fallback search/cart */}
        <div className="flex items-center" style={{ gap: '8px', justifyContent: 'flex-end' }}>
          {actionButtons.length > 0 ? (
            actionButtons.map((b) => {
              const label = (b.settings.label as string) ?? 'Button'
              const link = (b.settings.link as string) ?? '#'
              const style = (b.settings.style as string) ?? 'primary'
              const isPrimary = style === 'primary'
              // Primary button: SOLID DARK on both schemes (matches "Get started")
              // Ghost: scheme-aware ghost
              return (
                <a
                  key={b.id}
                  href={link}
                  className="inline-flex items-center font-semibold transition-all"
                  style={{
                    gap: '8px',
                    height: '38px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    background: isPrimary
                      ? '#0b0b12'
                      : (isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'),
                    color: isPrimary
                      ? '#ffffff'
                      : c.text,
                    border: isPrimary
                      ? '1px solid #0b0b12'
                      : `1px solid ${c.hair}`,
                    boxShadow: isPrimary
                      ? '0 1px 2px rgba(11,11,18,.18), inset 0 1px 0 rgba(255,255,255,.12)'
                      : 'none',
                  }}
                >
                  {label}
                </a>
              )
            })
          ) : (
            <>
              {showSearch && <Search className="h-5 w-5" aria-label="Search" />}
              {showCart && <ShoppingBag className="h-5 w-5" aria-label="Cart" />}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
