'use client'
import type { Section, Block } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function HeroMockupSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'
  const cardBgAlt = isDark ? 'rgba(255,255,255,0.03)' : '#f7f8fa'

  const pillTag = (s.pill_tag as string) ?? ''
  const pillText = (s.pill_text as string) ?? ''
  const note = (s.note as string) ?? ''
  const pbottom = paddingValue(s.section_padding)
  const maxW = containerMaxWidth(s.container_width)

  const heading = section.blocks.find((b) => b.type === 'heading')
  const subheading = section.blocks.find((b) => b.type === 'subheading')
  const buttons = section.blocks.filter((b) => b.type === 'button')

  const textBefore = (heading?.settings.text_before as string) ?? ''
  const highlight = (heading?.settings.highlight as string) ?? ''
  const textAfter = (heading?.settings.text_after as string) ?? ''
  const subText = (subheading?.settings.text as string) ?? ''

  return (
    <section
      data-section-id={section.id}
      data-section-type="hero-mockup"
      className="relative overflow-hidden text-center"
      style={{
        background: c.background,
        color: c.text,
        paddingTop: '150px',
        paddingBottom: pbottom,
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(${c.hair} 1px, transparent 1px), linear-gradient(90deg, ${c.hair} 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 25%, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 25%, black 10%, transparent 70%)',
          opacity: 0.6,
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-180px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '760px',
          height: '540px',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,.18), transparent 65%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: maxW }}>
        {/* Pill */}
        {(pillTag || pillText) && (
          <span
            className="inline-flex items-center gap-2 rounded-full"
            style={{
              padding: '6px 8px 6px 14px',
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: '0 1px 2px rgba(11,11,18,.04)',
              background: cardBg,
              border: `1px solid ${c.hair}`,
              color: c.text,
            }}
          >
            {pillTag && (
              <span
                className="rounded-full"
                style={{ background: '#eef0ff', color: '#6366f1', fontSize: '11px', fontWeight: 700, padding: '3px 8px' }}
              >
                {pillTag}
              </span>
            )}
            {pillText && <span>{pillText}</span>}
          </span>
        )}

        {/* Heading */}
        {(textBefore || highlight || textAfter) && (
          <h1
            className="mx-auto"
            style={{
              maxWidth: '16ch',
              marginTop: '26px',
              fontWeight: 680,
              fontSize: 'clamp(40px, 6.2vw, 82px)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: c.text,
            }}
          >
            {textBefore && <span>{textBefore} </span>}
            {highlight && (
              <span
                style={{
                  background: 'linear-gradient(100deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {highlight}
              </span>
            )}
            {textAfter && <span> {textAfter}</span>}
          </h1>
        )}

        {/* Subheading / lede */}
        {subText && (
          <p
            className="mx-auto"
            style={{
              maxWidth: '560px',
              marginTop: '24px',
              fontSize: 'clamp(16px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: c.mute,
            }}
          >
            {subText}
          </p>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className="flex flex-wrap justify-center" style={{ gap: '12px', marginTop: '34px' }}>
            {buttons.map((b: Block) => {
              const style = (b.settings.style as string) ?? 'primary'
              const label = (b.settings.label as string) ?? 'Button'
              const link = (b.settings.link as string) ?? '#'
              const isPrimary = style === 'primary'
              return (
                <a
                  key={b.id}
                  href={link}
                  className="inline-flex items-center gap-2 rounded-xl font-semibold transition-all"
                  style={{
                    height: '52px',
                    padding: '0 28px',
                    fontSize: '15.5px',
                    background: isPrimary
                      ? (isDark ? '#ffffff' : '#0b0b12')
                      : cardBg,
                    color: isPrimary
                      ? (isDark ? '#0b0b12' : '#ffffff')
                      : c.text,
                    border: isPrimary
                      ? `1px solid ${isDark ? '#ffffff' : '#0b0b12'}`
                      : `1px solid ${c.hair}`,
                    boxShadow: isPrimary ? '0 1px 2px rgba(11,11,18,.18), inset 0 1px 0 rgba(255,255,255,.12)' : 'none',
                  }}
                >
                  {label}
                  {isPrimary && <ArrowRight />}
                </a>
              )
            })}
          </div>
        )}

        {/* Note */}
        {note && (
          <p style={{ marginTop: '18px', fontSize: '13px', color: c.mute }}>{note}</p>
        )}

        {/* App mockup */}
        <div
          className="mx-auto overflow-hidden"
          style={{
            marginTop: 'clamp(48px, 6vw, 80px)',
            maxWidth: '980px',
            borderRadius: '16px',
            border: `1px solid ${c.hair}`,
            background: cardBg,
            boxShadow: '0 40px 80px -30px rgba(11,11,18,.3), 0 0 0 1px rgba(11,11,18,.02)',
          }}
        >
          {/* Bar */}
          <div className="flex items-center" style={{ gap: '8px', padding: '11px 14px', borderBottom: `1px solid ${c.hair}`, background: cardBgAlt }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          {/* Body */}
          <div className="grid" style={{ gridTemplateColumns: '200px 1fr', height: '360px' }}>
            <div
              className="hidden md:flex"
              style={{
                borderRight: `1px solid ${c.hair}`,
                padding: '16px',
                flexDirection: 'column',
                gap: '8px',
                background: cardBgAlt,
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '28px',
                    borderRadius: '8px',
                    background: i === 0 ? '#6366f1' : cardBg,
                    border: i === 0 ? '1px solid #6366f1' : `1px solid ${c.hair}`,
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col" style={{ padding: '20px', gap: '14px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '12px' }}>
                {[
                  { k: 'Active users', v: '24.8k' },
                  { k: 'Revenue', v: '$182k' },
                  { k: 'Conversion', v: '4.7%' },
                ].map((card) => (
                  <div key={card.k} style={{ border: `1px solid ${c.hair}`, borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', color: c.mute }}>{card.k}</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, marginTop: '6px', letterSpacing: '-0.02em', color: c.text }}>{card.v}</div>
                  </div>
                ))}
              </div>
              <div className="relative flex-1 overflow-hidden" style={{ border: `1px solid ${c.hair}`, borderRadius: '12px', minHeight: '150px' }}>
                <svg viewBox="0 0 600 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <defs>
                    <linearGradient id={`pg-${section.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,140 C80,120 120,60 200,70 C280,80 320,30 400,40 C480,50 540,20 600,25 L600,180 L0,180 Z"
                    fill={`url(#pg-${section.id})`}
                  />
                  <path
                    d="M0,140 C80,120 120,60 200,70 C280,80 320,30 400,40 C480,50 540,20 600,25"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
