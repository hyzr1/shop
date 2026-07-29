'use client'
import type { Section } from '@/sections/types'

function StudioIcon({ kind, size = 19 }: { kind: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'compass') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  }
  if (kind === 'circle') {
    return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>
  }
  if (kind === 'move') {
    return <svg {...props}><polyline points="13 5 19 5 19 11" /><polyline points="11 19 5 19 5 13" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
  }
  // grid (default)
  return (
    <svg {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

export function AtlasStudioSection({ section }: { section: Section }) {
  const s = section.settings
  const icon = (s.icon as string) ?? 'grid'
  const headingLine1 = (s.heading_line1 as string) ?? 'Small studio.'
  const headingLine2 = (s.heading_line2 as string) ?? 'Long attention.'
  const body = (s.body as string) ?? 'We take on a limited number of projects each year so senior designers stay close to the work from first walk-through to final detail.'
  const iconColor = (s.icon_color as string) ?? '#a65e40'
  const ink = (s.background_color as string) ?? '#171411'
  const paper = (s.text_color as string) ?? '#e8dfd2'

  const stats = section.blocks.filter((b) => b.type === 'stat-text')

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-studio"
      id="studio"
      className="at-studio-root"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '720px',
        background: ink,
        color: paper,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div
        className="at-studio-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '7vw',
          borderRight: '1px solid rgba(232,223,210,.18)',
        }}
      >
        <div style={{ color: iconColor }}>
          <StudioIcon kind={icon} size={19} />
        </div>
        <h2
          style={{
            margin: '28px 0 0',
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
        {body && (
          <p
            style={{
              maxWidth: '480px',
              margin: '24px 0 0',
              color: 'rgba(232,223,210,.6)',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {body}
          </p>
        )}
      </div>

      <div
        className="at-studio-stats"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {stats.map((b) => (
          <span
            key={b.id}
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: '180px',
              borderRight: '1px solid rgba(232,223,210,.14)',
              borderBottom: '1px solid rgba(232,223,210,.14)',
              color: 'rgba(232,223,210,.72)',
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            {(b.settings.text as string) ?? ''}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .at-studio-card {
            border-right: 0 !important;
            border-bottom: 1px solid rgba(232,223,210,.18) !important;
          }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] h2 { font-size: 48px !important; }
          [data-section-id="${section.id}"] .at-studio-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
