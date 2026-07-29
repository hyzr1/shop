'use client'
import type { Section } from '@/sections/types'
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

export function CtaBannerSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const heading = (s.heading as string) ?? ''
  const lede = (s.lede as string) ?? ''
  const buttons = section.blocks.filter((b) => b.type === 'button')
  const py = paddingValue(s.section_padding)
  const maxW = containerMaxWidth(s.container_width)

  // The CTA banner is INHERENTLY dark — keep the existing dark gradient for scheme_2.
  // For scheme_1 (Light), invert to a light gradient with dark text.
  const innerBg = isDark
    ? 'linear-gradient(135deg, #1a1a2e, #0b0b12)'
    : 'linear-gradient(135deg, #eef0ff, #ffffff)'
  const innerColor = isDark ? '#ffffff' : '#0b0b12'
  const ledeColor = isDark ? 'rgba(255,255,255,.65)' : '#6a6a7b'
  const glow = isDark
    ? 'radial-gradient(ellipse 60% 90% at 50% 0%, rgba(99,102,241,.5), transparent 60%)'
    : 'radial-gradient(ellipse 60% 90% at 50% 0%, rgba(99,102,241,.18), transparent 60%)'
  const innerBorder = isDark ? 'none' : `1px solid ${c.hair}`

  return (
    <section
      data-section-id={section.id}
      data-section-type="cta-banner"
      style={{
        background: c.background,
        color: c.text,
      }}
    >
      <div
        className="mx-auto"
        style={{
          paddingBlock: py,
          paddingInline: 'clamp(20px, 4vw, 48px)',
          maxWidth: maxW,
        }}
      >
        <div
          className="relative overflow-hidden text-center"
          style={{
            borderRadius: '24px',
            background: innerBg,
            color: innerColor,
            padding: 'clamp(48px,7vw,90px) clamp(28px,5vw,64px)',
            border: innerBorder,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: glow }}
          />
          <div className="relative" style={{ zIndex: 1 }}>
            {heading && (
              <h2
                className="mx-auto"
                style={{
                  color: innerColor,
                  maxWidth: '18ch',
                  fontWeight: 680,
                  fontSize: 'clamp(30px, 4.2vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                }}
              >
                {heading}
              </h2>
            )}
            {lede && (
              <p
                className="mx-auto"
                style={{
                  color: ledeColor,
                  margin: '18px auto 0',
                  maxWidth: '440px',
                  fontSize: 'clamp(16px, 1.3vw, 19px)',
                  lineHeight: 1.55,
                }}
              >
                {lede}
              </p>
            )}
            {buttons.length > 0 && (
              <div className="flex flex-wrap justify-center" style={{ gap: '12px', marginTop: '32px' }}>
                {buttons.map((b) => {
                  const style = (b.settings.style as string) ?? 'primary'
                  const label = (b.settings.label as string) ?? 'Button'
                  const link = (b.settings.link as string) ?? '#'
                  const isPrimary = style === 'primary'
                  return (
                    <a
                      key={b.id}
                      href={link}
                      className="inline-flex items-center font-semibold transition-all"
                      style={{
                        gap: '8px',
                        height: '52px',
                        padding: '0 28px',
                        borderRadius: '12px',
                        fontSize: '15.5px',
                        background: isPrimary
                          ? (isDark ? '#ffffff' : '#0b0b12')
                          : 'transparent',
                        color: isPrimary
                          ? (isDark ? '#0b0b12' : '#ffffff')
                          : innerColor,
                        border: isPrimary
                          ? `1px solid ${isDark ? '#ffffff' : '#0b0b12'}`
                          : `1px solid ${isDark ? 'rgba(255,255,255,.25)' : c.hair}`,
                      }}
                    >
                      {label}
                      {isPrimary && <ArrowRight />}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
