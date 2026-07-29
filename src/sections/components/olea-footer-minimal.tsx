'use client'
import type { Section } from '@/sections/types'
import Link from 'next/link'

export function OleaFooterMinimalSection({ section }: { section: Section }) {
  const s = section.settings
  const brandText = (s.brand_text as string) ?? 'OLÉA'
  const tagline = (s.tagline as string) ?? 'Botanical skin rituals made between land and laboratory.'
  const bg = (s.background_color as string) ?? '#1e241c'
  const textColor = (s.text_color as string) ?? '#969d8e'
  const brandColor = (s.brand_color as string) ?? '#ece8dc'

  const links = section.blocks.filter((b) => b.type === 'footer-link')

  return (
    <footer
      data-section-id={section.id}
      data-section-type="olea-footer-minimal"
      className="olea-footer-root"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        padding: '35px 4vw',
        background: bg,
        color: textColor,
        fontSize: '9px',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <Link
        href="/"
        style={{
          color: brandColor,
          textDecoration: 'none',
          fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
          fontSize: '34px',
          fontWeight: 600,
          letterSpacing: '0.16em',
        }}
      >
        {brandText}
      </Link>
      <p style={{ textAlign: 'center', margin: 0 }}>{tagline}</p>
      <div
        style={{
          justifySelf: 'end',
          display: 'flex',
          gap: '20px',
        }}
      >
        {links.map((b) => (
          <a
            key={b.id}
            href={(b.settings.url as string) ?? '#'}
            style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            {(b.settings.label as string) ?? 'Link'}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { grid-template-columns: 1fr !important; gap: 15px; }
          [data-section-id="${section.id}"] p { text-align: left !important; }
          [data-section-id="${section.id}"] > div { justify-self: start !important; }
        }
      `}</style>
    </footer>
  )
}
