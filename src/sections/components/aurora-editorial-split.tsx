'use client'
import type { Section } from '@/sections/types'
import { getToneGradient } from './aurora-hero'

function FeatureIcon({ kind, size = 18 }: { kind: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'shield') {
    return (
      <svg {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }
  if (kind === 'truck') {
    return (
      <svg {...props}>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  }
  if (kind === 'sparkles') {
    return (
      <svg {...props}>
        <polygon points="12 3 13.5 8.5 19 10 13.5 11.5 12 17 10.5 11.5 5 10 10.5 8.5 12 3" />
        <line x1="18" y1="17" x2="18" y2="21" />
        <line x1="16" y1="19" x2="20" y2="19" />
      </svg>
    )
  }
  if (kind === 'workflow') {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="6" height="6" />
        <rect x="15" y="15" width="6" height="6" />
        <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      </svg>
    )
  }
  // leaf (default)
  return (
    <svg {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  )
}

export function AuroraEditorialSplitSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow_text as string) ?? 'Our craft'
  const headingLine1 = (s.heading_line1 as string) ?? 'Better made,'
  const headingItalic = (s.heading_italic as string) ?? 'by design'
  const headingAfter = (s.heading_after as string) ?? '.'
  const lede = (s.lede as string) ?? 'We work with a small circle of family-run mills to make fewer, better things — traceable from fiber to finish.'
  const mediaTone = (s.media_tone as string) ?? 'warm'
  const mediaPosition = (s.media_position as string) ?? 'left'

  const items = section.blocks.filter((b) => b.type === 'feature')

  // Aurora palette
  const bg = '#f6f4ee'
  const ink = '#0a0a09'
  const inkSoft = '#2a2826'
  const mute = '#6b665c'
  const hair = '#e4dfd2'
  const accent = '#7c5cff'
  const accentDeep = '#5b3df0'
  const accentSoft = '#ece8ff'

  const mediaCol = (
    <div
      className="au-split-media"
      style={{
        position: 'relative',
        aspectRatio: '4/5',
        borderRadius: '24px',
        overflow: 'hidden',
        border: `1px solid ${hair}`,
        isolation: 'isolate',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: getToneGradient(mediaTone),
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(130% 70% at 22% 8%, rgba(255,255,255,0.55), transparent 46%), radial-gradient(120% 100% at 85% 105%, rgba(10,10,9,0.22), transparent 55%)',
          mixBlendMode: 'soft-light',
        }}
      />
    </div>
  )

  const contentCol = (
    <div>
      {eyebrow && (
        <span
          style={{
            fontFamily: 'var(--au-mono, "Geist Mono", ui-monospace, monospace)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: mute,
            display: 'block',
            marginBottom: '22px',
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          margin: 0,
          marginBottom: '24px',
          fontWeight: 600,
          fontSize: 'clamp(34px, 5.5vw, 76px)',
          lineHeight: 0.98,
          letterSpacing: '-0.04em',
          color: ink,
        }}
      >
        <span style={{ display: 'inline-block' }}>{headingLine1}</span>
        <br />
        <span style={{ display: 'inline-block' }}>
          {headingItalic && (
            <em
              style={{
                fontFamily: 'var(--au-display, "Instrument Serif", "Times New Roman", serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: accent,
              }}
            >
              {headingItalic}
            </em>
          )}
          {headingAfter}
        </span>
      </h2>
      {lede && (
        <p
          style={{
            margin: '22px 0 0',
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            lineHeight: 1.6,
            color: mute,
          }}
        >
          {lede}
        </p>
      )}
      <div
        className="au-feat"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          marginTop: '30px',
        }}
      >
        {items.map((b) => {
          const icon = (b.settings.icon as string) ?? 'leaf'
          const heading = (b.settings.heading as string) ?? 'Feature'
          const body = (b.settings.body as string) ?? ''
          return (
            <div
              key={b.id}
              className="au-feat-item"
              style={{ display: 'flex', gap: '14px' }}
            >
              <span
                style={{
                  flex: '0 0 40px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '11px',
                  background: accentSoft,
                  color: accentDeep,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FeatureIcon kind={icon} size={18} />
              </span>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 580, color: inkSoft }}>{heading}</h4>
                {body && <p style={{ margin: '3px 0 0', fontSize: '14px', color: mute, lineHeight: 1.5 }}>{body}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <section
      data-section-id={section.id}
      data-section-type="aurora-editorial-split"
      className="au-split-root"
      style={{
        padding: 'clamp(80px, 11vw, 168px) 0',
        background: bg,
        color: ink,
        fontFamily: 'var(--au-sans, Inter, system-ui, sans-serif)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
        }}
      >
        <div
          className="au-split"
          style={{
            display: 'grid',
            gridTemplateColumns: mediaPosition === 'right' ? '1fr 1.05fr' : '1.05fr 1fr',
            gap: 'clamp(28px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {mediaPosition === 'right' ? (
            <>
              {contentCol}
              {mediaCol}
            </>
          ) : (
            <>
              {mediaCol}
              {contentCol}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          [data-section-id="${section.id}"] .au-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
