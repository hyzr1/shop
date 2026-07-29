'use client'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { containerMaxWidth } from '@/sections/lib/layout'

function ChevronRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function PulsePageBannerSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'

  const pillTag = (s.pill_tag as string) ?? ''
  const pillText = (s.pill_text as string) ?? ''
  const heading = (s.heading as string) ?? 'Page title'
  const subheading = (s.subheading as string) ?? ''
  const breadcrumb = (s.breadcrumb as string) ?? ''
  const showSearch = (s.show_search as boolean) ?? false
  const searchPlaceholder = (s.search_placeholder as string) ?? 'Search…'
  const align = (s.align as string) ?? 'center'
  const maxW = containerMaxWidth(s.container_width)

  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'
  const accentSoft = isDark ? 'rgba(165,180,252,.18)' : '#eef0ff'
  const accent = isDark ? '#a5b4fc' : '#6366f1'

  const isCenter = align === 'center'

  return (
    <section
      data-section-id={section.id}
      data-section-type="pulse-page-banner"
      className="relative overflow-hidden"
      style={{
        background: c.background,
        color: c.text,
        paddingTop: '140px',
        paddingBottom: 'clamp(48px, 7vw, 88px)',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
        textAlign: isCenter ? 'center' : 'left',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(${c.hair} 1px, transparent 1px), linear-gradient(90deg, ${c.hair} 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 10%, transparent 75%)',
          opacity: 0.5,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '420px',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,.16), transparent 65%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: maxW }}>
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className={`flex flex-wrap items-center ${isCenter ? 'justify-center' : ''}`}
            style={{
              gap: '6px',
              fontSize: '12.5px',
              color: c.mute,
              marginBottom: '20px',
              letterSpacing: '-0.005em',
            }}
          >
            {breadcrumb.split('/').map((part, i, arr) => (
              <span key={i} className="inline-flex items-center" style={{ gap: '6px' }}>
                <span style={{ color: i === arr.length - 1 ? c.text : c.mute, fontWeight: i === arr.length - 1 ? 600 : 400 }}>
                  {part.trim()}
                </span>
                {i < arr.length - 1 && <ChevronRight size={12} />}
              </span>
            ))}
          </nav>
        )}

        {(pillTag || pillText) && (
          <span
            className="inline-flex items-center rounded-full"
            style={{
              gap: '8px',
              padding: '6px 8px 6px 14px',
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: '0 1px 2px rgba(11,11,18,.04)',
              background: cardBg,
              border: `1px solid ${c.hair}`,
              color: c.text,
              marginBottom: '20px',
            }}
          >
            {pillTag && (
              <span
                className="rounded-full"
                style={{ background: accentSoft, color: accent, fontSize: '11px', fontWeight: 700, padding: '3px 8px' }}
              >
                {pillTag}
              </span>
            )}
            {pillText && <span>{pillText}</span>}
          </span>
        )}

        <h1
          className={isCenter ? 'mx-auto' : ''}
          style={{
            maxWidth: '20ch',
            margin: isCenter ? '0 auto' : 0,
            fontWeight: 680,
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: c.text,
          }}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className={isCenter ? 'mx-auto' : ''}
            style={{
              maxWidth: '560px',
              margin: isCenter ? '20px auto 0' : '20px 0 0',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.55,
              color: c.mute,
            }}
          >
            {subheading}
          </p>
        )}

        {showSearch && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className={isCenter ? 'mx-auto' : ''}
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '28px',
              maxWidth: '480px',
              padding: '6px',
              borderRadius: '14px',
              background: cardBg,
              border: `1px solid ${c.hair}`,
              boxShadow: '0 4px 14px -8px rgba(11,11,18,.08)',
            }}
          >
            <input
              type="search"
              placeholder={searchPlaceholder}
              aria-label="Search"
              style={{
                flex: 1,
                background: 'transparent',
                border: 0,
                outline: 'none',
                padding: '10px 12px',
                fontSize: '14.5px',
                color: c.text,
              }}
            />
            <button
              type="submit"
              style={{
                height: '40px',
                padding: '0 22px',
                borderRadius: '10px',
                background: isDark ? '#ffffff' : '#0b0b12',
                color: isDark ? '#0b0b12' : '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 0,
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
