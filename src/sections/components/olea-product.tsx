'use client'
import { useState } from 'react'
import type { Section, Block } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

function LeafIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 1.5 2 5.5 2 8.5a8.5 8.5 0 0 1-10.2 9.5z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  )
}

function BagIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

const TONE_BG: Record<string, string> = {
  clear: 'linear-gradient(145deg,#d8d7c4,#f0eee3)',
  amber: 'linear-gradient(145deg,#9e7658,#d3b090)',
  ivory: 'linear-gradient(145deg,#e3d6c1,#f5eee4)',
}

function ArtBottle({ tone, brand }: { tone: string; brand: string }) {
  let bottleStyle: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    placeItems: 'end center',
    width: '34%',
    height: '58%',
    borderRadius: '7px 7px 22px 22px',
    background: 'rgba(252,250,244,.72)',
    border: '1px solid rgba(255,255,255,.6)',
    boxShadow: '0 32px 60px rgba(46,39,29,.22)',
    backdropFilter: 'blur(8px)',
  }
  let topStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-13%',
    width: '50%',
    height: '14%',
    borderRadius: '4px 4px 0 0',
    background: '#d9cfbc',
  }
  if (tone === 'clear') {
    bottleStyle = { ...bottleStyle, borderRadius: '5px 5px 15px 15px', background: 'rgba(240,243,230,.55)' }
  } else if (tone === 'amber') {
    bottleStyle = { ...bottleStyle, width: '46%', height: '36%', borderRadius: '12px', background: 'rgba(105,62,34,.7)' }
    topStyle = { ...topStyle, top: '-18%', width: '100%', height: '20%', borderRadius: '7px', background: '#e5d9c8' }
  } else if (tone === 'ivory') {
    bottleStyle = { ...bottleStyle, width: '30%', height: '63%', borderRadius: '4px 4px 18px 18px', background: '#eee4d6' }
  }
  return (
    <div style={bottleStyle}>
      <i style={topStyle} />
      <span
        style={{
          marginBottom: '22%',
          font: '600 22px var(--olea-serif, "Cormorant Garamond", serif)',
          letterSpacing: '0.12em',
          textAlign: 'center',
          color: tone === 'amber' ? '#f4ead8' : '#1c2019',
        }}
      >
        {brand}
      </span>
    </div>
  )
}

export function OleaProductSection({ section }: { section: Section }) {
  const s = section.settings
  const layout = (s.layout as string) ?? 'left-image'
  const galleryStyle = (s.gallery_style as string) ?? 'art'
  const showBreadcrumb = (s.show_breadcrumb as boolean) ?? true
  const breadcrumb = (s.breadcrumb as string) ?? 'Formulas / Serum'
  const tone = (s.tone as string) ?? 'clear'
  const brandLabel = (s.brand_label as string) ?? 'OLÉA'
  const bg = (s.background_color as string) ?? '#f4efe5'
  const olive = '#58624a'
  const line = 'rgba(28,32,25,.18)'
  const ink = '#1c2019'
  const mute = '#68675f'
  const italicColor = (s.italic_color as string) ?? '#695036'

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
          display: 'grid',
          placeItems: 'center',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          background: galleryStyle === 'photo' ? '#cbc3ad' : TONE_BG[tone] ?? TONE_BG.clear,
        }}
      >
        {galleryStyle === 'photo' ? (
          <img
            src={product.media[0]?.url}
            alt={product.media[0]?.alt ?? product.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-10%',
                right: '-13%',
                width: '75%',
                height: '75%',
                border: '1px solid rgba(255,255,255,.5)',
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '22px',
                left: '22px',
                color: 'rgba(28,32,25,.55)',
                fontSize: '9px',
                letterSpacing: '0.1em',
              }}
            >
              01
            </span>
            <ArtBottle tone={tone} brand={brandLabel} />
          </>
        )}
        <span
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '22px',
            padding: '8px 10px',
            background: 'rgba(244,239,229,.78)',
            fontSize: '8px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#1c2019',
            backdropFilter: 'blur(8px)',
          }}
        >
          {product.title}
        </span>
      </div>
    </div>
  )

  const renderInfo = () => (
    <div className="flex flex-col" style={{ gap: '22px', paddingTop: '12px' }}>
      {section.blocks.map((b: Block) => {
        if (b.type === 'title') {
          return (
            <h1
              key={b.id}
              style={{
                margin: 0,
                fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                fontSize: 'clamp(44px, 4.5vw, 72px)',
                lineHeight: 0.9,
                color: ink,
              }}
            >
              {product.title.split(' ')[0]}{' '}
              <em style={{ color: italicColor, fontWeight: 400 }}>
                {product.title.split(' ').slice(1).join(' ') || product.title}
              </em>
            </h1>
          )
        }
        if (b.type === 'price') {
          return (
            <div key={b.id} className="flex items-baseline" style={{ gap: '12px', paddingTop: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
                  fontSize: '34px',
                  fontWeight: 500,
                  color: ink,
                  letterSpacing: '-0.02em',
                }}
              >
                ${variant.price.toFixed(2)}
              </span>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b826f' }}>
                Single bottle / 30 ml
              </span>
            </div>
          )
        }
        if (b.type === 'description') {
          return (
            <p
              key={b.id}
              style={{ margin: 0, fontSize: '14px', lineHeight: 1.8, color: mute, maxWidth: '46ch' }}
            >
              {product.description}
            </p>
          )
        }
        if (b.type === 'variant-picker') {
          return (
            <div key={b.id} style={{ paddingTop: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6e745f',
                  fontSize: '9px',
                  fontWeight: 650,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                <LeafIcon size={11} /> Size
              </span>
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
                        height: '44px',
                        minWidth: '64px',
                        padding: '0 18px',
                        background: isActive ? ink : 'transparent',
                        color: isActive ? '#f4efe5' : ink,
                        border: `1px solid ${isActive ? ink : line}`,
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
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
                  color: '#6e745f',
                  fontSize: '9px',
                  fontWeight: 650,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Quantity
              </span>
              <div
                className="inline-flex items-center"
                style={{
                  border: `1px solid ${line}`,
                  height: '44px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{ width: '42px', height: '42px', border: 0, background: 'transparent', color: ink, cursor: 'pointer', fontSize: '14px' }}
                  aria-label="Decrease"
                >
                  −
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  style={{ width: '42px', height: '42px', border: 0, background: 'transparent', color: ink, cursor: 'pointer', fontSize: '14px' }}
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
                width: '100%',
                maxWidth: '420px',
                height: '54px',
                background: '#ded4c2',
                color: '#252b20',
                border: 0,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'background .25s',
                borderRadius: 0,
              }}
            >
              <BagIcon size={14} /> Add to bag · ${(variant.price * qty).toFixed(2)}
            </button>
          )
        }
        if (b.type === 'shipping-note') {
          const noteText = (b.settings.text as string) ?? 'Complimentary ritual pouch on orders over $90. Refillable glass.'
          return (
            <div
              key={b.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '14px',
                paddingTop: '20px',
                borderTop: `1px solid ${line}`,
                maxWidth: '460px',
              }}
            >
              <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b826f' }}>
                Care
              </span>
              <p style={{ margin: 0, font: 'italic 14px var(--olea-serif, "Cormorant Garamond", serif)', lineHeight: 1.5, color: ink }}>
                {noteText}
              </p>
            </div>
          )
        }
        if (b.type === 'share') {
          return (
            <div
              key={b.id}
              className="flex items-center"
              style={{
                gap: '14px',
                paddingTop: '14px',
                borderTop: `1px solid ${line}`,
                marginTop: '4px',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: olive,
              }}
            >
              <span>Share</span>
              <span>Email</span>
              <span>Pin</span>
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
      data-section-type="olea-product"
      style={{
        background: bg,
        color: ink,
        padding: '70px 5.5vw 130px',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      {showBreadcrumb && breadcrumb && (
        <nav
          aria-label="Breadcrumb"
          style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b826f', marginBottom: '40px' }}
        >
          {breadcrumb.split('/').map((part, i, arr) => (
            <span key={i}>
              <span style={{ color: i === arr.length - 1 ? ink : '#8b826f' }}>{part.trim()}</span>
              {i < arr.length - 1 && <span style={{ margin: '0 10px' }}>/</span>}
            </span>
          ))}
        </nav>
      )}
      <div
        className="olea-product-grid"
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
          [data-section-id="${section.id}"] .olea-product-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          [data-section-id="${section.id}"] { padding: 60px 6vw 90px !important; }
        }
      `}</style>
    </section>
  )
}
