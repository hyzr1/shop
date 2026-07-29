'use client'
import { useState } from 'react'
import type { Section, Block } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { containerMaxWidth } from '@/sections/lib/layout'
import { usePageContext } from '@/sections/wrappers/context'

function ChevronRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function TruckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function ShieldIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function MinusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function PlusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function PulseProductSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'

  const layout = (s.layout as string) ?? 'left-image'
  const galleryStyle = (s.gallery_style as string) ?? 'single'
  const showBreadcrumb = (s.show_breadcrumb as boolean) ?? true
  const breadcrumb = (s.breadcrumb as string) ?? 'Shop / Apparel'
  const maxW = containerMaxWidth(s.container_width)

  const { product } = usePageContext()
  const [variantId, setVariantId] = useState<string | undefined>(product?.variants[0]?.id)
  const [qty, setQty] = useState(1)
  const [activeMedia, setActiveMedia] = useState(0)

  if (!product) return null

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]

  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'
  const accent = isDark ? '#a5b4fc' : '#6366f1'
  const accentSoft = isDark ? 'rgba(165,180,252,.15)' : '#eef0ff'

  // Reuse first image (since stub has only one) but pad to 3 for grid demo
  const medias = product.media.length > 0
    ? Array.from({ length: Math.max(product.media.length, galleryStyle === 'grid' ? 3 : 1) }, (_, i) => product.media[i % product.media.length])
    : []

  const orderMediaFirst = layout === 'left-image'

  const renderMedia = () => (
    <div style={{ position: 'sticky', top: '110px' }}>
      {galleryStyle === 'grid' ? (
        <div className="grid grid-cols-2" style={{ gap: '12px' }}>
          {medias.slice(0, 4).map((m, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '4 / 5',
                borderRadius: '14px',
                overflow: 'hidden',
                background: cardBg,
                border: `1px solid ${c.hair}`,
              }}
            >
              { }
              <img src={m.url} alt={m.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      ) : galleryStyle === 'carousel' ? (
        <div>
          <div
            style={{
              aspectRatio: '4 / 5',
              borderRadius: '16px',
              overflow: 'hidden',
              background: cardBg,
              border: `1px solid ${c.hair}`,
            }}
          >
            { }
            <img
              src={medias[activeMedia]?.url}
              alt={medias[activeMedia]?.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="flex" style={{ gap: '10px', marginTop: '12px' }}>
            {medias.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveMedia(i)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: cardBg,
                  border: `1px solid ${i === activeMedia ? accent : c.hair}`,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                { }
                <img src={m.url} alt={m.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            aspectRatio: '4 / 5',
            borderRadius: '16px',
            overflow: 'hidden',
            background: cardBg,
            border: `1px solid ${c.hair}`,
            boxShadow: '0 30px 60px -30px rgba(11,11,18,.15)',
          }}
        >
          { }
          <img src={medias[0]?.url} alt={medias[0]?.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  )

  const renderInfo = () => (
    <div className="flex flex-col" style={{ gap: '20px' }}>
      {section.blocks.map((b: Block) => {
        if (b.type === 'title') {
          return (
            <h1
              key={b.id}
              style={{
                fontWeight: 680,
                fontSize: 'clamp(28px, 3vw, 40px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: c.text,
                margin: 0,
              }}
            >
              {product.title}
            </h1>
          )
        }
        if (b.type === 'price') {
          return (
            <div key={b.id} className="flex items-baseline" style={{ gap: '10px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>
                ${variant.price.toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span style={{ fontSize: '16px', color: c.mute, textDecoration: 'line-through' }}>
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>
          )
        }
        if (b.type === 'description') {
          return (
            <p key={b.id} style={{ fontSize: '15px', lineHeight: 1.65, color: c.mute, margin: 0 }}>
              {product.description}
            </p>
          )
        }
        if (b.type === 'variant-picker') {
          return (
            <div key={b.id}>
              <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.text, marginBottom: '10px' }}>
                Size
              </p>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {product.variants.map((v) => {
                  const isActive = v.id === variantId
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={!v.available}
                      onClick={() => setVariantId(v.id)}
                      style={{
                        height: '42px',
                        minWidth: '52px',
                        padding: '0 14px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: v.available ? 'pointer' : 'not-allowed',
                        background: isActive ? (isDark ? '#ffffff' : '#0b0b12') : cardBg,
                        color: isActive ? (isDark ? '#0b0b12' : '#ffffff') : c.text,
                        border: `1px solid ${isActive ? (isDark ? '#ffffff' : '#0b0b12') : c.hair}`,
                        opacity: v.available ? 1 : 0.4,
                        transition: 'all .2s',
                      }}
                    >
                      {v.title}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        }
        if (b.type === 'quantity') {
          return (
            <div key={b.id}>
              <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.text, marginBottom: '10px' }}>
                Quantity
              </p>
              <div
                className="inline-flex items-center"
                style={{
                  gap: '4px',
                  padding: '4px',
                  borderRadius: '10px',
                  background: cardBg,
                  border: `1px solid ${c.hair}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '7px',
                    background: 'transparent',
                    border: 0,
                    color: c.text,
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon size={14} />
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontSize: '14.5px', fontWeight: 600, color: c.text }}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '7px',
                    background: 'transparent',
                    border: 0,
                    color: c.text,
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                  aria-label="Increase quantity"
                >
                  <PlusIcon size={14} />
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
                width: '100%',
                height: '54px',
                borderRadius: '12px',
                fontSize: '15.5px',
                fontWeight: 600,
                background: isDark ? '#ffffff' : '#0b0b12',
                color: isDark ? '#0b0b12' : '#ffffff',
                border: 0,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(11,11,18,.18), inset 0 1px 0 rgba(255,255,255,.12)',
                transition: 'all .25s',
              }}
            >
              Add to cart · ${(variant.price * qty).toFixed(2)}
            </button>
          )
        }
        if (b.type === 'shipping-note') {
          const noteText = (b.settings.text as string) ?? 'Free shipping on orders over $50. 30-day returns.'
          return (
            <div
              key={b.id}
              className="flex items-start"
              style={{
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '12px',
                background: accentSoft,
                border: `1px solid ${c.hair}`,
              }}
            >
              <div style={{ color: accent, flex: '0 0 16px', marginTop: '2px' }}>
                <TruckIcon size={16} />
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: c.text, margin: 0 }}>{noteText}</p>
            </div>
          )
        }
        if (b.type === 'share') {
          return (
            <div key={b.id} className="flex items-center" style={{ gap: '12px', paddingTop: '8px', borderTop: `1px solid ${c.hair}`, marginTop: '8px' }}>
              <div style={{ color: c.mute, display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <ShieldIcon size={14} />
                Secure checkout
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: c.mute }}>Share</span>
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
      data-section-type="pulse-product"
      style={{
        background: c.background,
        color: c.text,
        paddingTop: 'clamp(36px, 5vw, 64px)',
        paddingBottom: 'clamp(72px, 9vw, 120px)',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        {showBreadcrumb && breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center"
            style={{
              gap: '6px',
              fontSize: '12.5px',
              color: c.mute,
              marginBottom: '32px',
            }}
          >
            {breadcrumb.split('/').map((part, i, arr) => (
              <span key={i} className="inline-flex items-center" style={{ gap: '6px' }}>
                <span style={{ color: i === arr.length - 1 ? c.text : c.mute, fontWeight: i === arr.length - 1 ? 600 : 400 }}>
                  {part.trim()}
                </span>
                {i < arr.length - 1 && <ChevronRight size={12} />}
              </span>
            ))}
          </nav>
        )}

        <div
          className="pulse-product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(28px, 5vw, 72px)',
            alignItems: 'start',
          }}
        >
          {orderMediaFirst ? renderMedia() : renderInfo()}
          {orderMediaFirst ? renderInfo() : renderMedia()}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          [data-section-id="${section.id}"] .pulse-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
