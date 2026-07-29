'use client'
import { useState } from 'react'
import type { Section, Block } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

const TONE_BG: Record<string, string> = {
  rust: '#5f3f31',
  tan: '#786451',
  stone: '#332d28',
}

export function AtlasProductSection({ section }: { section: Section }) {
  const s = section.settings
  const layout = (s.layout as string) ?? 'left-image'
  const galleryStyle = (s.gallery_style as string) ?? 'art'
  const showBreadcrumb = (s.show_breadcrumb as boolean) ?? true
  const breadcrumb = (s.breadcrumb as string) ?? '04 / Index / Object'
  const tone = (s.tone as string) ?? 'rust'
  const bg = (s.background_color as string) ?? '#211b17'

  const paper = '#e8dfd2'
  const mute = 'rgba(232,223,210,.6)'
  const rust = '#a65e40'
  const line = 'rgba(232,223,210,.18)'

  const { product } = usePageContext()
  const [variantId, setVariantId] = useState<string | undefined>(product?.variants[0]?.id)
  const [qty, setQty] = useState(1)

  if (!product) return null
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]

  const orderMediaFirst = layout === 'left-image'

  const renderMedia = () => (
    <div style={{ position: 'sticky', top: '120px' }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          background: galleryStyle === 'photo' ? '#2a2320' : TONE_BG[tone] ?? TONE_BG.rust,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {galleryStyle === 'photo' && product.media[0] ? (
          <img
            src={product.media[0].url}
            alt={product.media[0].alt}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '14%',
                border: `1px solid rgba(232,223,210,.38)`,
                transform: 'rotate(6deg)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '24%',
                border: `1px solid rgba(232,223,210,.22)`,
                transform: 'rotate(-3deg)',
              }}
            />
          </>
        )}
        <span
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: paper,
            textTransform: 'uppercase',
          }}
        >
          01 / Plate
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: paper,
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          Specimen
        </span>
      </div>
    </div>
  )

  const renderInfo = () => (
    <div className="flex flex-col" style={{ gap: '24px' }}>
      {section.blocks.map((b: Block) => {
        if (b.type === 'title') {
          return (
            <h1
              key={b.id}
              style={{
                margin: 0,
                fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                fontWeight: 400,
                letterSpacing: '-0.045em',
                fontSize: 'clamp(44px, 5vw, 84px)',
                lineHeight: 0.92,
                color: paper,
              }}
            >
              {product.title}
            </h1>
          )
        }
        if (b.type === 'price') {
          return (
            <div key={b.id} style={{ paddingTop: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.13em',
                  color: rust,
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Price
              </span>
              <span
                style={{
                  fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                  fontSize: '36px',
                  fontWeight: 400,
                  color: paper,
                  letterSpacing: '-0.02em',
                }}
              >
                ${variant.price.toFixed(2)} USD
              </span>
            </div>
          )
        }
        if (b.type === 'description') {
          return (
            <p
              key={b.id}
              style={{
                margin: 0,
                fontSize: '14.5px',
                lineHeight: 1.75,
                color: mute,
                maxWidth: '46ch',
              }}
            >
              {product.description}
            </p>
          )
        }
        if (b.type === 'variant-picker') {
          return (
            <div key={b.id} style={{ paddingTop: '8px' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.13em',
                  color: rust,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                02 / Size
              </span>
              <div className="flex flex-wrap" style={{ gap: '0' }}>
                {product.variants.map((v) => {
                  const isActive = v.id === variantId
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={!v.available}
                      onClick={() => setVariantId(v.id)}
                      style={{
                        height: '46px',
                        minWidth: '72px',
                        padding: '0 16px',
                        background: isActive ? paper : 'transparent',
                        color: isActive ? '#171411' : paper,
                        border: `1px solid ${line}`,
                        borderRight: 'none',
                        fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: v.available ? 'pointer' : 'not-allowed',
                        opacity: v.available ? 1 : 0.35,
                        borderRadius: 0,
                      }}
                    >
                      {v.title}
                    </button>
                  )
                })}
                <div style={{ borderRight: `1px solid ${line}` }} />
              </div>
            </div>
          )
        }
        if (b.type === 'quantity') {
          return (
            <div key={b.id}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.13em',
                  color: rust,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                03 / Quantity
              </span>
              <div
                className="inline-flex items-center"
                style={{ border: `1px solid ${line}`, height: '46px' }}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: '44px', height: '44px', border: 0, background: 'transparent', color: paper, cursor: 'pointer', fontSize: '14px',
                  }}
                  aria-label="Decrease"
                >
                  −
                </button>
                <span
                  style={{
                    width: '46px',
                    textAlign: 'center',
                    fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                    fontSize: '12px',
                    color: paper,
                  }}
                >
                  {String(qty).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: '44px', height: '44px', border: 0, background: 'transparent', color: paper, cursor: 'pointer', fontSize: '14px',
                  }}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
          )
        }
        if (b.type === 'buy-button') {
          return (
            <button
              key={b.id}
              type="button"
              style={{
                width: 'max-content',
                minWidth: '280px',
                padding: '18px 24px',
                background: rust,
                color: '#171411',
                border: 0,
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                borderRadius: 0,
              }}
            >
              <span>Acquire / ${(variant.price * qty).toFixed(2)}</span>
              <ArrowUpRight size={14} />
            </button>
          )
        }
        if (b.type === 'shipping-note') {
          const noteText = (b.settings.text as string) ?? 'Hand-finished in studio. Allow 14 days for fabrication and inspection.'
          return (
            <div
              key={b.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr',
                gap: '20px',
                paddingTop: '24px',
                borderTop: `1px solid ${line}`,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                  fontSize: '10px',
                  letterSpacing: '0.13em',
                  color: rust,
                  textTransform: 'uppercase',
                }}
              >
                Lead time
              </span>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: mute }}>{noteText}</p>
            </div>
          )
        }
        if (b.type === 'share') {
          return (
            <div
              key={b.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr',
                gap: '20px',
                paddingTop: '14px',
                borderTop: `1px solid ${line}`,
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: mute,
              }}
            >
              <span>Provenance</span>
              <span>Mesa Studio · Taos, NM</span>
            </div>
          )
        }
        return null
      })}
    </div>
  )

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-product"
      style={{
        background: bg,
        color: paper,
        padding: '80px 5vw 130px',
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      {showBreadcrumb && breadcrumb && (
        <nav
          aria-label="Breadcrumb"
          style={{
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: mute,
            marginBottom: '50px',
          }}
        >
          {breadcrumb.split('/').map((part, i, arr) => (
            <span key={i}>
              <span style={{ color: i === arr.length - 1 ? paper : mute }}>{part.trim()}</span>
              {i < arr.length - 1 && <span style={{ margin: '0 10px' }}>/</span>}
            </span>
          ))}
        </nav>
      )}
      <div
        className="atlas-product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6vw',
          alignItems: 'start',
        }}
      >
        {orderMediaFirst ? renderMedia() : renderInfo()}
        {orderMediaFirst ? renderInfo() : renderMedia()}
      </div>

      <style>{`
        @media (max-width: 880px) {
          [data-section-id="${section.id}"] .atlas-product-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          [data-section-id="${section.id}"] { padding: 60px 5vw 90px !important; }
        }
      `}</style>
    </section>
  )
}
