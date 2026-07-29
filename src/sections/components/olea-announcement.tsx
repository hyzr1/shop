'use client'
import type { Section } from '@/sections/types'

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function OleaAnnouncementSection({ section }: { section: Section }) {
  const s = section.settings
  const text = (s.text as string) ?? 'Complimentary ritual pouch with orders over $90'
  const link = (s.link as string) ?? ''
  const bg = (s.background_color as string) ?? '#20251d'
  const color = (s.text_color as string) ?? '#eae6da'
  const showArrow = s.show_arrow !== false

  const inner = (
    <>
      {text}
      {showArrow && <ArrowRight size={13} />}
    </>
  )

  return (
    <div
      data-section-id={section.id}
      data-section-type="olea-announcement"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        minHeight: '31px',
        background: bg,
        color: color,
        fontSize: '9px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      {link ? (
        <a href={link} style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}
