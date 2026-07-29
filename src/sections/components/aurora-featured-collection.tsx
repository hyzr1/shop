'use client'
import type { Section } from '@/sections/types'
import { getToneGradient } from './aurora-hero'

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function PlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function AuroraFeaturedCollectionSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow_text as string) ?? 'Featured'
  const headingLine1 = (s.heading_line1 as string) ?? 'Pieces worth'
  const headingItalic = (s.heading_italic as string) ?? 'keeping'
  const headingAfter = (s.heading_after as string) ?? '.'
  const lede = (s.lede as string) ?? 'A tightly edited selection — each piece designed to earn its place in your wardrobe.'
  const ctaLabel = (s.cta_label as string) ?? 'View all products'
  const ctaUrl = (s.cta_url as string) ?? '#'
  const cols = Math.max(2, Math.min(4, Number(s.columns ?? 3)))

  const items = section.blocks.filter((b) => b.type === 'product-card')

  // Aurora palette
  const bg = '#f6f4ee'
  const ink = '#0a0a09'
  const inkSoft = '#2a2826'
  const mute = '#6b665c'
  const mute2 = '#9c968b'
  const hair = '#e4dfd2'
  const hairStrong = '#c9c2b0'
  const accent = '#7c5cff'

  return (
    <section
      data-section-id={section.id}
      data-section-type="aurora-featured-collection"
      className="au-coll-root"
      style={{
        padding: 'clamp(80px, 11vw, 168px) 0',
        background: bg,
        color: ink,
        fontFamily: 'var(--au-sans, Inter, system-ui, sans-serif)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
        }}
      >
        <div
          className="au-head"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {eyebrow && (
            <span
              style={{
                fontFamily: 'var(--au-mono, "Geist Mono", ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: mute,
                marginBottom: '22px',
              }}
            >
              {eyebrow}
            </span>
          )}
          <h2
            className="au-h2"
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: 'clamp(34px, 5.5vw, 76px)',
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
            }}
          >
            {headingLine1}{' '}
            {headingItalic && (
              <em
                style={{
                  fontFamily: 'var(--au-display, "Instrument Serif", "Times New Roman", serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: accent,
                }}
              >
                {headingItalic}
              </em>
            )}
            {headingAfter}
          </h2>
          {lede && (
            <p
              style={{
                maxWidth: '520px',
                marginTop: '22px',
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.6,
                color: mute,
              }}
            >
              {lede}
            </p>
          )}
        </div>

        <div
          className="au-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 'clamp(16px, 2vw, 28px)',
          }}
        >
          {items.map((b) => {
            const name = (b.settings.name as string) ?? 'Product'
            const category = (b.settings.category as string) ?? ''
            const price = (b.settings.price as string) ?? ''
            const wasPrice = (b.settings.was_price as string) ?? ''
            const tone = (b.settings.tone as string) ?? 'warm'
            const tag = (b.settings.tag as string) ?? ''

            return (
              <a
                key={b.id}
                href="#"
                className="au-card"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  className="au-card-media"
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: `1px solid ${hair}`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: getToneGradient(tone),
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      isolation: 'isolate',
                    }}
                    className="au-card-media-inner"
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background:
                          'radial-gradient(130% 70% at 22% 8%, rgba(255,255,255,0.55), transparent 46%), radial-gradient(120% 100% at 85% 105%, rgba(10,10,9,0.22), transparent 55%)',
                        mixBlendMode: 'soft-light',
                      }}
                    />
                  </div>
                  {tag && (
                    <span
                      className="au-card-fly"
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '12px',
                        padding: '5px 11px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        color: ink,
                      }}
                    >
                      {tag}
                    </span>
                  )}
                  <span
                    className="au-card-add"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      bottom: '12px',
                      width: '38px',
                      height: '38px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '50%',
                      background: ink,
                      color: '#fff',
                      opacity: 0,
                      transform: 'translateY(8px)',
                      transition: 'opacity 0.35s, transform 0.35s',
                    }}
                  >
                    <PlusIcon size={18} />
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginTop: '16px',
                    gap: '12px',
                  }}
                >
                  <div>
                    {category && (
                      <div
                        style={{
                          fontFamily: 'var(--au-mono, "Geist Mono", ui-monospace, monospace)',
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: mute,
                          marginBottom: '6px',
                        }}
                      >
                        {category}
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: 'var(--au-display, "Instrument Serif", "Times New Roman", serif)',
                        fontSize: '20px',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                        color: inkSoft,
                      }}
                    >
                      {name}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    {wasPrice && (
                      <span
                        style={{
                          fontSize: '12px',
                          color: mute2,
                          textDecoration: 'line-through',
                        }}
                      >
                        {wasPrice}
                      </span>
                    )}
                    <span style={{ fontWeight: 600, fontSize: '15px' }}>{price}</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {ctaLabel && (
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <a
              href={ctaUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 32px',
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.6)',
                color: ink,
                border: `1px solid ${hairStrong}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                textDecoration: 'none',
              }}
            >
              {ctaLabel} <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </div>

      <style>{`
        [data-section-id="${section.id}"] .au-card:hover .au-card-media-inner { transform: scale(1.05); }
        [data-section-id="${section.id}"] .au-card:hover .au-card-add { opacity: 1 !important; transform: translateY(0) !important; }
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .au-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          [data-section-id="${section.id}"] .au-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
