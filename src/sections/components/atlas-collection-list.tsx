'use client'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'
import { getCollections, type StubCollection } from '@/lib/stub-commerce'

const TONE_BG: Record<string, string> = {
  rust: '#5f3f31',
  tan: '#786451',
  stone: '#332d28',
  walnut: '#3e2a21',
}

const ALL_TONES = ['rust', 'tan', 'stone', 'walnut']

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function AtlasCollectionListSection({ section }: { section: Section }) {
  const s = section.settings
  const numberedLabel = (s.numbered_label as string) ?? '06 / Sets'
  const headingLine1 = (s.heading_line1 as string) ?? 'Every site,'
  const headingLine2 = (s.heading_line2 as string) ?? 'every study.'
  const lede = (s.lede as string) ??
    'The working directory of our collections — residential, cultural, hospitality, and furniture.'
  const cardStyle = (s.card_style as string) ?? 'tone'
  const columnsRaw = (s.columns as number | string) ?? 3
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const bg = (s.background_color as string) ?? '#211b17'

  const paper = '#e8dfd2'
  const mute = 'rgba(232,223,210,.54)'
  const line = 'rgba(232,223,210,.18)'
  const rust = '#a65e40'

  const ctx = usePageContext()
  const collections: StubCollection[] = ctx.collection ? [ctx.collection] : getCollections()

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-collection-list"
      style={{
        padding: 'clamp(90px, 10vw, 140px) 5vw',
        background: bg,
        color: paper,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div
        className="at-cl-head"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.75fr 1.5fr',
          gap: '5vw',
          alignItems: 'end',
        }}
      >
        <div>
          {numberedLabel && (
            <span
              style={{
                display: 'block',
                color: 'rgba(232,223,210,.66)',
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
              }}
            >
              {numberedLabel}
            </span>
          )}
          {lede && (
            <p
              style={{
                margin: '28px 0 0',
                maxWidth: '34ch',
                color: mute,
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '11px',
                lineHeight: 1.7,
                letterSpacing: '0.02em',
              }}
            >
              {lede}
            </p>
          )}
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
            fontWeight: 400,
            letterSpacing: '-0.045em',
            fontSize: 'clamp(52px, 5.5vw, 92px)',
            lineHeight: 0.9,
            color: paper,
          }}
        >
          {headingLine1}
          {headingLine2 && (
            <>
              <br />
              {headingLine2}
            </>
          )}
        </h2>
      </div>

      <div
        className="at-cl-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '18px',
          marginTop: 'clamp(60px, 7vw, 96px)',
          borderTop: `1px solid ${line}`,
          paddingTop: '40px',
        }}
      >
        {collections.map((c, idx) => {
          const tone = ALL_TONES[idx % ALL_TONES.length]
          const toneColor = TONE_BG[tone]
          const num = String(idx + 1).padStart(2, '0')
          const productCount = c.products.length
          return (
            <article
              key={c.id}
              className="at-cl-card"
              style={{
                borderBottom: `1px solid ${line}`,
                paddingBottom: '28px',
              }}
            >
              <a
                href={`/collections/${c.handle}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    background: cardStyle === 'photo' && c.image ? '#1f1a16' : toneColor,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {cardStyle === 'photo' && c.image ? (
                    <img
                      src={c.image}
                      alt={c.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '18%',
                        border: '1px solid rgba(232,223,210,.38)',
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
                    {num}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '18px',
                      right: '18px',
                      fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                      fontSize: '9px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(232,223,210,.72)',
                    }}
                  >
                    {productCount} object{productCount === 1 ? '' : 's'}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginTop: '20px',
                    gap: '14px',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                      fontWeight: 400,
                      fontSize: '28px',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: paper,
                    }}
                  >
                    {c.title}
                  </h3>
                  <small
                    style={{
                      color: mute,
                      fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Set / {num}
                  </small>
                </div>
                {c.description && (
                  <p
                    style={{
                      margin: '12px 0 0',
                      maxWidth: '32ch',
                      color: mute,
                      fontSize: '12px',
                      lineHeight: 1.65,
                    }}
                  >
                    {c.description}
                  </p>
                )}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '22px',
                    paddingBottom: '4px',
                    borderBottom: `1px solid ${rust}`,
                    color: rust,
                    fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  View set <ArrowRight size={12} />
                </span>
              </a>
            </article>
          )
        })}
      </div>

      {collections.length === 0 && (
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
          [data-section-id="${section.id}"] .at-cl-head { grid-template-columns: 1fr !important; gap: 28px !important; }
          [data-section-id="${section.id}"] .at-cl-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .at-cl-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] h2 { font-size: 48px !important; }
        }
      `}</style>
    </section>
  )
}
