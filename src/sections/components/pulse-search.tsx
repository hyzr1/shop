'use client'
import { useState } from 'react'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { containerMaxWidth } from '@/sections/lib/layout'
import { usePageContext } from '@/sections/wrappers/context'

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function PulseSearchSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'

  const placeholder = (s.placeholder as string) ?? 'Search products, collections, articles…'
  const initialQuery = (s.initial_query as string) ?? 'tee'
  const emptyHeading = (s.empty_heading as string) ?? 'No results yet'
  const emptyBody = (s.empty_body as string) ?? 'Try a different keyword or browse the latest drops.'
  const popularRaw = (s.popular_searches as string) ?? 'denim · tee · accessories · canvas · belt'
  const columnsRaw = (s.columns as number | string) ?? 4
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const maxW = containerMaxWidth(s.container_width)

  const { collection } = usePageContext()
  const [query, setQuery] = useState(initialQuery)

  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff'
  const accent = isDark ? '#a5b4fc' : '#6366f1'
  const accentSoft = isDark ? 'rgba(165,180,252,.18)' : '#eef0ff'

  const products = collection?.products ?? []
  const hasQuery = query.trim().length > 0
  const popularList = popularRaw.split('·').map((s) => s.trim()).filter(Boolean)

  return (
    <section
      data-section-id={section.id}
      data-section-type="pulse-search"
      style={{
        background: c.background,
        color: c.text,
        paddingTop: 'clamp(28px, 4vw, 56px)',
        paddingBottom: 'clamp(72px, 9vw, 130px)',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto flex items-center"
          style={{
            gap: '10px',
            maxWidth: '680px',
            padding: '8px',
            borderRadius: '16px',
            background: cardBg,
            border: `1px solid ${c.hair}`,
            boxShadow: '0 8px 28px -16px rgba(11,11,18,.16)',
          }}
        >
          <div style={{ color: c.mute, padding: '0 6px 0 12px' }}>
            <SearchIcon size={18} />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search"
            style={{
              flex: 1,
              border: 0,
              outline: 'none',
              background: 'transparent',
              padding: '12px 0',
              fontSize: '15.5px',
              color: c.text,
              letterSpacing: '-0.01em',
            }}
          />
          <button
            type="submit"
            style={{
              height: '44px',
              padding: '0 22px',
              borderRadius: '10px',
              background: isDark ? '#ffffff' : '#0b0b12',
              color: isDark ? '#0b0b12' : '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              border: 0,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>

        {popularList.length > 0 && (
          <div
            className="flex flex-wrap justify-center items-center"
            style={{ gap: '8px', marginTop: '18px' }}
          >
            <span style={{ fontSize: '12px', color: c.mute, fontWeight: 500 }}>Popular:</span>
            {popularList.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setQuery(p)}
                style={{
                  height: '28px',
                  padding: '0 12px',
                  borderRadius: '999px',
                  background: query === p ? accentSoft : 'transparent',
                  color: query === p ? accent : c.text,
                  fontSize: '12.5px',
                  fontWeight: 500,
                  border: `1px solid ${query === p ? accent : c.hair}`,
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {hasQuery && products.length > 0 ? (
          <div style={{ marginTop: 'clamp(36px, 5vw, 56px)' }}>
            <p
              style={{
                fontSize: '13.5px',
                color: c.mute,
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Showing <span style={{ color: c.text, fontWeight: 600 }}>{products.length}</span> result{products.length === 1 ? '' : 's'} for
              {' '}
              <span style={{ color: accent, fontWeight: 600 }}>“{query}”</span>
            </p>
            <div
              className="pulse-search-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: 'clamp(16px, 1.6vw, 22px)',
              }}
            >
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`/products/${p.handle}`}
                  className="pulse-search-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform .35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '4 / 5',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      background: cardBg,
                      border: `1px solid ${c.hair}`,
                    }}
                  >
                    { }
                    <img
                      src={p.media[0]?.url}
                      alt={p.media[0]?.alt ?? p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .55s' }}
                    />
                  </div>
                  <div className="flex items-start justify-between" style={{ gap: '10px', marginTop: '14px' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '15px',
                        fontWeight: 620,
                        letterSpacing: '-0.015em',
                        color: c.text,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span style={{ fontSize: '14.5px', fontWeight: 700, color: accent, whiteSpace: 'nowrap' }}>
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="text-center mx-auto"
            style={{
              marginTop: 'clamp(36px, 5vw, 64px)',
              padding: '64px 24px',
              maxWidth: '480px',
              borderRadius: '20px',
              border: `1px dashed ${c.hair}`,
            }}
          >
            <div
              className="inline-grid"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: accentSoft,
                color: accent,
                placeItems: 'center',
                marginBottom: '14px',
              }}
            >
              <SearchIcon size={22} />
            </div>
            <p style={{ fontSize: '17px', fontWeight: 680, color: c.text, margin: 0, letterSpacing: '-0.015em' }}>
              {emptyHeading}
            </p>
            <p style={{ fontSize: '14px', color: c.mute, margin: '8px 0 0', lineHeight: 1.55 }}>{emptyBody}</p>
          </div>
        )}
      </div>

      <style>{`
        [data-section-id="${section.id}"] .pulse-search-card:hover { transform: translateY(-4px); }
        [data-section-id="${section.id}"] .pulse-search-card:hover img { transform: scale(1.05); }
        @media (max-width: 1000px) {
          [data-section-id="${section.id}"] .pulse-search-grid { grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr) !important; }
        }
        @media (max-width: 720px) {
          [data-section-id="${section.id}"] .pulse-search-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
