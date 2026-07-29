'use client'
import { useState } from 'react'
import type { Section } from '@/sections/types'

function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function SparklesIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  )
}

function LeafIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 1.5 2 5.5 2 8.5a8.5 8.5 0 0 1-10.2 9.5z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  )
}

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  sparkles: SparklesIcon,
  leaf: LeafIcon,
}

export function OleaNewsletterSection({ section }: { section: Section }) {
  const s = section.settings
  const iconName = (s.icon as string) ?? 'sparkles'
  const eyebrow = (s.eyebrow as string) ?? 'Notes from the grove'
  const heading = (s.heading as string) ?? 'Seasonal rituals, quietly delivered.'
  const placeholder = (s.placeholder as string) ?? 'Email address'
  const buttonLabel = (s.button_label as string) ?? 'Join the journal'
  const bg = (s.background_color as string) ?? '#3e2d24'
  const textColor = (s.text_color as string) ?? '#f0e8dc'
  const iconColor = (s.icon_color as string) ?? '#c7a98d'
  const eyebrowColor = (s.eyebrow_color as string) ?? '#c7b6a4'

  const Icon = ICONS[iconName] ?? SparklesIcon

  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-newsletter"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '125px 5vw',
        background: bg,
        color: textColor,
        textAlign: 'center',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div style={{ color: iconColor }}>
        <Icon size={20} />
      </div>
      {eyebrow && (
        <span
          style={{
            marginTop: '18px',
            color: eyebrowColor,
            fontSize: '9px',
            fontWeight: 650,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2
          style={{
            margin: '22px 0 0',
            fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
            fontWeight: 500,
            letterSpacing: '-0.05em',
            fontSize: 'clamp(52px, 6vw, 86px)',
            lineHeight: 0.95,
          }}
        >
          {heading}
        </h2>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        style={{
          display: 'flex',
          width: 'min(520px, 90vw)',
          marginTop: '35px',
          borderBottom: '1px solid rgba(255,255,255,.4)',
        }}
      >
        <input
          type="email"
          required
          placeholder={placeholder}
          aria-label={placeholder}
          style={{
            flex: 1,
            padding: '15px 2px',
            border: 0,
            outline: 'none',
            background: 'transparent',
            color: '#fff',
            font: '12px var(--olea-sans, Manrope, sans-serif)',
          }}
        />
        <button
          type="submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            border: 0,
            background: 'transparent',
            color: '#fff',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          {buttonLabel} <ArrowRight size={15} />
        </button>
      </form>
      {submitted && (
        <p style={{ marginTop: '14px', fontSize: '11px', color: eyebrowColor }}>
          Thanks — keep an eye on your inbox.
        </p>
      )}
    </section>
  )
}
