'use client'
import type { Section } from '@/sections/types'

export function OleaValuesSection({ section }: { section: Section }) {
  const s = section.settings
  const bg = (s.background_color as string) ?? '#f5f0e6'
  const line = 'rgba(28,32,25,.18)'

  const items = section.blocks.filter((b) => b.type === 'value-item')

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-values"
      className="olea-values-root"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, 1fr)`,
        borderBottom: `1px solid ${line}`,
        background: bg,
        color: '#1c2019',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      {items.map((b, idx) => {
        const number = (b.settings.number as string) ?? String(idx + 1).padStart(2, '0')
        const heading = (b.settings.heading as string) ?? 'Value'
        const body = (b.settings.body as string) ?? ''
        const isLast = idx === items.length - 1
        return (
          <article
            key={b.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '30px 1fr',
              gap: '10px 18px',
              padding: '42px 4vw',
              borderRight: isLast ? 0 : `1px solid ${line}`,
            }}
          >
            <span style={{ color: '#8b7a62', fontSize: '9px' }}>{number}</span>
            <h3
              style={{
                margin: 0,
                font: '500 23px var(--olea-serif, "Cormorant Garamond", serif)',
              }}
            >
              {heading}
            </h3>
            {body && (
              <p
                style={{
                  gridColumn: 2,
                  maxWidth: '300px',
                  margin: 0,
                  color: '#77766e',
                  fontSize: '11px',
                  lineHeight: 1.6,
                }}
              >
                {body}
              </p>
            )}
          </article>
        )
      })}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] article { border-right: 0 !important; border-bottom: 1px solid ${line}; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] article { padding: 32px 6vw !important; }
        }
      `}</style>
    </section>
  )
}
