'use client'
import type { Section } from '@/sections/types'

function MoveDiagonalIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 5 19 5 19 11" />
      <polyline points="11 19 5 19 5 13" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

const TONE_BG: Record<string, string> = {
  rust: '#5f3f31',
  tan: '#786451',
  stone: '#332d28',
}

export function AtlasProjectGridSection({ section }: { section: Section }) {
  const s = section.settings
  const headerLabel = (s.header_label as string) ?? '01 / Selected work'
  const headingLine1 = (s.heading_line1 as string) ?? 'Precise forms,'
  const headingLine2 = (s.heading_line2 as string) ?? 'quiet materials.'

  const projects = section.blocks.filter((b) => b.type === 'project')

  const paper = '#e8dfd2'
  const mute = 'rgba(232,223,210,.54)'

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-project-grid"
      id="work"
      className="at-projects-root"
      style={{
        padding: '120px 5vw',
        background: '#211b17',
        color: paper,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div
        className="at-section-title"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.75fr 1.5fr',
          gap: '5vw',
          alignItems: 'end',
        }}
      >
        {headerLabel && (
          <span
            style={{
              color: 'rgba(232,223,210,.66)',
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '10px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
            }}
          >
            {headerLabel}
          </span>
        )}
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
            fontWeight: 400,
            letterSpacing: '-0.045em',
            fontSize: 'clamp(52px, 5.5vw, 88px)',
            lineHeight: 0.9,
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
        className="at-projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(projects.length, 1)}, 1fr)`,
          gap: '18px',
          marginTop: '70px',
        }}
      >
        {projects.map((b, idx) => {
          const name = (b.settings.name as string) ?? 'Project'
          const place = (b.settings.place as string) ?? ''
          const typeLabel = (b.settings.type_label as string) ?? ''
          const tone = (b.settings.tone as string) ?? 'rust'
          const bg = TONE_BG[tone] ?? TONE_BG.rust
          return (
            <article
              key={b.id}
              className="at-project-card"
              style={{ borderBottom: '1px solid rgba(232,223,210,.18)' }}
            >
              <div
                className="at-project-art"
                style={{
                  position: 'relative',
                  display: 'grid',
                  placeItems: 'center',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  background: bg,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '18%',
                    border: '1px solid rgba(232,223,210,.38)',
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
                    color: paper,
                  }}
                >
                  0{idx + 1}
                </span>
                <div style={{ color: paper, opacity: 0.5 }}>
                  <MoveDiagonalIcon size={18} />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  gap: '12px',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                    fontWeight: 400,
                    fontSize: '28px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {name}
                </h3>
                {place && (
                  <p
                    style={{
                      margin: 0,
                      color: mute,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {place}
                  </p>
                )}
              </div>
              {typeLabel && (
                <small
                  style={{
                    display: 'block',
                    margin: '18px 0',
                    color: mute,
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                  }}
                >
                  {typeLabel}
                </small>
              )}
            </article>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .at-section-title { grid-template-columns: 1fr !important; gap: 28px !important; }
          [data-section-id="${section.id}"] .at-projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 85px 5vw !important; }
          [data-section-id="${section.id}"] h2 { font-size: 48px !important; }
        }
      `}</style>
    </section>
  )
}
