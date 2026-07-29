'use client'
import { useState } from 'react'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MoveDiagonalIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 5 19 5 19 11" />
      <polyline points="11 19 5 19 5 13" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

const ALL_TONES = ['#5f3f31', '#786451', '#332d28', '#a65e40']

export function AtlasSearchSection({ section }: { section: Section }) {
  const s = section.settings
  const placeholder = (s.placeholder as string) ?? 'Search the index…'
  const initialQuery = (s.initial_query as string) ?? 'mesa'
  const popularRaw = (s.popular_searches as string) ?? 'mesa · courtyard · low archive · plate'
  const emptyHeading = (s.empty_heading as string) ?? '/ Nothing indexed.'
  const emptyBody = (s.empty_body as string) ?? 'Try another keyword. The index is filed by site, season, and material.'
  const columnsRaw = (s.columns as number | string) ?? 3
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const bg = (s.background_color as string) ?? '#211b17'

  const paper = '#e8dfd2'
  const mute = 'rgba(232,223,210,.54)'
  const line = 'rgba(232,223,210,.18)'
  const rust = '#a65e40'

  const { collection } = usePageContext()
  const [query, setQuery] = useState(initialQuery)

  const products = collection?.products ?? []
  const hasQuery = query.trim().length > 0
  const popularList = popularRaw.split('·').map((p) => p.trim()).filter(Boolean)

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-search"
      style={{
        background: bg,
        color: paper,
        padding: '90px 5vw 130px',
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          maxWidth: '880px',
          margin: '0 auto',
          paddingBottom: '18px',
          borderBottom: `1px solid ${paper}`,
        }}
      >
        <div style={{ color: rust }}>
          <SearchIcon size={20} />
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
            padding: '14px 0',
            fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)',
            color: paper,
            letterSpacing: '-0.02em',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: mute,
          }}
        >
          ↵
        </span>
      </form>

      {popularList.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center"
          style={{
            gap: '24px',
            marginTop: '28px',
            paddingBottom: '40px',
            borderBottom: `1px solid ${line}`,
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: rust }}>Recent queries</span>
          {popularList.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setQuery(p)}
              style={{
                background: 'transparent',
                border: 0,
                padding: '4px 0',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                color: query === p ? paper : mute,
                borderBottom: query === p ? `1px solid ${paper}` : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {hasQuery && products.length > 0 ? (
        <div style={{ marginTop: '50px' }}>
          <p
            style={{
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '10px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: mute,
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            {String(products.length).padStart(2, '0')} indexed for
            {' '}
            <em
              style={{
                color: paper,
                fontStyle: 'italic',
                fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                fontSize: '16px',
                textTransform: 'none',
                letterSpacing: 'normal',
              }}
            >
              “{query}”
            </em>
          </p>
          <div
            className="at-search-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: '18px',
            }}
          >
            {products.map((p, idx) => {
              const toneColor = ALL_TONES[idx % ALL_TONES.length]
              return (
                <a
                  key={p.id}
                  href={`/products/${p.handle}`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: `1px solid ${line}`,
                    paddingBottom: '22px',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4 / 3',
                      overflow: 'hidden',
                      background: toneColor,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '18%',
                        border: `1px solid rgba(232,223,210,.38)`,
                        transform: 'rotate(8deg)',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '18px',
                        left: '18px',
                        fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        color: paper,
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div style={{ color: paper, opacity: 0.6 }}>
                      <MoveDiagonalIcon size={18} />
                    </div>
                  </div>
                  <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                        fontWeight: 400,
                        fontSize: '22px',
                        letterSpacing: '-0.025em',
                        color: paper,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        color: mute,
                        textTransform: 'uppercase',
                      }}
                    >
                      ${p.price.toFixed(0)}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '70px',
            padding: '90px 30px',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: `1px solid ${line}`,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 3.5vw, 56px)',
              letterSpacing: '-0.04em',
              color: paper,
            }}
          >
            {emptyHeading}
          </p>
          <p style={{ margin: '16px 0 0', color: mute, fontSize: '13px', lineHeight: 1.7 }}>{emptyBody}</p>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .at-search-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .at-search-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] { padding: 60px 5vw 90px !important; }
        }
      `}</style>
    </section>
  )
}
