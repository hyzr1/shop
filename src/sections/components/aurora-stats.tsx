'use client'
import type { Section } from '@/sections/types'

export function AuroraStatsSection({ section }: { section: Section }) {
  const items = section.blocks.filter((b) => b.type === 'stat')

  // Aurora palette
  const bg = '#f6f4ee'
  const ink = '#0a0a09'
  const mute = '#6b665c'
  const hair = '#e4dfd2'
  const card = '#ffffff'

  return (
    <section
      data-section-id={section.id}
      data-section-type="aurora-stats"
      className="au-stats-root"
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
          className="au-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, 1fr)`,
            gap: '1px',
            background: hair,
            border: `1px solid ${hair}`,
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          {items.map((b) => {
            const num = (b.settings.number as string) ?? '0'
            const suffix = (b.settings.suffix as string) ?? ''
            const label = (b.settings.label as string) ?? ''
            return (
              <div
                key={b.id}
                className="au-stat"
                style={{
                  background: card,
                  padding: 'clamp(26px, 3.5vw, 44px) clamp(20px, 3vw, 36px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--au-display, "Instrument Serif", "Times New Roman", serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(40px, 5vw, 68px)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: ink,
                  }}
                >
                  {num}
                  {suffix && (
                    <span
                      style={{
                        fontStyle: 'normal',
                        fontFamily: 'var(--au-sans, Inter, system-ui, sans-serif)',
                        fontWeight: 600,
                      }}
                    >
                      {suffix}
                    </span>
                  )}
                </div>
                {label && (
                  <div
                    style={{
                      marginTop: '12px',
                      color: mute,
                      fontSize: '14px',
                    }}
                  >
                    {label}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          [data-section-id="${section.id}"] .au-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
