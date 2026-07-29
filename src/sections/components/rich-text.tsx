'use client'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

const WIDTH_CLASSES: Record<string, string> = {
  narrow: 'max-w-xl',
  medium: 'max-w-3xl',
  full: 'max-w-7xl',
}

export function RichTextSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const width = (s.width as string) ?? 'medium'
  const align = (s.align as string) ?? 'left'
  const headingSize = (s.heading_size as string) ?? 'medium'
  const py = paddingValue(s.section_padding ?? 'medium')
  const maxW = (s.container_width as string)
    ? containerMaxWidth(s.container_width)
    : undefined

  // Heading size mapping — Pulse-style display type for 'large' / 'xlarge'.
  const headingStyle = (() => {
    switch (headingSize) {
      case 'small':
        return { fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 650, lineHeight: 1.15, letterSpacing: '-0.02em' as const }
      case 'large':
        return { fontSize: 'clamp(30px, 4.2vw, 56px)', fontWeight: 680, lineHeight: 1.05, letterSpacing: '-0.035em' as const }
      case 'xlarge':
        return { fontSize: 'clamp(40px, 6.2vw, 82px)', fontWeight: 680, lineHeight: 1.02, letterSpacing: '-0.04em' as const }
      case 'medium':
      default:
        return { fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 660, lineHeight: 1.1, letterSpacing: '-0.025em' as const }
    }
  })()

  const buttonBg = isDark ? '#ffffff' : '#0b0b12'
  const buttonText = isDark ? '#0b0b12' : '#ffffff'

  return (
    <section
      data-section-id={section.id}
      data-section-type="rich-text"
      style={{
        background: c.background,
        color: c.text,
        paddingBlock: py,
        paddingInline: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div
        className={`mx-auto ${maxW ? '' : (WIDTH_CLASSES[width] ?? WIDTH_CLASSES.medium)} ${align === 'center' ? 'text-center' : ''}`}
        style={maxW ? { maxWidth: maxW } : undefined}
      >
        {section.blocks.map((b) => {
          if (b.type === 'heading') {
            return (
              <h2
                key={b.id}
                style={{
                  ...headingStyle,
                  color: c.text,
                  marginBottom: '14px',
                }}
              >
                {(b.settings.text as string) ?? ''}
              </h2>
            )
          }
          if (b.type === 'text') {
            return (
              <p
                key={b.id}
                style={{
                  fontSize: 'clamp(16px, 1.3vw, 19px)',
                  lineHeight: 1.55,
                  color: c.mute,
                  marginBottom: '16px',
                  maxWidth: align === 'center' ? '640px' : undefined,
                  marginLeft: align === 'center' ? 'auto' : undefined,
                  marginRight: align === 'center' ? 'auto' : undefined,
                }}
              >
                {(b.settings.body as string) ?? ''}
              </p>
            )
          }
          if (b.type === 'button') {
            return (
              <a
                key={b.id}
                href={(b.settings.link as string) ?? '#'}
                className="inline-flex items-center font-semibold"
                style={{
                  marginTop: '8px',
                  height: '46px',
                  padding: '0 22px',
                  borderRadius: '12px',
                  fontSize: '14.5px',
                  background: buttonBg,
                  color: buttonText,
                  boxShadow: '0 1px 2px rgba(11,11,18,.18), inset 0 1px 0 rgba(255,255,255,.12)',
                }}
              >
                {(b.settings.label as string) ?? 'Button'}
              </a>
            )
          }
          return null
        })}
      </div>
    </section>
  )
}
