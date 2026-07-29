'use client'
import type { Section } from '@/sections/types'
import Link from 'next/link'

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function BagIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MenuIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function OleaHeaderSection({ section }: { section: Section }) {
  const s = section.settings
  const brandText = (s.brand_text as string) ?? 'OLÉA'
  const brandSubtitle = (s.brand_subtitle as string) ?? 'Botanical skin laboratory'
  const eyebrowText = (s.eyebrow_text as string) ?? 'Daily rituals / Made in small batches'
  const ctaLabel = (s.cta_label as string) ?? 'Find your ritual'
  const ctaLink = (s.cta_link as string) ?? '#ritual'
  const showSearch = s.show_search !== false
  const showBag = s.show_bag !== false
  const bagCount = (s.bag_count as number) ?? 0

  const menuLinks = section.blocks.filter((b) => b.type === 'menu-link')

  const bg = (s.background_color as string) ?? 'rgba(244,239,229,.94)'
  const textColor = (s.text_color as string) ?? '#1c2019'
  const line = 'rgba(28,32,25,.18)'

  return (
    <header
      data-section-id={section.id}
      data-section-type="olea-header"
      style={{
        position: 'relative',
        zIndex: 4,
        display: 'grid',
        gridTemplateColumns: 'minmax(190px, .45fr) minmax(390px, 1fr) auto',
        alignItems: 'stretch',
        minHeight: '94px',
        borderBottom: `1px solid ${line}`,
        background: bg,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        color: textColor,
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <Link
        href="/"
        className="ol-brand-root"
        style={{
          display: 'grid',
          alignContent: 'center',
          gap: '4px',
          paddingLeft: '3.2vw',
          borderRight: `1px solid ${line}`,
          fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
          fontSize: '34px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: textColor,
          textDecoration: 'none',
        }}
      >
        {brandText}
        {brandSubtitle && (
          <small style={{ fontFamily: 'var(--olea-sans, Manrope, sans-serif)', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7c7b70', fontWeight: 400 }}>
            {brandSubtitle}
          </small>
        )}
      </Link>

      <div
        className="ol-nav-menu-root"
        style={{
          display: 'grid',
          alignContent: 'center',
          gap: '13px',
          padding: '0 3vw',
        }}
      >
        {eyebrowText && (
          <span style={{ color: '#7b7a70', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {eyebrowText}
          </span>
        )}
        <nav style={{ display: 'flex', gap: 'clamp(18px, 3vw, 44px)', fontSize: '12px' }}>
          {menuLinks.map((b) => (
            <a
              key={b.id}
              href={(b.settings.url as string) ?? '#'}
              style={{ color: 'inherit', textDecoration: 'none', position: 'relative', width: 'max-content', paddingBottom: '4px' }}
            >
              {(b.settings.label as string) ?? 'Link'}
            </a>
          ))}
        </nav>
      </div>

      <div
        className="ol-nav-tools-root"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          borderLeft: `1px solid ${line}`,
        }}
      >
        {showSearch && (
          <button
            type="button"
            aria-label="Search"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: '66px',
              border: 0,
              borderRight: `1px solid ${line}`,
              background: 'none',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            <SearchIcon size={18} />
          </button>
        )}
        {showBag && (
          <a
            href="#shop"
            aria-label="Shopping bag"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 20px',
              borderRight: `1px solid ${line}`,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <BagIcon size={17} /> Bag
            <b
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '1px solid #9b947f',
                background: '#e4dbca',
                color: '#252b20',
                fontSize: '8px',
                fontWeight: 400,
              }}
            >
              {bagCount}
            </b>
          </a>
        )}
        {ctaLabel && (
          <a
            href={ctaLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 26px',
              borderLeft: `1px solid ${line}`,
              background: '#ded4c2',
              color: '#252b20',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {ctaLabel} <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      {/* Mobile menu button (hidden by default; CSS hides desktop bits on small) */}
      <button
        className="ol-menu-btn-root"
        type="button"
        aria-label="Open menu"
        style={{
          display: 'none',
          border: 0,
          background: 'none',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        <MenuIcon size={19} />
      </button>

      <style>{`
        [data-section-id="${section.id}"] .ol-brand-root::after { content: none; }
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr auto !important; min-height: 76px !important; }
          [data-section-id="${section.id}"] .ol-brand-root { padding-left: 5vw !important; border-right: 0 !important; font-size: 30px !important; }
          [data-section-id="${section.id}"] .ol-nav-menu-root,
          [data-section-id="${section.id}"] .ol-nav-tools-root { display: none !important; }
          [data-section-id="${section.id}"] .ol-menu-btn-root { display: grid !important; place-items: center; width: 68px; border-left: 1px solid ${line}; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { min-height: 66px !important; }
          [data-section-id="${section.id}"] .ol-brand-root { padding-left: 5vw !important; font-size: 27px !important; }
          [data-section-id="${section.id}"] .ol-brand-root small { display: none !important; }
        }
      `}</style>
    </header>
  )
}
