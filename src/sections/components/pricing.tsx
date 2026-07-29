'use client'
import type { Section } from '@/sections/types'
import { Check } from 'lucide-react'
import { PulseIcon } from './pulse-icons'
import { getScheme } from '@/sections/lib/scheme'
import { paddingValue, containerMaxWidth } from '@/sections/lib/layout'

export function PricingSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'

  const eyebrow = (s.eyebrow_text as string) ?? ''
  const eyebrowIcon = (s.eyebrow_icon as string) ?? 'bar-chart'
  const heading = (s.heading as string) ?? ''
  const lede = (s.lede as string) ?? ''
  const py = paddingValue(s.section_padding)
  const maxW = containerMaxWidth(s.container_width)

  return (
    <section
      data-section-id={section.id}
      data-section-type="pricing"
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

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start" style={{ gap: '20px' }}>
          {section.blocks.map((b) => {
            const plan = (b.settings.plan_name as string) ?? ''
            const price = (b.settings.price as string) ?? ''
            const period = (b.settings.price_period as string) ?? ''
            const desc = (b.settings.description as string) ?? ''
            const featuresText = (b.settings.features_text as string) ?? ''
            const ctaLabel = (b.settings.cta_label as string) ?? ''
            const ctaLink = (b.settings.cta_link as string) ?? '#'
            const featured = Boolean(b.settings.featured)
            const features = featuresText.split('\n').map((l) => l.trim()).filter(Boolean)

            return (
              <div
                key={b.id}
                className="relative"
                style={{
                  background: cardBg,
                  border: featured ? '1px solid #6366f1' : `1px solid ${c.hair}`,
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: featured ? '0 24px 50px -24px rgba(99,102,241,.45)' : 'none',
                }}
              >
                {featured && (
                  <span
                    className="absolute"
                    style={{
                      top: '-11px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#6366f1',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    Most popular
                  </span>
                )}
                <div style={{ fontSize: '14px', fontWeight: 650, color: '#6366f1' }}>{plan}</div>
                <div style={{ fontSize: '44px', fontWeight: 730, letterSpacing: '-0.03em', marginTop: '10px', color: c.text }}>
                  {price}
                  {period && (
                    <span style={{ fontSize: '15px', fontWeight: 500, color: c.mute }}>{period}</span>
                  )}
                </div>
                {desc && (
                  <div style={{ fontSize: '14px', color: c.mute, marginTop: '8px' }}>{desc}</div>
                )}
                <ul className="flex flex-col" style={{ listStyle: 'none', margin: '22px 0', gap: '11px', padding: 0 }}>
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center" style={{ gap: '9px', fontSize: '14px', color: c.text }}>
                      <Check size={16} color="#6366f1" style={{ flex: '0 0 16px' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={ctaLink}
                  className="inline-flex items-center justify-center font-semibold transition-all"
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 22px',
                    borderRadius: '12px',
                    fontSize: '14.5px',
                    background: featured
                      ? (isDark ? '#ffffff' : '#0b0b12')
                      : cardBg,
                    color: featured
                      ? (isDark ? '#0b0b12' : '#ffffff')
                      : c.text,
                    border: featured
                      ? `1px solid ${isDark ? '#ffffff' : '#0b0b12'}`
                      : `1px solid ${c.hair}`,
                    boxShadow: featured ? '0 1px 2px rgba(11,11,18,.18), inset 0 1px 0 rgba(255,255,255,.12)' : 'none',
                  }}
                >
                  {ctaLabel}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
