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

export function OleaRitualSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow as string) ?? 'The three-minute ritual'
  const heading = (s.heading as string) ?? "Care that follows the body's pace."
  const lede = (s.lede as string) ?? 'Warm the serum between your palms. Press, do not rub. Let the formula settle before sealing in moisture.'
  const ctaLabel = (s.cta_label as string) ?? 'Build your ritual'
  const ctaLink = (s.cta_link as string) ?? '#shop'
  const image = s.image as { url?: string } | undefined
  const imageCaption = (s.image_caption as string) ?? 'Evening light / olive grove, Puglia'

  const bg = (s.background_color as string) ?? '#253025'
  const textColor = (s.text_color as string) ?? '#ede9dc'
  const eyebrowColor = (s.eyebrow_color as string) ?? '#afb7a2'
  const muteColor = (s.mute_color as string) ?? '#b7bcaf'

  const steps = section.blocks.filter((b) => b.type === 'ritual-step')

  const imageUrl = image?.url ?? '/templates/olea-hero.webp'

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-ritual"
      className="olea-ritual-root"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '760px',
        background: bg,
        color: textColor,
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div
        className="olea-ritual-image"
        style={{
          position: 'relative',
          minHeight: '650px',
          overflow: 'hidden',
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
              objectPosition: '72% center',
              filter: 'saturate(.75) brightness(.72)',
              transform: 'scale(1.18)',
            }}
          />
        )}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg,transparent,rgba(37,48,37,.45))',
          }}
        />
        {imageCaption && (
          <span
            style={{
              position: 'absolute',
              zIndex: 2,
              bottom: '24px',
              left: '25px',
              fontSize: '8px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {imageCaption}
          </span>
        )}
      </div>

      <div
        className="olea-ritual-copy"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8vw',
        }}
      >
        {eyebrow && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: eyebrowColor,
              fontSize: '9px',
              fontWeight: 650,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2
            style={{
              margin: '14px 0 0',
              fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
              fontWeight: 500,
              letterSpacing: '-0.05em',
              fontSize: 'clamp(48px, 5vw, 76px)',
              lineHeight: 0.95,
            }}
          >
            {heading}
          </h2>
        )}
        {lede && (
          <p
            style={{
              maxWidth: '490px',
              margin: '30px 0',
              color: muteColor,
              fontSize: '14px',
              lineHeight: 1.75,
            }}
          >
            {lede}
          </p>
        )}
        {steps.length > 0 && (
          <ol
            style={{
              margin: '5px 0 0',
              padding: 0,
              listStyle: 'none',
              borderTop: '1px solid rgba(255,255,255,.16)',
            }}
          >
            {steps.map((b) => (
              <li
                key={b.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: '18px',
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(255,255,255,.16)',
                }}
              >
                <span style={{ color: '#9da590', fontSize: '9px' }}>
                  {(b.settings.number as string) ?? '01'}
                </span>
                <div>
                  <strong
                    style={{
                      display: 'block',
                      font: '500 19px var(--olea-serif, "Cormorant Garamond", serif)',
                    }}
                  >
                    {(b.settings.heading as string) ?? 'Step'}
                  </strong>
                  {b.settings.body && (
                    <small
                      style={{
                        display: 'block',
                        marginTop: '4px',
                        color: '#9fa69a',
                        fontSize: '10px',
                      }}
                    >
                      {b.settings.body as string}
                    </small>
                  )}
                </div>
              </li>
            ))}
          </ol>
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
              borderBottom: '1px solid rgba(255,255,255,.4)',
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
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .olea-ritual-copy { padding: 90px 8vw !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .olea-ritual-image { min-height: 500px; }
          [data-section-id="${section.id}"] .olea-ritual-copy { padding: 80px 6vw !important; }
          [data-section-id="${section.id}"] .olea-ritual-copy h2 { font-size: 47px !important; }
        }
      `}</style>
    </section>
  )
}
