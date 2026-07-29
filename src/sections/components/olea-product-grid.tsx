'use client'
import type { Section } from '@/sections/types'

function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function BagIcon({ size = 16 }: { size?: number }) {
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
}

function Bottle({ tone, type, brand }: { tone: string; type: string; brand: string }) {
  // Different bottle shapes based on tone
  let bottleStyle: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    placeItems: 'end center',
    width: '31%',
    height: '52%',
    borderRadius: '7px 7px 18px 18px',
    background: 'rgba(252,250,244,.72)',
    border: '1px solid rgba(255,255,255,.6)',
    boxShadow: '0 28px 55px rgba(46,39,29,.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  }
  let topStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-13%',
    width: '48%',
    height: '14%',
    borderRadius: '4px 4px 0 0',
    background: '#d9cfbc',
  }

  if (tone === 'clear') {
    bottleStyle = { ...bottleStyle, borderRadius: '5px 5px 13px 13px', background: 'rgba(240,243,230,.55)' }
  } else if (tone === 'amber') {
    bottleStyle = {
      ...bottleStyle,
      width: '43%',
      height: '31%',
      borderRadius: '12px',
      background: 'rgba(105,62,34,.7)',
    }
    topStyle = {
      ...topStyle,
      top: '-18%',
      width: '100%',
      height: '20%',
      borderRadius: '7px',
      background: '#e5d9c8',
    }
  } else if (tone === 'ivory') {
    bottleStyle = {
      ...bottleStyle,
      width: '27%',
      height: '57%',
      borderRadius: '4px 4px 15px 15px',
      background: '#eee4d6',
    }
  }

  return (
    <div className="olea-bottle" style={bottleStyle}>
      <i style={topStyle} />
      <span
        style={{
          marginBottom: '22%',
          font: '600 16px var(--olea-serif, "Cormorant Garamond", serif)',
          letterSpacing: '0.12em',
          textAlign: 'center',
          color: tone === 'amber' ? '#f4ead8' : '#1c2019',
        }}
      >
        {brand}
        <small
          style={{
            display: 'block',
            marginTop: '5px',
            font: '6px var(--olea-sans, Manrope, sans-serif)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {type}
        </small>
      </span>
    </div>
  )
}

export function OleaProductGridSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow as string) ?? 'The essentials'
  const heading = (s.heading as string) ?? 'A ritual for every day.'
  const linkLabel = (s.link_label as string) ?? 'Shop all formulas'
  const linkUrl = (s.link_url as string) ?? '#ritual'
  const bg = (s.background_color as string) ?? '#f4efe5'
  const brandLabel = (s.brand_label as string) ?? 'OLÉA'

  const cards = section.blocks.filter((b) => b.type === 'product-card')

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-product-grid"
      className="olea-shop-root"
      style={{
        padding: '125px 4vw',
        background: bg,
        color: '#1c2019',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div
        className="olea-section-head"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: '4vw',
        }}
      >
        <div>
          {eyebrow && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#6e745f',
                fontSize: '9px',
                fontWeight: 650,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2
              style={{
                margin: '14px 0 0',
                fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
                fontWeight: 500,
                letterSpacing: '-0.05em',
                fontSize: 'clamp(48px, 5vw, 76px)',
                lineHeight: 0.95,
              }}
            >
              {heading}
            </h2>
          )}
        </div>
        {linkLabel && (
          <a
            href={linkUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              paddingBottom: '6px',
              borderBottom: '1px solid #858276',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {linkLabel} <ArrowRight size={15} />
          </a>
        )}
      </div>

      <div
        className="olea-products"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(cards.length, 1)}, 1fr)`,
          gap: '17px',
          marginTop: '58px',
        }}
      >
        {cards.map((b, idx) => {
          const name = (b.settings.name as string) ?? 'Product'
          const type = (b.settings.type as string) ?? ''
          const price = (b.settings.price as string) ?? ''
          const tone = (b.settings.tone as string) ?? 'clear'
          const num = String(idx + 1).padStart(2, '0')
          return (
            <article key={b.id}>
              <div
                className="olea-product-art"
                style={{
                  position: 'relative',
                  display: 'grid',
                  placeItems: 'center',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  background: TONE_BG[tone] ?? TONE_BG.clear,
                  transition: 'transform .45s cubic-bezier(.16,1,.3,1)',
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
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '18px',
                    color: 'rgba(28,32,25,.55)',
                    fontSize: '9px',
                  }}
                >
                  {num}
                </span>
                <Bottle tone={tone} type={type} brand={brandLabel} />
                <button
                  type="button"
                  aria-label={`Add ${name} to bag`}
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
                  <BagIcon size={16} />
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '17px',
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      font: '500 20px var(--olea-serif, "Cormorant Garamond", serif)',
                    }}
                  >
                    {name}
                  </h3>
                  {type && (
                    <p
                      style={{
                        margin: '5px 0 0',
                        color: '#7b7a72',
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {type}
                    </p>
                  )}
                </div>
                {price && <span style={{ fontSize: '11px' }}>{price}</span>}
              </div>
            </article>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 90px 5vw !important; }
          [data-section-id="${section.id}"] .olea-section-head { align-items: start !important; flex-direction: column !important; }
          [data-section-id="${section.id}"] .olea-section-head h2 { font-size: 47px !important; }
          [data-section-id="${section.id}"] .olea-products { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .olea-product-art { aspect-ratio: 5/6; }
        }
      `}</style>
    </section>
  )
}
