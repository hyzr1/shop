'use client'
import type { Section } from '@/sections/types'

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function EyebrowIcon({ kind, size = 15 }: { kind: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'circle') {
    return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>
  }
  if (kind === 'grid') {
    return <svg {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
  }
  if (kind === 'move') {
    return <svg {...props}><polyline points="13 5 19 5 19 11" /><polyline points="11 19 5 19 5 13" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
  }
  // compass
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

export function AtlasHeroSection({ section }: { section: Section }) {
  const s = section.settings
  const image = s.image as { url?: string } | undefined
  const imageUrl = image?.url ?? '/templates/atlas-hero.webp'
  const toplineLeft = (s.topline_left as string) ?? 'Architecture / Interiors / Landscape'
  const toplineLinkLabel = (s.topline_link_label as string) ?? 'Start a project'
  const toplineLinkUrl = (s.topline_link_url as string) ?? '#contact'
  const eyebrowIcon = (s.eyebrow_icon as string) ?? 'compass'
  const eyebrowText = (s.eyebrow_text as string) ?? 'Studio for grounded modern spaces'
  const headingLine1 = (s.heading_line1 as string) ?? 'Buildings that listen'
  const headingLine2 = (s.heading_line2 as string) ?? 'to the land.'
  const lede = (s.lede as string) ?? 'Atlas designs quiet, exacting places where material, light, and landscape become one continuous experience.'
  const indexLabel = (s.index_label as string) ?? 'Current feature'
  const indexTitle = (s.index_title as string) ?? 'Mesa House'
  const indexBody = (s.index_body as string) ?? 'A desert residence shaped by shade, thermal mass, and the long line of the horizon.'
  const indexCtaLabel = (s.index_cta_label as string) ?? 'View case study'
  const indexCtaUrl = (s.index_cta_url as string) ?? '#work'

  const paper = '#e8dfd2'

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-hero"
      id="top"
      className="at-hero-root"
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
        background: '#171411',
        color: paper,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(18,14,12,.76), rgba(18,14,12,.12) 55%, rgba(18,14,12,.5)), linear-gradient(0deg, rgba(18,14,12,.86), transparent 45%)',
        }}
      />

      <div
        className="at-hero-topline"
        style={{
          position: 'absolute',
          zIndex: 3,
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '34px 4vw',
          color: 'rgba(232,223,210,.72)',
          fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span>{toplineLeft}</span>
        {toplineLinkLabel && (
          <a
            href={toplineLinkUrl}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', color: 'inherit', textDecoration: 'none' }}
          >
            {toplineLinkLabel} <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <div
        className="at-hero-copy"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          padding: '27vh 0 0 5vw',
        }}
      >
        {eyebrowText && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              color: 'rgba(232,223,210,.66)',
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '10px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
            }}
          >
            <EyebrowIcon kind={eyebrowIcon} size={15} /> {eyebrowText}
          </span>
        )}
        <h1
          className="at-hero-title"
          style={{
            margin: '24px 0 0',
            fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
            fontWeight: 400,
            letterSpacing: '-0.045em',
            fontSize: 'clamp(72px, 8vw, 128px)',
            lineHeight: 0.82,
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
              margin: '26px 0 0',
              color: 'rgba(232,223,210,.68)',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {lede}
          </p>
        )}
      </div>

      <div
        className="at-hero-index"
        style={{
          position: 'absolute',
          right: '3.5vw',
          bottom: '34px',
          zIndex: 4,
          width: 'min(360px, 32vw)',
          padding: '24px',
          border: '1px solid rgba(232,223,210,.25)',
          background: 'rgba(18,14,12,.56)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {indexLabel && (
          <span
            style={{
              color: 'rgba(232,223,210,.56)',
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {indexLabel}
          </span>
        )}
        {indexTitle && (
          <strong
            style={{
              display: 'block',
              marginTop: '14px',
              fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: 1,
            }}
          >
            {indexTitle}
          </strong>
        )}
        {indexBody && (
          <p
            style={{
              margin: '14px 0 0',
              color: 'rgba(232,223,210,.62)',
              fontSize: '12px',
              lineHeight: 1.6,
            }}
          >
            {indexBody}
          </p>
        )}
        {indexCtaLabel && (
          <a
            href={indexCtaUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '14px',
              color: paper,
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {indexCtaLabel} <ArrowRight size={15} />
          </a>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .at-hero-topline { top: 70px !important; }
          [data-section-id="${section.id}"] .at-hero-copy { padding: 220px 5vw 0 !important; }
          [data-section-id="${section.id}"] .at-hero-index {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: auto !important;
            margin: 50px 5vw 40px !important;
          }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .at-hero-topline span { display: none !important; }
          [data-section-id="${section.id}"] .at-hero-title { font-size: 64px !important; }
        }
      `}</style>
    </section>
  )
}
