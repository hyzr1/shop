'use client'
import type { Section } from '@/sections/types'
import { PulseIcon } from './pulse-icons'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

export function TestimonialsSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'

  const eyebrow = (s.eyebrow_text as string) ?? ''
  const eyebrowIcon = (s.eyebrow_icon as string) ?? 'zap'
  const heading = (s.heading as string) ?? ''
  const py = paddingValue(s.section_padding)
  const maxW = containerMaxWidth(s.container_width)

  return (
    <section
      data-section-id={section.id}
      data-section-type="testimonials"
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
        <div className="mx-auto text-center" style={{ maxWidth: '640px', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          {eyebrow && (
            <span
              className="inline-flex items-center justify-center"
              style={{ gap: '7px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em', color: '#6366f1', marginBottom: '16px' }}
            >
              <PulseIcon name={eyebrowIcon} size={14} fill="currentColor" />
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 style={{ fontWeight: 680, fontSize: 'clamp(30px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.035em', color: c.text }}>
              {heading}
            </h2>
          )}
        </div>

        <div className="columns-1 md:columns-3" style={{ columnGap: '20px' }}>
          {section.blocks.map((b) => {
            const text = (b.settings.text as string) ?? ''
            const name = (b.settings.name as string) ?? ''
            const role = (b.settings.role as string) ?? ''
            return (
              <div
                key={b.id}
                style={{
                  background: cardBg,
                  breakInside: 'avoid',
                  marginBottom: '20px',
                  border: `1px solid ${c.hair}`,
                  borderRadius: '16px',
                  padding: '22px',
                }}
              >
                <p style={{ fontSize: '15px', lineHeight: 1.55, letterSpacing: '-0.01em', color: c.text }}>
                  “{text}”
                </p>
                <div className="flex items-center" style={{ gap: '10px', marginTop: '16px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <strong style={{ fontSize: '13.5px', fontWeight: 620, display: 'block', color: c.text }}>{name}</strong>
                    <span style={{ fontSize: '12.5px', color: c.mute }}>{role}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
