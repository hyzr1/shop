'use client'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

function BagIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
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

function Bottle({ tone, brand }: { tone: string; brand: string }) {
  let bs: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    placeItems: 'end center',
    width: '32%',
    height: '52%',
    borderRadius: '7px 7px 18px 18px',
    background: 'rgba(252,250,244,.72)',
    border: '1px solid rgba(255,255,255,.6)',
    boxShadow: '0 28px 55px rgba(46,39,29,.2)',
    backdropFilter: 'blur(8px)',
  }
  let ts: React.CSSProperties = {
    position: 'absolute',
    top: '-13%',
    width: '48%',
    height: '14%',
    borderRadius: '4px 4px 0 0',
    background: '#d9cfbc',
  }
  if (tone === 'clear') bs = { ...bs, borderRadius: '5px 5px 13px 13px', background: 'rgba(240,243,230,.55)' }
  else if (tone === 'amber') {
    bs = { ...bs, width: '44%', height: '32%', borderRadius: '12px', background: 'rgba(105,62,34,.7)' }
    ts = { ...ts, top: '-18%', width: '100%', height: '20%', borderRadius: '7px', background: '#e5d9c8' }
  } else if (tone === 'ivory') bs = { ...bs, width: '28%', height: '57%', borderRadius: '4px 4px 15px 15px', background: '#eee4d6' }
  else if (tone === 'olive') bs = { ...bs, width: '33%', height: '54%', borderRadius: '5px 5px 14px 14px', background: 'rgba(88,98,74,.62)' }
  return (
    <div style={bs}>
      <i style={ts} />
      <span
        style={{
          marginBottom: '22%',
          font: '600 16px var(--olea-serif, "Cormorant Garamond", serif)',
          letterSpacing: '0.12em',
          textAlign: 'center',
          color: tone === 'amber' || tone === 'olive' ? '#f4ead8' : '#1c2019',
        }}
      >
        {brand}
      </span>
    </div>
  )
}

export function OleaCollectionGridSection({ section }: { section: Section }) {
  const s = section.settings
  const columnsRaw = (s.columns as number | string) ?? 3
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const cardStyle = (s.card_style as string) ?? 'tone'
  const showFilters = (s.show_filters as boolean) ?? true
  const brandLabel = (s.brand_label as string) ?? 'OLÉA'
  const bg = (s.background_color as string) ?? '#f4efe5'
  const line = 'rgba(28,32,25,.18)'
  const ink = '#1c2019'

  const { collection } = usePageContext()
  if (!collection) return null

  const products = collection.products

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-collection-grid"
      style={{
        padding: '70px 4vw 130px',
        background: bg,
        color: ink,
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      {showFilters && (
        <div
          className="olea-cg-filters"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '14px 28px',
            paddingBottom: '24px',
            borderBottom: `1px solid ${line}`,
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '9px',
              fontWeight: 650,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#6e745f',
            }}
          >
            Filter rituals
          </span>
          {['All formulas', 'Morning', 'Evening', 'Body', 'Travel'].map((f, i) => (
            <button
              key={f}
              type="button"
              style={{
                background: 'transparent',
                border: 0,
                padding: '4px 0',
                fontSize: '11px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: i === 0 ? ink : '#77776d',
                borderBottom: i === 0 ? `1px solid ${ink}` : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: i === 0 ? 600 : 500,
              }}
            >
              {f}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '10px', letterSpacing: '0.08em', color: '#77776d' }}>
            {products.length} formulas · sorted by ritual
          </span>
        </div>
      )}

      <div
        className="olea-cg-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '20px',
        }}
      >
        {products.map((p, idx) => {
          const tone = ALL_TONES[idx % ALL_TONES.length]
          const num = String(idx + 1).padStart(2, '0')
          return (
            <article
              key={p.id}
              style={{
                paddingBottom: '22px',
                borderBottom: `1px solid ${line}`,
              }}
            >
              <a
                href={`/products/${p.handle}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'grid',
                    placeItems: 'center',
                    aspectRatio: '4 / 5',
                    overflow: 'hidden',
                    background: cardStyle === 'photo' ? '#cbc3ad' : TONE_BG[tone],
                  }}
                >
                  {cardStyle === 'photo' && p.media[0] ? (
                    <img
                      src={p.media[0].url}
                      alt={p.media[0].alt}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <>
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
                      <Bottle tone={tone} brand={brandLabel} />
                    </>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '18px',
                      color: 'rgba(28,32,25,.55)',
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {num}
                  </span>
                  <button
                    type="button"
                    aria-label={`Add ${p.title} to bag`}
                    style={{
                      position: 'absolute',
                      right: '17px',
                      bottom: '17px',
                      display: 'grid',
                      placeItems: 'center',
                      width: '42px',
                      height: '42px',
                      border: 0,
                      borderRadius: '50%',
                      background: 'rgba(250,247,239,.9)',
                      color: '#34352e',
                      cursor: 'pointer',
                    }}
                  >
                    <BagIcon size={14} />
                  </button>
                </div>
                <div className="flex justify-between" style={{ marginTop: '17px', alignItems: 'baseline' }}>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        font: '500 22px var(--olea-serif, "Cormorant Garamond", serif)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        margin: '5px 0 0',
                        color: '#7b7a72',
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {p.variants.length} variant{p.variants.length === 1 ? '' : 's'}
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', color: ink }}>${p.price.toFixed(2)}</span>
                </div>
              </a>
            </article>
          )
        })}
      </div>

      {products.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#77776d',
            padding: '60px 0',
            font: 'italic 18px var(--olea-serif, "Cormorant Garamond", serif)',
          }}
        >
          The shelves are resting. Come back soon.
        </p>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .olea-cg-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .olea-cg-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] { padding: 50px 5vw 90px !important; }
        }
      `}</style>
    </section>
  )
}
