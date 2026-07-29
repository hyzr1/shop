'use client'
import type { Section } from '@/sections/types'

export function AtlasMethodSection({ section }: { section: Section }) {
  const s = section.settings
  const headerLabel = (s.header_label as string) ?? '02 / Method'
  const headingLine1 = (s.heading_line1 as string) ?? 'We start with forces,'
  const headingLine2 = (s.heading_line2 as string) ?? 'not finishes.'
  const lede = (s.lede as string) ?? 'Sun, wind, slope, access, memory, and maintenance shape the work before style enters the conversation.'
  const accentColor = (s.accent_color as string) ?? '#a65e40'
  const paper = (s.background_color as string) ?? '#e8dfd2'
  const ink = (s.text_color as string) ?? '#171411'

  const items = section.blocks.filter((b) => b.type === 'method-item')

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-method"
      id="method"
      className="at-method-root"
      style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: '7vw',
        padding: '120px 5vw',
        background: paper,
        color: ink,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div className="at-method-copy">
        {headerLabel && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              color: '#7b6a5d',
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
            margin: '20px 0 0',
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
        {lede && (
          <p
            style={{
              maxWidth: '460px',
              margin: '28px 0 0',
              color: '#6e625a',
              fontSize: '14px',
              lineHeight: 1.75,
            }}
          >
            {lede}
          </p>
        )}
      </div>

      <div
        className="at-method-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'rgba(23,20,17,.18)',
          alignSelf: 'start',
        }}
      >
        {items.map((b, idx) => {
          const number = (b.settings.number as string) ?? String(idx + 1).padStart(2, '0')
          const heading = (b.settings.heading as string) ?? 'Heading'
          const body = (b.settings.body as string) ?? ''
          return (
            <article
              key={b.id}
              style={{
                minHeight: '245px',
                padding: '27px',
                background: '#ebe3d7',
              }}
            >
              <span
                style={{
                  color: accentColor,
                  fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                }}
              >
                {number}
              </span>
              <h3
                style={{
                  margin: '42px 0 0',
                  fontSize: '23px',
                  letterSpacing: '-0.04em',
                  fontWeight: 500,
                  lineHeight: 1.1,
                }}
              >
                {heading}
              </h3>
              {body && (
                <p
                  style={{
                    margin: '12px 0 0',
                    color: '#716760',
                    fontSize: '12px',
                    lineHeight: 1.65,
                  }}
                >
                  {body}
                </p>
              )}
            </article>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 85px 5vw !important; }
          [data-section-id="${section.id}"] h2 { font-size: 48px !important; }
          [data-section-id="${section.id}"] .at-method-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
