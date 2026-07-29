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

const TONE_BG: Record<string, string> = {
  clear: 'linear-gradient(145deg,#d8d7c4,#f0eee3)',
  amber: 'linear-gradient(145deg,#9e7658,#d3b090)',
  ivory: 'linear-gradient(145deg,#e3d6c1,#f5eee4)',
  olive: 'linear-gradient(145deg,#9aa28a,#cdd2bd)',
}

const ALL_TONES = ['clear', 'amber', 'ivory', 'olive']

export function OleaSearchSection({ section }: { section: Section }) {
  const s = section.settings
  const placeholder = (s.placeholder as string) ?? 'Search the apothecary…'
  const initialQuery = (s.initial_query as string) ?? 'serum'
  const popularRaw = (s.popular_searches as string) ?? 'serum · barrier · veil · oil · tonic'
  const emptyHeading = (s.empty_heading as string) ?? 'The shelves are quiet.'
  const emptyBody = (s.empty_body as string) ?? 'Try a different word. We sort our formulas by ritual, not category.'
  const columnsRaw = (s.columns as number | string) ?? 3
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const bg = (s.background_color as string) ?? '#f4efe5'
  const italicColor = (s.italic_color as string) ?? '#695036'
  const line = 'rgba(28,32,25,.18)'
  const ink = '#1c2019'

  const { collection } = usePageContext()
  const [query, setQuery] = useState(initialQuery)

  const products = collection?.products ?? []
  const hasQuery = query.trim().length > 0
  const popularList = popularRaw.split('·').map((p) => p.trim()).filter(Boolean)

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-search"
      style={{
        background: bg,
        color: ink,
        padding: '80px 5.5vw 130px',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          maxWidth: '720px',
          margin: '0 auto',
          paddingBottom: '14px',
          borderBottom: `1px solid ${ink}`,
        }}
      >
        <div style={{ color: '#77776d' }}>
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
            padding: '14px 0',
            fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            color: italicColor,
            letterSpacing: '-0.02em',
          }}
        />
        <button
          type="submit"
          style={{
            background: 'transparent',
            border: 0,
            color: ink,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '8px 0',
          }}
        >
          Search →
        </button>
      </form>

      {popularList.length > 0 && (
        <div
          className="flex flex-wrap justify-center"
          style={{
            gap: '20px',
            marginTop: '28px',
            paddingBottom: '40px',
            borderBottom: `1px solid ${line}`,
          }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e745f', fontWeight: 650 }}>
            Often sought
          </span>
          {popularList.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setQuery(p)}
              style={{
                background: 'transparent',
                border: 0,
                padding: 0,
                fontSize: '11px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: query === p ? ink : '#77776d',
                borderBottom: query === p ? `1px solid ${ink}` : '1px solid transparent',
                paddingBottom: '3px',
                cursor: 'pointer',
                fontWeight: query === p ? 600 : 500,
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
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8b826f',
              marginBottom: '28px',
              textAlign: 'center',
            }}
          >
            {products.length} formula{products.length === 1 ? '' : 's'} match
            {' '}
            <em style={{ color: italicColor, fontStyle: 'italic', fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)', fontSize: '16px', textTransform: 'none', letterSpacing: 'normal' }}>
              “{query}”
            </em>
          </p>
          <div
            className="olea-search-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: '20px',
            }}
          >
            {products.map((p, idx) => {
              const tone = ALL_TONES[idx % ALL_TONES.length]
              return (
                <a
                  key={p.id}
                  href={`/products/${p.handle}`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    paddingBottom: '22px',
                    borderBottom: `1px solid ${line}`,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4 / 5',
                      overflow: 'hidden',
                      background: TONE_BG[tone],
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-13%',
                        width: '75%',
                        height: '75%',
                        border: '1px solid rgba(255,255,255,.5)',
                        borderRadius: '50%',
                      }}
                    />
                    <span
                      style={{
                        font: '500 28px var(--olea-serif, "Cormorant Garamond", serif)',
                        letterSpacing: '0.08em',
                        color: tone === 'amber' || tone === 'olive' ? '#f4ead8' : '#1c2019',
                      }}
                    >
                      OLÉA
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ marginTop: '17px', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        margin: 0,
                        font: '500 20px var(--olea-serif, "Cormorant Garamond", serif)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <span style={{ fontSize: '11px' }}>${p.price.toFixed(2)}</span>
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
            padding: '70px 30px',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: `1px solid ${line}`,
          }}
        >
          <p
            style={{
              margin: 0,
              font: 'italic 30px var(--olea-serif, "Cormorant Garamond", serif)',
              color: italicColor,
              letterSpacing: '-0.02em',
            }}
          >
            {emptyHeading}
          </p>
          <p style={{ margin: '14px 0 0', color: '#68675f', fontSize: '13px', lineHeight: 1.7 }}>{emptyBody}</p>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .olea-search-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .olea-search-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] { padding: 60px 5vw 90px !important; }
        }
      `}</style>
    </section>
  )
}
