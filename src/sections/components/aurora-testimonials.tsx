'use client'
import type { Section } from '@/sections/types'
import { getToneGradient } from './aurora-hero'

function StarIcon({ size = 15, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function AuroraTestimonialsSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow_text as string) ?? 'Loved by thousands'
  const headingLine1 = (s.heading_line1 as string) ?? 'Words from'
  const headingItalic = (s.heading_italic as string) ?? 'wardrobe'
  const headingAfter = (s.heading_after as string) ?? '.'

  const items = section.blocks.filter((b) => b.type === 'quote')

  // Aurora palette
  const bg = '#f6f4ee'
  const ink = '#0a0a09'
  const inkSoft = '#2a2826'
  const mute = '#6b665c'
  const hair = '#e4dfd2'
  const card = '#ffffff'
  const accent = '#7c5cff'

  return (
    <section
      data-section-id={section.id}
      data-section-type="aurora-testimonials"
      className="au-quotes-root"
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
        </div>

        <div
          className="au-quotes"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(items.length, 3) || 1}, 1fr)`,
            gap: '18px',
          }}
        >
          {items.map((b) => {
            const text = (b.settings.text as string) ?? ''
            const name = (b.settings.name as string) ?? ''
            const role = (b.settings.role as string) ?? ''
            const tone = (b.settings.avatar_tone as string) ?? 'warm'
            return (
              <div
                key={b.id}
                className="au-quote"
                style={{
                  background: card,
                  border: `1px solid ${hair}`,
                  borderRadius: '24px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '3px',
                    color: accent,
                  }}
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} size={15} color={accent} />
                  ))}
                </div>
                {text && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: '16px',
                      lineHeight: 1.5,
                      letterSpacing: '-0.01em',
                      color: inkSoft,
                    }}
                  >
                    “{text}”
                  </p>
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    marginTop: 'auto',
                  }}
                >
                  <span
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: getToneGradient(tone),
                      flex: '0 0 38px',
                      position: 'relative',
                      isolation: 'isolate',
                      overflow: 'hidden',
                    }}
                  >
                    <span
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
                  </span>
                  <div>
                    {name && <strong style={{ fontSize: '14px', fontWeight: 580, display: 'block', color: inkSoft }}>{name}</strong>}
                    {role && <span style={{ fontSize: '13px', color: mute }}>{role}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          [data-section-id="${section.id}"] .au-quotes { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
