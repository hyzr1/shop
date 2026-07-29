'use client'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

export function LogoListSection({ section }: { section: Section }) {
  const heading = (section.settings.heading_text as string) ?? ''
  const c = getScheme(section.settings.color_scheme)
  // Logo list is special: short by default ('small' = 48px) so the band
  // sits tight against the hero, matching `.p-logos`.
  const py = paddingValue(section.settings.section_padding ?? 'small')
  const maxW = containerMaxWidth(section.settings.container_width)

  return (
    <section
      data-section-id={section.id}
      data-section-type="logo-list"
      style={{
        background: c.background,
        color: c.text,
        borderTop: `1px solid ${c.hair}`,
        borderBottom: `1px solid ${c.hair}`,
        paddingBlock: py,
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: maxW, paddingInline: 'clamp(20px, 4vw, 48px)' }}
      >
        {heading && (
          <p className="text-center" style={{ fontSize: '13px', color: c.mute, marginBottom: '26px' }}>
            {heading}
          </p>
        )}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: 'clamp(28px, 5vw, 64px)', opacity: 0.6 }}
        >
          {section.blocks.map((b) => {
            const name = (b.settings.name as string) ?? ''
            if (!name) return null
            return (
              <span
                key={b.id}
                style={{ fontWeight: 700, fontSize: '19px', letterSpacing: '-0.02em', color: c.text }}
              >
                {name}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
