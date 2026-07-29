'use client'
import type { Section } from '@/sections/types'

const TONE_GRADIENTS: Record<string, string> = {
  warm: 'linear-gradient(145deg, #efe9ff 0%, #c9bcff 48%, #7c5cff 100%)',
  cool: 'linear-gradient(145deg, #e2f3ff 0%, #93d6f5 48%, #2f9fe0 100%)',
  neutral: 'linear-gradient(145deg, #ffece0 0%, #ffb892 48%, #f4744a 100%)',
  amber: 'linear-gradient(145deg, #ecf8e9 0%, #a9e6a0 48%, #3fae55 100%)',
  rose: 'linear-gradient(145deg, #ffeaf2 0%, #ffb0cd 48%, #ff5c93 100%)',
  olive: 'linear-gradient(145deg, #f6edff 0%, #d9b8ff 48%, #9a5cff 100%)',
}

export function getToneGradient(tone: string): string {
  return TONE_GRADIENTS[tone] ?? TONE_GRADIENTS.warm
}

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export function AuroraHeroSection({ section }: { section: Section }) {
  const s = section.settings
  const badgeText = (s.badge_text as string) ?? 'Autumn / Winter · New collection'
  const headingLine1 = (s.heading_line1 as string) ?? 'The new season,'
  const headingItalic = (s.heading_italic as string) ?? 'defined'
  const headingAfter = (s.heading_after as string) ?? 'by you.'
  const lede = (s.lede as string) ?? 'Considered clothing in natural fibers — designed in studio, made to last, and shipped carbon-neutral to your door.'
  const cta1Label = (s.cta1_label as string) ?? 'Shop the collection'
  const cta1Url = (s.cta1_url as string) ?? '#'
  const cta2Label = (s.cta2_label as string) ?? 'Explore lookbook'
  const cta2Url = (s.cta2_url as string) ?? '#'

  const shots = section.blocks.filter((b) => b.type === 'hero-shot')

  // Aurora palette
  const bg = '#f6f4ee'
  const bg2 = '#efece3'
  const ink = '#0a0a09'
  const mute = '#6b665c'
  const hair = '#e4dfd2'
  const hairStrong = '#c9c2b0'
  const accent = '#7c5cff'

  return (
    <section
      data-section-id={section.id}
      data-section-type="aurora-hero"
      className="au-hero-root"
      style={{
        position: 'relative',
        padding: '168px 0 clamp(60px, 8vw, 110px)',
        overflow: 'hidden',
        background: bg,
        color: ink,
        fontFamily: 'var(--au-sans, Inter, system-ui, sans-serif)',
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(10,10,9,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,9,0.05) 1px, transparent 1px)',
          backgroundSize: 'clamp(56px, 6vw, 92px) clamp(56px, 6vw, 92px)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)',
        }}
      />
      {/* Purple glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          zIndex: 0,
          width: '700px',
          height: '700px',
          left: '50%',
          top: '-200px',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,255,0.16), transparent 62%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="au-hero-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {badgeText && (
          <div
            className="au-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              padding: '7px 15px',
              marginBottom: '26px',
              background: 'rgba(255,255,255,0.7)',
              border: `1px solid ${hair}`,
              borderRadius: '999px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: accent,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--au-mono, "Geist Mono", ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: mute,
              }}
            >
              {badgeText}
            </span>
          </div>
        )}

        <h1
          className="au-h1"
          style={{
            margin: 0,
            maxWidth: '15ch',
            fontWeight: 600,
            fontSize: 'clamp(44px, 8vw, 116px)',
            lineHeight: 0.96,
            letterSpacing: '-0.045em',
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
            {headingItalic && headingAfter && ' '}
            {headingAfter}
          </span>
        </h1>

        {lede && (
          <p
            className="au-lede"
            style={{
              maxWidth: '540px',
              margin: '30px auto 0',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
              color: mute,
            }}
          >
            {lede}
          </p>
        )}

        <div
          className="au-hero-actions"
          style={{
            display: 'flex',
            gap: '13px',
            marginTop: '38px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {cta1Label && (
            <a
              href={cta1Url}
              className="au-btn au-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 32px',
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '-0.005em',
                background: ink,
                color: bg,
                textDecoration: 'none',
              }}
            >
              {cta1Label} <ArrowUpRight size={16} />
            </a>
          )}
          {cta2Label && (
            <a
              href={cta2Url}
              className="au-btn au-btn-ghost"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 32px',
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '-0.005em',
                background: 'rgba(255,255,255,0.6)',
                color: ink,
                border: `1px solid ${hairStrong}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                textDecoration: 'none',
              }}
            >
              {cta2Label}
            </a>
          )}
        </div>

        {shots.length > 0 && (
          <div
            className="au-hero-shots"
            style={{
              marginTop: 'clamp(56px, 8vw, 96px)',
              display: 'grid',
              gridTemplateColumns: `repeat(${shots.length}, 1fr)`,
              gap: '16px',
              width: '100%',
            }}
          >
            {shots.map((b, idx) => {
              const tone = (b.settings.tone as string) ?? 'warm'
              const category = (b.settings.category as string) ?? ''
              const price = (b.settings.price as string) ?? ''
              return (
                <div
                  key={b.id}
                  className="au-shot"
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: `1px solid ${hair}`,
                    background: bg2,
                    transform: idx === 1 ? 'translateY(-28px)' : undefined,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: getToneGradient(tone),
                      isolation: 'isolate',
                    }}
                  >
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
                  {category && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '14px',
                        bottom: '14px',
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: ink,
                      }}
                    >
                      {category}
                    </span>
                  )}
                  {price && (
                    <span
                      style={{
                        position: 'absolute',
                        right: '14px',
                        bottom: '14px',
                        padding: '6px 11px',
                        background: ink,
                        color: '#fff',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {price}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 760px) {
          [data-section-id="${section.id}"] .au-hero-shots { grid-template-columns: 1fr 1fr !important; }
          [data-section-id="${section.id}"] .au-shot:nth-child(3) { display: none !important; }
        }
      `}</style>
    </section>
  )
}
