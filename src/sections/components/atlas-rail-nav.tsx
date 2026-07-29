'use client'
import type { Section } from '@/sections/types'

export function AtlasRailNavSection({ section }: { section: Section }) {
  const s = section.settings
  const brandText = (s.brand_text as string) ?? 'ATLAS'
  const bottomLabel = (s.bottom_label as string) ?? 'Selected works / 18'
  const bgOpacity = (s.background_opacity as number) ?? 0.78
  const borderColor = (s.border_color as string) ?? 'rgba(232,223,210,.18)'
  const paperColor = (s.text_color as string) ?? '#e8dfd2'

  // background_opacity used with ink color for the rail tint
  const railBg = `rgba(22,18,15,${bgOpacity})`

  const navLinks = section.blocks.filter((b) => b.type === 'rail-link')

  return (
    <aside
      data-section-id={section.id}
      data-section-type="atlas-rail-nav"
      className="at-rail-root"
      aria-label="Project navigation"
      style={{
        position: 'fixed',
        zIndex: 20,
        top: 0,
        left: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        width: '86px',
        borderRight: `1px solid ${borderColor}`,
        background: railBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: paperColor,
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <a
        href="#top"
        className="at-rail-brand"
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '104px',
          borderBottom: `1px solid ${borderColor}`,
          fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
          fontWeight: 700,
          fontSize: '12px',
          letterSpacing: '0.18em',
          color: paperColor,
          textDecoration: 'none',
        }}
      >
        {brandText}
      </a>

      <nav
        className="at-rail-nav"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '34px',
        }}
      >
        {navLinks.map((b) => (
          <a
            key={b.id}
            href={(b.settings.url as string) ?? '#'}
            className="at-rail-link"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              color: 'rgba(232,223,210,.55)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color .25s',
            }}
          >
            {(b.settings.label as string) ?? 'Link'}
          </a>
        ))}
      </nav>

      {bottomLabel && (
        <span
          className="at-rail-counter"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            placeSelf: 'center',
            padding: '28px 0',
            color: 'rgba(232,223,210,.46)',
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {bottomLabel}
        </span>
      )}

      <style>{`
        [data-section-id="${section.id}"] .at-rail-link:hover { color: ${paperColor} !important; }
        /* Push sibling sections right of the fixed rail.
           Use margin-left, not padding-left — sections set their own
           paddingInline inline, which would override a padding rule. */
        [data-section-id="${section.id}"] ~ * { margin-left: 86px; }
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] {
            position: absolute !important;
            right: 0 !important;
            bottom: auto !important;
            width: auto !important;
            height: 70px !important;
            grid-template-columns: auto 1fr !important;
            grid-template-rows: 1fr !important;
            left: 0 !important;
          }
          [data-section-id="${section.id}"] .at-rail-brand {
            height: 70px !important;
            width: 100px !important;
            border-bottom: 0 !important;
          }
          [data-section-id="${section.id}"] .at-rail-nav {
            flex-direction: row !important;
            gap: 18px !important;
            justify-content: end !important;
            padding-right: 5vw !important;
          }
          [data-section-id="${section.id}"] .at-rail-link {
            writing-mode: initial !important;
            transform: none !important;
          }
          [data-section-id="${section.id}"] .at-rail-counter { display: none !important; }
          /* On mobile the rail becomes a top bar — siblings clear margin and get top padding */
          [data-section-id="${section.id}"] ~ * { margin-left: 0 !important; margin-top: 70px; }
          [data-section-id="${section.id}"] ~ * ~ * { margin-top: 0 !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] .at-rail-link:nth-child(n+3) { display: none !important; }
        }
      `}</style>
    </aside>
  )
}
