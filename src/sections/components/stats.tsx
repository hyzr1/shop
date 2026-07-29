'use client'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

const COLS_CLASS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
}

export function StatsSection({ section }: { section: Section }) {
  const c = getScheme(section.settings.color_scheme)
  const isDark = (section.settings.color_scheme as string) === 'scheme_2'
  const count = Math.min(Math.max(section.blocks.length, 1), 6)
  const py = paddingValue(section.settings.section_padding)
  const maxW = containerMaxWidth(section.settings.container_width)

  // The stats band is INHERENTLY dark — keep that look for scheme_2.
  // For scheme_1 (Light), flip the band to light tones to match the surrounding page.
  const bandBg = isDark ? '#0b0b12' : '#ffffff'
  const bandText = isDark ? '#ffffff' : '#0b0b12'
  const bandMute = isDark ? 'rgba(255,255,255,.6)' : c.mute
  const numberGradient = isDark
    ? 'linear-gradient(100deg, #fff, #c7c9ff)'
    : 'linear-gradient(100deg, #0b0b12, #6366f1)'
  const bandBorder = isDark ? 'none' : `1px solid ${c.hair}`

  return (
    <section
      data-section-id={section.id}
      data-section-type="stats"
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
          className={`grid grid-cols-1 sm:grid-cols-2 ${COLS_CLASS[count] ?? COLS_CLASS[4]}`}
          style={{
            gap: '24px',
            padding: 'clamp(36px, 4vw, 56px)',
            borderRadius: '20px',
            background: bandBg,
            color: bandText,
            border: bandBorder,
          }}
        >
          {section.blocks.map((b) => {
            const number = (b.settings.number as string) ?? ''
            const label = (b.settings.label as string) ?? ''
            return (
              <div key={b.id}>
                <div
                  style={{
                    fontSize: 'clamp(34px, 4vw, 52px)',
                    fontWeight: 720,
                    letterSpacing: '-0.03em',
                    background: numberGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    lineHeight: 1.05,
                  }}
                >
                  {number}
                </div>
                <div style={{ color: bandMute, fontSize: '14px', marginTop: '6px' }}>{label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
