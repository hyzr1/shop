'use client'
import type { Section } from '@/sections/types'

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function LeafIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 1.5 2 5.5 2 8.5a8.5 8.5 0 0 1-10.2 9.5z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  )
}

function CircleIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function SparklesIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  )
}

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  leaf: LeafIcon,
  circle: CircleIcon,
  sparkles: SparklesIcon,
}

export function OleaStoryQuoteSection({ section }: { section: Section }) {
  const s = section.settings
  const iconName = (s.icon as string) ?? 'leaf'
  const quote = (s.quote as string) ?? '"We make fewer things, with more of what the skin recognizes."'
  const body = (s.body as string) ?? 'OLÉA began between a family olive grove and a formulation studio. We pair inherited plant knowledge with modern skin science, keeping every formula purposeful, traceable, and sensorial.'
  const ctaLabel = (s.cta_label as string) ?? 'Read our story'
  const ctaLink = (s.cta_link as string) ?? '#journal'
  const bg = (s.background_color as string) ?? '#e4dac8'

  const Icon = ICONS[iconName] ?? LeafIcon

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-story-quote"
      className="olea-story-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '145px 10vw',
        textAlign: 'center',
        background: bg,
        color: '#1c2019',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '58px',
          height: '58px',
          border: '1px solid #857a67',
          borderRadius: '50%',
          color: '#677057',
        }}
      >
        <Icon size={28} />
      </div>
      {quote && (
        <blockquote
          style={{
            maxWidth: '970px',
            margin: '38px 0 28px',
            fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
            fontWeight: 500,
            letterSpacing: '-0.05em',
            fontSize: 'clamp(48px, 5.7vw, 84px)',
            lineHeight: 0.95,
          }}
        >
          {quote}
        </blockquote>
      )}
      {body && (
        <p
          style={{
            maxWidth: '590px',
            margin: 0,
            color: '#706e65',
            fontSize: '13px',
            lineHeight: 1.8,
          }}
        >
          {body}
        </p>
      )}
      {ctaLabel && (
        <a
          href={ctaLink}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '30px',
            borderBottom: '1px solid #8c887b',
            paddingBottom: '5px',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {ctaLabel} <ArrowRight size={14} />
        </a>
      )}

      <style>{`
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 95px 6vw !important; }
          [data-section-id="${section.id}"] blockquote { font-size: 45px !important; }
        }
      `}</style>
    </section>
  )
}
