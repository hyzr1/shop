'use client'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'
import { getCollections, type StubCollection } from '@/lib/stub-commerce'

const TONE_BG: Record<string, string> = {
  clear: 'linear-gradient(145deg,#d8d7c4,#f0eee3)',
  amber: 'linear-gradient(145deg,#9e7658,#d3b090)',
  ivory: 'linear-gradient(145deg,#e3d6c1,#f5eee4)',
  olive: 'linear-gradient(145deg,#9aa28a,#cdd2bd)',
  slate: 'linear-gradient(145deg,#6d7472,#b6bcb6)',
}

const ALL_TONES = ['clear', 'amber', 'ivory', 'olive', 'slate']

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function OleaCollectionListSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow as string) ?? 'Library'
  const headingBefore = (s.heading_before as string) ?? 'Every'
  const headingItalic = (s.heading_italic as string) ?? 'collection'
  const headingAfter = (s.heading_after as string) ?? ''
  const lede = (s.lede as string) ??
    'Curated edits of formulas grown with intent — from morning serums to body oils.'
  const cardStyle = (s.card_style as string) ?? 'tone'
  const columnsRaw = (s.columns as number | string) ?? 3
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const bg = (s.background_color as string) ?? '#f4efe5'
  const italicColor = (s.italic_color as string) ?? '#695036'

  const ink = '#1c2019'
  const olive = '#58624a'
  const line = 'rgba(28,32,25,.18)'
  const mute = '#77776d'

  const ctx = usePageContext()
  const collections: StubCollection[] = ctx.collection ? [ctx.collection] : getCollections()

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-collection-list"
      style={{
        padding: 'clamp(70px, 9vw, 130px) 4vw',
        background: bg,
        color: ink,
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div
        className="olea-cl-head"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.4fr',
          gap: '5vw',
          alignItems: 'end',
          marginBottom: 'clamp(48px, 6vw, 84px)',
        }}
      >
        <div>
          {eyebrow && (
            <span
              style={{
                display: 'inline-block',
                color: '#6e745f',
                fontSize: '9px',
                fontWeight: 650,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          )}
          {lede && (
            <p
              style={{
                margin: '24px 0 0',
                maxWidth: '38ch',
                color: mute,
                fontSize: '13px',
                lineHeight: 1.65,
              }}
            >
              {lede}
            </p>
          )}
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
            fontWeight: 500,
            letterSpacing: '-0.045em',
            fontSize: 'clamp(48px, 5.4vw, 88px)',
            lineHeight: 0.95,
            color: ink,
          }}
        >
          {headingBefore && <>{headingBefore} </>}
          {headingItalic && (
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: italicColor }}>
              {headingItalic}
            </em>
          )}
          {headingAfter && <> {headingAfter}</>}
        </h2>
      </div>

      <div
        className="olea-cl-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '22px',
          borderTop: `1px solid ${line}`,
          paddingTop: '40px',
        }}
      >
        {collections.map((c, idx) => {
          const tone = ALL_TONES[idx % ALL_TONES.length]
          const num = String(idx + 1).padStart(2, '0')
          const productCount = c.products.length
          return (
            <article
              key={c.id}
              style={{
                paddingBottom: '28px',
                borderBottom: `1px solid ${line}`,
              }}
            >
              <a
                href={`/collections/${c.handle}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'grid',
                    placeItems: 'center',
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    background: cardStyle === 'photo' && c.image ? '#cbc3ad' : TONE_BG[tone],
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
                        top: '-12%',
                        right: '-15%',
                        width: '78%',
                        height: '78%',
                        border: '1px solid rgba(255,255,255,.5)',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '18px',
                      color: 'rgba(28,32,25,.55)',
                      fontFamily: 'var(--olea-mono, "JetBrains Mono", monospace)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '18px',
                      right: '18px',
                      color: 'rgba(28,32,25,.55)',
                      fontFamily: 'var(--olea-mono, "JetBrains Mono", monospace)',
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {productCount} formula{productCount === 1 ? '' : 's'}
                  </span>
                </div>
                <h3
                  style={{
                    margin: '22px 0 0',
                    font: 'italic 500 24px var(--olea-serif, "Cormorant Garamond", serif)',
                    letterSpacing: '-0.02em',
                    color: italicColor,
                  }}
                >
                  {c.title}
                </h3>
                {c.description && (
                  <p
                    style={{
                      margin: '8px 0 0',
                      maxWidth: '32ch',
                      color: mute,
                      fontSize: '12px',
                      lineHeight: 1.6,
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
                    marginTop: '18px',
                    paddingBottom: '4px',
                    borderBottom: `1px solid ${olive}`,
                    color: olive,
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Shop the edit <ArrowRight size={13} />
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
            padding: '60px 0',
            color: mute,
            font: 'italic 18px var(--olea-serif, "Cormorant Garamond", serif)',
          }}
        >
          The library is being arranged. Come back soon.
        </p>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .olea-cl-head { grid-template-columns: 1fr !important; gap: 32px !important; }
          [data-section-id="${section.id}"] .olea-cl-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .olea-cl-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] h2 { font-size: 46px !important; }
        }
      `}</style>
    </section>
  )
}
