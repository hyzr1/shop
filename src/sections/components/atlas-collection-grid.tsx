'use client'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

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

export function AtlasCollectionGridSection({ section }: { section: Section }) {
  const s = section.settings
  const columnsRaw = (s.columns as number | string) ?? 3
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const cardStyle = (s.card_style as string) ?? 'tone'
  const showFilters = (s.show_filters as boolean) ?? true
  const bg = (s.background_color as string) ?? '#211b17'

  const paper = '#e8dfd2'
  const mute = 'rgba(232,223,210,.54)'
  const line = 'rgba(232,223,210,.18)'
  const rust = '#a65e40'

  const { collection } = usePageContext()
  if (!collection) return null

  const products = collection.products

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-collection-grid"
      style={{
        padding: '70px 5vw 130px',
        background: bg,
        color: paper,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      {showFilters && (
        <div
          className="at-cg-filters"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '14px 30px',
            paddingBottom: '24px',
            borderBottom: `1px solid ${line}`,
            marginBottom: '40px',
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: rust }}>Filter</span>
          {['All', 'Residential', 'Cultural', 'Hospitality', 'Furniture'].map((f, i) => (
            <button
              key={f}
              type="button"
              style={{
                background: 'transparent',
                border: 0,
                padding: '4px 0',
                fontFamily: 'inherit',
                fontSize: '10px',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                color: i === 0 ? paper : mute,
                borderBottom: i === 0 ? `1px solid ${paper}` : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', color: mute }}>{products.length} objects · indexed</span>
        </div>
      )}

      <div
        className="at-cg-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '18px',
        }}
      >
        {products.map((p, idx) => {
          const toneColor = ALL_TONES[idx % ALL_TONES.length]
          return (
            <article
              key={p.id}
              style={{ borderBottom: `1px solid ${line}` }}
            >
              <a
                href={`/products/${p.handle}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    background: cardStyle === 'photo' ? '#1f1a16' : toneColor,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {cardStyle === 'photo' && p.media[0] ? (
                    <img
                      src={p.media[0].url}
                      alt={p.media[0].alt}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '18%',
                        border: `1px solid rgba(232,223,210,.38)`,
                        transform: 'rotate(8deg)',
                      }}
                    />
                  )}
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
                <div className="flex justify-between" style={{ marginTop: '16px', gap: '14px', alignItems: 'baseline' }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                      fontWeight: 400,
                      fontSize: '26px',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      color: paper,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: mute,
                      fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    ${p.price.toFixed(0)}
                  </p>
                </div>
                <small
                  style={{
                    display: 'block',
                    margin: '14px 0 22px',
                    color: mute,
                    fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Object {String(idx + 1).padStart(2, '0')} / In stock · {p.variants.length} sizes
                </small>
              </a>
            </article>
          )
        })}
      </div>

      {products.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            padding: '70px 0',
            color: mute,
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          / The index is closed for cataloguing
        </p>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .at-cg-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .at-cg-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] { padding: 50px 5vw 90px !important; }
        }
      `}</style>
    </section>
  )
}
