'use client'
import type { Section } from '@/sections/types'
import { PulseIcon } from './pulse-icons'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

const COLS_CLASS: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

export function IconFeaturesGridSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'

  const eyebrow = (s.eyebrow_text as string) ?? ''
  const eyebrowIcon = (s.eyebrow_icon as string) ?? 'sparkles'
  const heading = (s.heading as string) ?? ''
  const lede = (s.lede as string) ?? ''
  const cols = (s.columns as number) ?? 3
  const py = paddingValue(s.section_padding)
  const maxW = containerMaxWidth(s.container_width)

  return (
    <section
      data-section-id={section.id}
      data-section-type="icon-features-grid"
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
        {/* Head */}
        <div className="mx-auto text-center" style={{ maxWidth: '640px', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          {eyebrow && (
            <span
              className="inline-flex items-center justify-center"
              style={{ gap: '7px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em', color: '#6366f1', marginBottom: '16px' }}
            >
              <PulseIcon name={eyebrowIcon} size={14} />
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 style={{ fontWeight: 680, fontSize: 'clamp(30px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.035em', color: c.text }}>
              {heading}
            </h2>
          )}
          {lede && (
            <p style={{ marginTop: '18px', fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.55, color: c.mute }}>
              {lede}
            </p>
          )}
        </div>

        {/* Feature grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${COLS_CLASS[cols] ?? COLS_CLASS[3]}`} style={{ gap: '20px' }}>
          {section.blocks.map((b) => {
            const icon = (b.settings.icon as string) ?? 'sparkles'
            const h = (b.settings.heading as string) ?? ''
            const p = (b.settings.body as string) ?? ''
            return (
              <div
                key={b.id}
                className="transition-all hover:-translate-y-1"
                style={{
                  background: cardBg,
                  border: `1px solid ${c.hair}`,
                  borderRadius: '16px',
                  padding: '26px',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDuration: '400ms',
                }}
              >
                <div
                  className="grid place-items-center"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#eef0ff',
                    color: '#6366f1',
                    marginBottom: '18px',
                  }}
                >
                  <PulseIcon name={icon} size={20} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 650, letterSpacing: '-0.02em', color: c.text }}>{h}</h3>
                <p style={{ fontSize: '14.5px', color: c.mute, marginTop: '8px', lineHeight: 1.55 }}>{p}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
