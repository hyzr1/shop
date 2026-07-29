'use client'
import type { Section } from '@/sections/types'

export function AtlasSectionHeaderSection({ section }: { section: Section }) {
  const s = section.settings
  const numberedLabel = (s.numbered_label as string) ?? '01 / Selected work'
  const headingLine1 = (s.heading_line1 as string) ?? 'Precise forms,'
  const headingLine2 = (s.heading_line2 as string) ?? 'quiet materials.'
  const align = (s.align as string) ?? 'left'
  const scheme = (s.color_scheme as string) ?? 'scheme_2'
  const containerWidth = (s.container_width as string) ?? 'normal'

  const isDark = scheme === 'scheme_2'
  const bg = isDark ? '#211b17' : '#e8dfd2'
  const ink = isDark ? '#e8dfd2' : '#171411'
  const mute = isDark ? 'rgba(232,223,210,.66)' : '#7b6a5d'

  const maxWidth = containerWidth === 'wide' ? '1440px' : containerWidth === 'narrow' ? '900px' : '1280px'

  const isCenter = align === 'center'

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-section-header"
      className="at-section-header-root"
      style={{
        padding: '90px 5vw',
        background: bg,
        color: ink,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div
        style={{
          maxWidth,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isCenter ? '1fr' : '0.75fr 1.5fr',
          gap: '5vw',
          alignItems: 'end',
          textAlign: isCenter ? 'center' : 'left',
        }}
      >
        {numberedLabel && (
          <span
            style={{
              display: isCenter ? 'block' : 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              color: mute,
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '10px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              margin: isCenter ? '0 auto 24px' : 0,
            }}
          >
            {numberedLabel}
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

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] > div { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 60px 5vw !important; }
          [data-section-id="${section.id}"] h2 { font-size: 48px !important; }
        }
      `}</style>
    </section>
  )
}
