'use client'
import type { Section } from '@/sections/types'

function MarqueeIcon({ kind, size = 20, color }: { kind: string; size?: number; color: string }) {
  const stroke = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  if (kind === 'plus') {
    return (
      <svg {...stroke}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    )
  }
  if (kind === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="6" />
      </svg>
    )
  }
  // asterisk (default)
  return (
    <svg {...stroke}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    </svg>
  )
}

export function AuroraMarqueeSection({ section }: { section: Section }) {
  const s = section.settings
  const itemsText = (s.items_text as string) ?? 'Considered design\nNatural fibers\nMade to last\nCarbon neutral\nHonest craft'
  const icon = (s.icon as string) ?? 'asterisk'
  const bgColor = (s.background_color as string) ?? '#efece3'
  const textColor = (s.text_color as string) ?? '#2a2826'
  const iconColor = (s.icon_color as string) ?? '#7c5cff'
  const hair = '#e4dfd2'

  const items = itemsText.split('\n').map((s) => s.trim()).filter(Boolean)
  const doubled = items.length > 0 ? [...items, ...items] : []

  return (
    <section
      data-section-id={section.id}
      data-section-type="aurora-marquee"
      className="au-marq-root"
      style={{
        borderTop: `1px solid ${hair}`,
        borderBottom: `1px solid ${hair}`,
        background: bgColor,
        padding: '22px 0',
        overflow: 'hidden',
        color: textColor,
        fontFamily: 'var(--au-sans, Inter, system-ui, sans-serif)',
      }}
    >
      <div
        className="au-marq-track"
        style={{
          display: 'flex',
          gap: '56px',
          width: 'max-content',
          animation: 'au-marq 28s linear infinite',
        }}
      >
        {doubled.map((m, i) => (
          <span
            key={`${m}-${i}`}
            className="au-marq-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontFamily: 'var(--au-display, "Instrument Serif", "Times New Roman", serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3vw, 38px)',
              color: textColor,
              whiteSpace: 'nowrap',
            }}
          >
            {m}
            <span style={{ color: iconColor, display: 'inline-flex' }}>
              <MarqueeIcon kind={icon} size={20} color={iconColor} />
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes au-marq { to { transform: translateX(-50%); } }
        [data-section-id="${section.id}"]:hover .au-marq-track { animation-play-state: paused; }
      `}</style>
    </section>
  )
}
