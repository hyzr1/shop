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

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export function OleaHeroSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow_text as string) ?? 'Botanical skin rituals'
  const headingBefore = (s.heading_before as string) ?? 'Skin, returned to'
  const headingItalic = (s.heading_italic as string) ?? 'rhythm.'
  const headingAfter = (s.heading_after as string) ?? ''
  const lede = (s.lede as string) ?? 'High-performance formulas rooted in Mediterranean botanicals, made slowly for skin that wants less noise.'
  const ctaLabel = (s.cta_label as string) ?? 'Discover the collection'
  const ctaLink = (s.cta_link as string) ?? '#shop'
  const image = s.image as { url?: string } | undefined
  const imageCaption = (s.image_caption as string) ?? 'The Daily Restoration Ritual'
  const noteIndex = (s.note_index as string) ?? '01 / 03'
  const noteText = (s.note_text as string) ?? 'Cold-pressed olive leaf, fermented fig, and mineral-rich spring water.'

  const leftBg = (s.left_background as string) ?? '#e8dfce'
  const italicColor = (s.italic_color as string) ?? '#695036'
  const line = 'rgba(28,32,25,.18)'

  const imageUrl = image?.url ?? '/templates/olea-hero.webp'

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-hero"
      className="olea-hero-root"
      style={{
        display: 'grid',
        gridTemplateColumns: '42% 58%',
        minHeight: 'calc(100svh - 125px)',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
        color: '#1c2019',
      }}
    >
      <div
        className="olea-hero-copy"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '9vh 5.5vw 8vh',
          background: leftBg,
        }}
      >
        {eyebrow && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6e745f',
              fontSize: '9px',
              fontWeight: 650,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <LeafIcon size={13} /> {eyebrow}
          </span>
        )}
        <h1
          style={{
            margin: '28px 0 0',
            fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
            fontWeight: 500,
            letterSpacing: '-0.05em',
            fontSize: 'clamp(70px, 7.8vw, 122px)',
            lineHeight: 0.76,
          }}
        >
          {headingBefore}{' '}
          <em style={{ color: italicColor, fontWeight: 400 }}>{headingItalic}</em>
          {headingAfter && <> {headingAfter}</>}
        </h1>
        {lede && (
          <p
            style={{
              maxWidth: '430px',
              margin: '34px 0 0',
              color: '#68675f',
              fontSize: '14px',
              lineHeight: 1.75,
            }}
          >
            {lede}
          </p>
        )}
        {ctaLabel && (
          <a
            href={ctaLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '13px',
              width: 'max-content',
              marginTop: '33px',
              paddingBottom: '7px',
              borderBottom: '1px solid #686a60',
              fontSize: '11px',
              fontWeight: 650,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {ctaLabel} <ArrowUpRight size={16} />
          </a>
        )}
        {(noteIndex || noteText) && (
          <div
            className="olea-hero-note"
            style={{
              position: 'absolute',
              right: '5.5vw',
              bottom: '30px',
              left: '5.5vw',
              display: 'grid',
              gridTemplateColumns: '70px 1fr',
              paddingTop: '16px',
              borderTop: `1px solid ${line}`,
              color: '#77776d',
            }}
          >
            <span style={{ fontSize: '9px' }}>{noteIndex}</span>
            <p
              style={{
                maxWidth: '330px',
                margin: 0,
                font: 'italic 16px var(--olea-serif, "Cormorant Garamond", serif)',
                lineHeight: 1.3,
              }}
            >
              {noteText}
            </p>
          </div>
        )}
      </div>

      <div
        className="olea-hero-media"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#cbc3ad',
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
            }}
          />
        )}
        {imageCaption && (
          <span
            style={{
              position: 'absolute',
              bottom: '25px',
              left: '25px',
              padding: '8px 10px',
              background: 'rgba(244,239,229,.78)',
              fontSize: '8px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#1c2019',
            }}
          >
            {imageCaption}
          </span>
        )}
        <div
          style={{
            position: 'absolute',
            right: '25px',
            bottom: '30px',
            display: 'flex',
            gap: '5px',
          }}
        >
          <span style={{ width: '26px', height: '1px', background: 'rgba(255,255,255,.55)' }} />
          <span style={{ width: '26px', height: '1px', background: '#fff' }} />
          <span style={{ width: '26px', height: '1px', background: 'rgba(255,255,255,.55)' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .olea-hero-copy { min-height: 640px; }
          [data-section-id="${section.id}"] .olea-hero-media { min-height: 620px; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .olea-hero-copy { min-height: 600px; padding: 8vh 6vw 120px !important; }
          [data-section-id="${section.id}"] .olea-hero-copy h1 { font-size: 68px !important; }
          [data-section-id="${section.id}"] .olea-hero-media { min-height: 480px; }
        }
      `}</style>
    </section>
  )
}
