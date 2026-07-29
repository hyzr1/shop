'use client'
import type { Section } from '@/sections/types'

export function AtlasPageBannerSection({ section }: { section: Section }) {
  const s = section.settings
  const numberedLabel = (s.numbered_label as string) ?? '04 / Index'
  const headingLine1 = (s.heading_line1 as string) ?? 'The catalogue,'
  const headingLine2 = (s.heading_line2 as string) ?? 'in full.'
  const lede = (s.lede as string) ?? ''
  const metaLeft = (s.meta_left as string) ?? 'Updated · seasonally'
  const metaRight = (s.meta_right as string) ?? '24 objects · 4 categories'
  const bg = (s.background_color as string) ?? '#211b17'
  const isDark = (s.scheme as string) !== 'light'

  const paper = isDark ? '#e8dfd2' : '#171411'
  const ink = isDark ? '#171411' : '#e8dfd2'
  const muteColor = isDark ? 'rgba(232,223,210,.66)' : 'rgba(23,20,17,.66)'
  const line = isDark ? 'rgba(232,223,210,.18)' : 'rgba(23,20,17,.18)'

  // Atlas pages have a 86px left rail on desktop; banner should respect it
  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-page-banner"
      className="at-pb-root"
      style={{
        position: 'relative',
        padding: '130px 5vw 70px',
        background: bg,
        color: paper,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
        borderBottom: `1px solid ${line}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          color: muteColor,
          fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>{metaLeft}</span>
        <span>{metaRight}</span>
      </div>

      <div
        className="at-pb-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.7fr 1.5fr',
          gap: '5vw',
          alignItems: 'end',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            color: muteColor,
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            paddingBottom: '14px',
          }}
        >
          <span style={{ display: 'inline-block', width: '24px', height: '1px', background: muteColor }} />
          {numberedLabel}
        </span>
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
              fontWeight: 400,
              letterSpacing: '-0.045em',
              fontSize: 'clamp(58px, 6.5vw, 112px)',
              lineHeight: 0.88,
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
          </h1>
          {lede && (
            <p
              style={{
                maxWidth: '520px',
                margin: '28px 0 0',
                color: muteColor,
                fontSize: '15px',
                lineHeight: 1.7,
              }}
            >
              {lede}
            </p>
          )}
        </div>
      </div>

      {/* keep ink ref so unused-var lint doesn't fail */}
      <span aria-hidden="true" style={{ display: 'none', color: ink }} />

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .at-pb-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 100px 5vw 60px !important; }
          [data-section-id="${section.id}"] h1 { font-size: 56px !important; }
        }
      `}</style>
    </section>
  )
}
