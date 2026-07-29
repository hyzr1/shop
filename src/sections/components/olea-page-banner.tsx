'use client'
import type { Section } from '@/sections/types'

function LeafIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 1.5 2 5.5 2 8.5a8.5 8.5 0 0 1-10.2 9.5z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  )
}

export function OleaPageBannerSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow as string) ?? 'Botanical apothecary'
  const headingBefore = (s.heading_before as string) ?? 'The'
  const headingItalic = (s.heading_italic as string) ?? 'collection.'
  const headingAfter = (s.heading_after as string) ?? ''
  const lede = (s.lede as string) ?? ''
  const noteIndex = (s.note_index as string) ?? '01 / 03'
  const noteText = (s.note_text as string) ?? ''
  const bg = (s.background_color as string) ?? '#e8dfce'
  const italicColor = (s.italic_color as string) ?? '#695036'
  const line = 'rgba(28,32,25,.18)'

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-page-banner"
      className="olea-pb-root"
      style={{
        position: 'relative',
        padding: '125px 5.5vw 80px',
        background: bg,
        color: '#1c2019',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
        borderBottom: `1px solid ${line}`,
      }}
    >
      <div
        className="olea-pb-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4vw',
          alignItems: 'end',
        }}
      >
        <div>
          {eyebrow && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#6e745f',
                fontSize: '9px',
                fontWeight: 650,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              <LeafIcon size={13} /> {eyebrow}
            </span>
          )}
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
              fontWeight: 500,
              letterSpacing: '-0.05em',
              fontSize: 'clamp(58px, 7vw, 112px)',
              lineHeight: 0.85,
              maxWidth: '14ch',
            }}
          >
            {headingBefore}{' '}
            <em style={{ color: italicColor, fontWeight: 400 }}>{headingItalic}</em>
            {headingAfter && <> {headingAfter}</>}
          </h1>
          {lede && (
            <p
              style={{
                maxWidth: '460px',
                margin: '28px 0 0',
                color: '#68675f',
                fontSize: '14px',
                lineHeight: 1.75,
              }}
            >
              {lede}
            </p>
          )}
        </div>

        {(noteIndex || noteText) && (
          <aside
            className="olea-pb-note"
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr',
              gap: '10px',
              maxWidth: '380px',
              paddingTop: '20px',
              borderTop: `1px solid ${line}`,
              color: '#77776d',
            }}
          >
            {noteIndex && <span style={{ fontSize: '9px', letterSpacing: '0.1em' }}>{noteIndex}</span>}
            {noteText && (
              <p
                style={{
                  margin: 0,
                  font: 'italic 16px var(--olea-serif, "Cormorant Garamond", serif)',
                  lineHeight: 1.4,
                }}
              >
                {noteText}
              </p>
            )}
          </aside>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .olea-pb-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .olea-pb-note { max-width: none !important; margin-top: 40px; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 90px 6vw 60px !important; }
          [data-section-id="${section.id}"] h1 { font-size: 64px !important; }
        }
      `}</style>
    </section>
  )
}
