'use client'
import type { Section } from '@/sections/types'

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function FinalIcon({ kind, size = 15, color }: { kind: string; size?: number; color: string }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: color, stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'compass') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  }
  if (kind === 'grid') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )
  }
  // circle (filled by default)
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export function AtlasFinalCtaSection({ section }: { section: Section }) {
  const s = section.settings
  const icon = (s.icon as string) ?? 'circle'
  const headingLine1 = (s.heading_line1 as string) ?? 'Bring us the site.'
  const headingLine2 = (s.heading_line2 as string) ?? 'We will find the architecture.'
  const ctaLabel = (s.cta_label as string) ?? 'Begin a conversation'
  const ctaUrl = (s.cta_url as string) ?? '#top'
  const bg = (s.background_color as string) ?? '#a65e40'
  const textColor = (s.text_color as string) ?? '#171411'
  const buttonBg = (s.button_color as string) ?? '#171411'
  const buttonText = (s.button_text_color as string) ?? '#e8dfd2'

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-final-cta"
      id="contact"
      className="at-final-root"
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '600px',
        padding: '90px 6vw',
        background: bg,
        color: textColor,
        textAlign: 'center',
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div style={{ color: textColor }}>
        <FinalIcon kind={icon} size={15} color={textColor} />
      </div>
      <h2
        style={{
          margin: '25px 0 35px',
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
      {ctaLabel && (
        <a
          href={ctaUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            background: buttonBg,
            color: buttonText,
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          {ctaLabel} <ArrowUpRight size={16} />
        </a>
      )}

      <style>{`
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] h2 { font-size: 48px !important; }
        }
      `}</style>
    </section>
  )
}
