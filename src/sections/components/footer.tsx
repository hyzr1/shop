'use client'
import type { Section, Block } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { PulseIcon } from './pulse-icons'
import Link from 'next/link'

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function parseLinks(text: string): Array<{ label: string; url: string }> {
  return (text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, url] = l.split('|').map((s) => s.trim())
      return { label: label || 'Link', url: url || '#' }
    })
}

export function FooterSection({ section }: { section: Section }) {
  const copyright = (section.settings.copyright as string) ?? '© 2026'
  const c = getScheme(section.settings.color_scheme)
  const isDark = (section.settings.color_scheme as string) === 'scheme_2'

  // Partition blocks into top-area types and bottom-area types
  const topBlocks: Block[] = []
  const socialBlocks: Block[] = []
  const bottomLinkBlocks: Block[] = []

  for (const b of section.blocks) {
    if (b.type === 'social-icons') socialBlocks.push(b)
    else if (b.type === 'bottom-links') bottomLinkBlocks.push(b)
    else topBlocks.push(b)
  }

  // Build grid template columns: brand=1.6fr, link-list/text=1fr
  const cols = topBlocks
    .map((b) => (b.type === 'brand' ? '1.6fr' : '1fr'))
    .join(' ')

  // Aggregate bottom-bar links
  const allBottomLinks = bottomLinkBlocks.flatMap((b) =>
    parseLinks((b.settings.links_text as string) ?? '')
  )

  const linkHover = c.accent
  const muteHover = isDark ? 'rgba(255,255,255,0.85)' : c.text

  return (
    <footer
      data-section-id={section.id}
      data-section-type="footer"
      style={{
        background: c.background,
        color: c.text,
        borderTop: `1px solid ${c.hair}`,
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1200px',
          paddingInline: 'clamp(20px, 4vw, 48px)',
          paddingBlock: 'clamp(48px, 6vw, 72px) 32px',
        }}
      >
        {/* Top grid */}
        {topBlocks.length > 0 && (
          <div
            className="footer-top-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: cols,
              gap: '36px',
            }}
          >
            {topBlocks.map((b) => {
              if (b.type === 'brand') {
                const brandText = (b.settings.brand_text as string) ?? 'Pulse'
                const brandIcon = (b.settings.brand_icon as string) ?? 'zap'
                const tagline = (b.settings.tagline as string) ?? ''
                return (
                  <div key={b.id}>
                    <Link
                      href="/"
                      className="inline-flex items-center"
                      style={{ gap: '9px', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', color: c.text }}
                    >
                      <span
                        className="grid place-items-center"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: '#fff',
                        }}
                      >
                        <PulseIcon name={brandIcon} size={16} fill="currentColor" />
                      </span>
                      {brandText && <span>{brandText}</span>}
                    </Link>
                    {tagline && (
                      <p
                        style={{
                          color: c.mute,
                          fontSize: '14px',
                          lineHeight: 1.6,
                          marginTop: '14px',
                          maxWidth: '260px',
                        }}
                      >
                        {tagline}
                      </p>
                    )}
                  </div>
                )
              }
              if (b.type === 'link-list') {
                const heading = (b.settings.heading as string) ?? ''
                const links = parseLinks((b.settings.links_text as string) ?? '')
                return (
                  <div key={b.id}>
                    {heading && (
                      <h5
                        style={{
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: c.mute,
                          marginBottom: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {heading}
                      </h5>
                    )}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {links.map((l, i) => (
                        <li key={i}>
                          <a
                            href={l.url}
                            className="transition-colors"
                            style={{
                              display: 'block',
                              padding: '5px 0',
                              fontSize: '14px',
                              color: isDark ? 'rgba(255,255,255,0.7)' : '#2b2b38',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = linkHover }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isDark ? 'rgba(255,255,255,0.7)' : '#2b2b38' }}
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
              if (b.type === 'text') {
                const heading = (b.settings.heading as string) ?? ''
                const body = (b.settings.body as string) ?? ''
                return (
                  <div key={b.id}>
                    {heading && (
                      <h5
                        style={{
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: c.mute,
                          marginBottom: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {heading}
                      </h5>
                    )}
                    {body && (
                      <p style={{ fontSize: '14px', color: c.mute, lineHeight: 1.6 }}>{body}</p>
                    )}
                  </div>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Social icons row (full width below the cols) */}
        {socialBlocks.length > 0 && (
          <div
            className="flex items-center"
            style={{
              gap: '14px',
              marginTop: topBlocks.length > 0 ? 'clamp(28px, 4vw, 40px)' : '0',
              color: c.text,
            }}
          >
            {socialBlocks.flatMap((b) => {
              const t = b.settings.twitter as string
              const i = b.settings.instagram as string
              const f = b.settings.facebook as string
              const els: React.ReactNode[] = []
              if (t) els.push(
                <a
                  key={`${b.id}-tw`}
                  href={t}
                  aria-label="Twitter"
                  className="grid place-items-center transition-colors"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${c.hair}`,
                    color: c.mute,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = c.accent; (e.currentTarget as HTMLElement).style.borderColor = c.accent }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = c.mute; (e.currentTarget as HTMLElement).style.borderColor = c.hair }}
                >
                  <TwitterIcon />
                </a>
              )
              if (i) els.push(
                <a
                  key={`${b.id}-ig`}
                  href={i}
                  aria-label="Instagram"
                  className="grid place-items-center transition-colors"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${c.hair}`,
                    color: c.mute,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = c.accent; (e.currentTarget as HTMLElement).style.borderColor = c.accent }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = c.mute; (e.currentTarget as HTMLElement).style.borderColor = c.hair }}
                >
                  <InstagramIcon />
                </a>
              )
              if (f) els.push(
                <a
                  key={`${b.id}-fb`}
                  href={f}
                  aria-label="Facebook"
                  className="grid place-items-center transition-colors"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${c.hair}`,
                    color: c.mute,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = c.accent; (e.currentTarget as HTMLElement).style.borderColor = c.accent }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = c.mute; (e.currentTarget as HTMLElement).style.borderColor = c.hair }}
                >
                  <FacebookIcon />
                </a>
              )
              return els
            })}
          </div>
        )}

        {/* Bottom bar — always rendered */}
        <div
          className="flex flex-wrap items-center justify-between"
          style={{
            gap: '14px',
            marginTop: 'clamp(40px, 5vw, 64px)',
            paddingTop: '24px',
            borderTop: `1px solid ${c.hair}`,
            fontSize: '13px',
            color: c.mute,
          }}
        >
          <span>{copyright}</span>
          {allBottomLinks.length > 0 && (
            <ul
              className="flex flex-wrap items-center"
              style={{ gap: '22px', listStyle: 'none', padding: 0, margin: 0 }}
            >
              {allBottomLinks.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.url}
                    className="transition-colors"
                    style={{
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: c.mute,
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = muteHover }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = c.mute }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Responsive: stack the top grid on small screens */}
      <style>{`
        @media (max-width: 760px) {
          [data-section-id="${section.id}"] .footer-top-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          [data-section-id="${section.id}"] .footer-top-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
