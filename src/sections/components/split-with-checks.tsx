'use client'
import type { Section } from '@/sections/types'
import { Check } from 'lucide-react'
import { PulseIcon } from './pulse-icons'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

export function SplitWithChecksSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const panelBg = isDark ? 'rgba(255,255,255,0.05)' : '#fff'

  const eyebrow = (s.eyebrow_text as string) ?? ''
  const eyebrowIcon = (s.eyebrow_icon as string) ?? 'workflow'
  const heading = (s.heading as string) ?? ''
  const lede = (s.lede as string) ?? ''
  const mediaPosition = (s.media_position as string) ?? 'left'
  const py = paddingValue(s.section_padding)
  const maxW = containerMaxWidth(s.container_width)

  const media = (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: '16px',
        border: `1px solid ${c.hair}`,
        background: isDark
          ? 'linear-gradient(160deg, rgba(165,180,252,.15), rgba(255,255,255,0.02))'
          : 'linear-gradient(160deg, #eef0ff, #fff)',
        aspectRatio: '4/3',
        boxShadow: '0 30px 60px -30px rgba(99,102,241,.4)',
      }}
    >
      <div
        className="absolute"
        style={{
          borderRadius: '12px',
          background: panelBg,
          border: `1px solid ${c.hair}`,
          boxShadow: '0 12px 30px -12px rgba(11,11,18,.2)',
          inset: '14% 18% 36% 10%',
        }}
      />
      <div
        className="absolute"
        style={{
          borderRadius: '12px',
          background: panelBg,
          border: `1px solid ${c.hair}`,
          boxShadow: '0 12px 30px -12px rgba(11,11,18,.2)',
          inset: '44% 8% 12% 30%',
        }}
      />
    </div>
  )

  const content = (
    <div>
      {eyebrow && (
        <span
          className="inline-flex items-center"
          style={{ gap: '7px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em', color: '#6366f1' }}
        >
          <PulseIcon name={eyebrowIcon} size={14} />
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2
          style={{
            marginTop: '14px',
            fontWeight: 680,
            fontSize: 'clamp(30px, 4.2vw, 56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: c.text,
          }}
        >
          {heading}
        </h2>
      )}
      {lede && (
        <p style={{ marginTop: '16px', fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.55, color: c.mute }}>
          {lede}
        </p>
      )}
      <div className="flex flex-col" style={{ gap: '14px', marginTop: '26px' }}>
        {section.blocks.map((b) => {
          const h = (b.settings.heading as string) ?? ''
          const p = (b.settings.body as string) ?? ''
          return (
            <div key={b.id} className="flex items-start" style={{ gap: '11px' }}>
              <span
                className="grid place-items-center"
                style={{
                  flex: '0 0 22px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  color: '#fff',
                  marginTop: '1px',
                }}
              >
                <Check size={13} />
              </span>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 620, color: c.text }}>{h}</h4>
                <p style={{ fontSize: '14px', color: c.mute, marginTop: '2px' }}>{p}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <section
      data-section-id={section.id}
      data-section-type="split-with-checks"
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
          className="grid grid-cols-1 md:grid-cols-2 items-center"
          style={{ gap: 'clamp(32px, 5vw, 72px)' }}
        >
          {mediaPosition === 'right' ? (
            <>{content}{media}</>
          ) : (
            <>{media}{content}</>
          )}
        </div>
      </div>
    </section>
  )
}
