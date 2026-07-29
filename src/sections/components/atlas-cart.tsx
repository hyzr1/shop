'use client'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export function AtlasCartSection({ section }: { section: Section }) {
  const s = section.settings
  const heading = (s.heading as string) ?? 'The bag.'
  const subheading = (s.subheading as string) ?? 'Objects awaiting acquisition.'
  const continueLabel = (s.continue_label as string) ?? 'Return to index'
  const continueUrl = (s.continue_url as string) ?? '/collections/all'
  const checkoutLabel = (s.checkout_label as string) ?? 'Acquire all'
  const noteLeft = (s.note_left as string) ?? 'Lead time'
  const noteRight = (s.note_right as string) ?? 'Fabrication begins on confirmation. Allow 10–14 days.'
  const bg = (s.background_color as string) ?? '#211b17'

  const paper = '#e8dfd2'
  const mute = 'rgba(232,223,210,.6)'
  const line = 'rgba(232,223,210,.18)'
  const rust = '#a65e40'

  const { cart } = usePageContext()
  if (!cart) return null
  const tax = cart.subtotal * 0.08
  const total = cart.subtotal + tax
  const isEmpty = cart.lines.length === 0

  return (
    <section
      data-section-id={section.id}
      data-section-type="atlas-cart"
      style={{
        background: bg,
        color: paper,
        padding: '90px 5vw 130px',
        fontFamily: 'var(--atlas-sans, Geist, sans-serif)',
      }}
    >
      <div
        className="at-cart-head"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.7fr 1.5fr',
          gap: '5vw',
          alignItems: 'end',
          marginBottom: '60px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
            fontSize: '10px',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: mute,
            paddingBottom: '10px',
          }}
        >
          05 / Bag · {cart.lines.length.toString().padStart(2, '0')} {cart.lines.length === 1 ? 'object' : 'objects'}
        </span>
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
              fontWeight: 400,
              letterSpacing: '-0.045em',
              fontSize: 'clamp(56px, 6vw, 104px)',
              lineHeight: 0.88,
            }}
          >
            {heading}
          </h1>
          {subheading && (
            <p style={{ margin: '20px 0 0', color: mute, fontSize: '15px', lineHeight: 1.7, maxWidth: '440px' }}>
              {subheading}
            </p>
          )}
        </div>
      </div>

      {isEmpty ? (
        <div
          style={{
            border: `1px solid ${line}`,
            padding: '110px 30px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 3.4vw, 52px)',
              letterSpacing: '-0.03em',
              color: paper,
            }}
          >
            The bag is empty.
          </p>
          <p style={{ margin: '14px 0 32px', color: mute, fontSize: '13px' }}>
            Catalogued objects you save will appear here.
          </p>
          <a
            href={continueUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 22px',
              background: rust,
              color: '#171411',
              fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {continueLabel} <ArrowUpRight size={14} />
          </a>
        </div>
      ) : (
        <div
          className="at-cart-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.7fr 1fr',
            gap: '6vw',
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 100px 100px',
                gap: '20px',
                padding: '14px 0',
                borderTop: `1px solid ${line}`,
                borderBottom: `1px solid ${line}`,
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: mute,
              }}
            >
              <span>No.</span>
              <span>Object</span>
              <span style={{ textAlign: 'center' }}>Qty</span>
              <span style={{ textAlign: 'right' }}>Sum</span>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {cart.lines.map((cartLine, idx) => {
                const v = cartLine.product.variants.find((x) => x.id === cartLine.variant_id) ?? cartLine.product.variants[0]
                return (
                  <li
                    key={cartLine.id}
                    className="at-cart-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr 100px 100px',
                      gap: '20px',
                      alignItems: 'center',
                      padding: '30px 0',
                      borderBottom: `1px solid ${line}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                        fontSize: '11px',
                        color: rust,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center" style={{ gap: '18px' }}>
                      <div
                        style={{
                          width: '78px',
                          height: '78px',
                          overflow: 'hidden',
                          background: '#5f3f31',
                          flex: '0 0 78px',
                        }}
                      >
                        { }
                        <img
                          src={cartLine.product.media[0]?.url}
                          alt={cartLine.product.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                            fontWeight: 400,
                            fontSize: '22px',
                            letterSpacing: '-0.025em',
                            color: paper,
                          }}
                        >
                          {cartLine.product.title}
                        </h3>
                        <p
                          style={{
                            margin: '6px 0 10px',
                            color: mute,
                            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Size {v?.title} · ${v?.price.toFixed(2)} ea
                        </p>
                        <button
                          type="button"
                          style={{
                            background: 'transparent',
                            border: 0,
                            padding: 0,
                            fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: mute,
                            cursor: 'pointer',
                            borderBottom: `1px solid ${line}`,
                            paddingBottom: '2px',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div
                      className="inline-flex items-center"
                      style={{
                        border: `1px solid ${line}`,
                        justifySelf: 'center',
                      }}
                    >
                      <button
                        type="button"
                        style={{ width: '32px', height: '34px', background: 'transparent', border: 0, color: paper, cursor: 'pointer', fontSize: '14px' }}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: '34px',
                          textAlign: 'center',
                          fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                          fontSize: '12px',
                          color: paper,
                        }}
                      >
                        {String(cartLine.quantity).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        style={{ width: '32px', height: '34px', background: 'transparent', border: 0, color: paper, cursor: 'pointer', fontSize: '14px' }}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        textAlign: 'right',
                        fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: paper,
                      }}
                    >
                      ${(cartLine.product.price * cartLine.quantity).toFixed(2)}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside
            className="at-cart-summary"
            style={{
              padding: '34px',
              border: `1px solid ${line}`,
              background: 'rgba(232,223,210,.03)',
              position: 'sticky',
              top: '120px',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.13em',
                color: rust,
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              06 / Summary
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--atlas-serif, "Instrument Serif", serif)',
                fontWeight: 400,
                fontSize: '40px',
                letterSpacing: '-0.03em',
                color: paper,
              }}
            >
              ${total.toFixed(2)}
            </h2>
            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: `1px solid ${line}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <div className="flex justify-between">
                <span style={{ color: mute }}>Subtotal</span>
                <span style={{ color: paper }}>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: mute }}>Tax (est.)</span>
                <span style={{ color: paper }}>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: mute }}>Shipping</span>
                <span style={{ color: paper }}>Included</span>
              </div>
            </div>
            <button
              type="button"
              style={{
                width: '100%',
                marginTop: '28px',
                padding: '18px 22px',
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
                gap: '16px',
              }}
            >
              <span>{checkoutLabel}</span>
              <ArrowUpRight size={14} />
            </button>
            {(noteLeft || noteRight) && (
              <div
                style={{
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${line}`,
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '14px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.13em',
                    color: mute,
                    textTransform: 'uppercase',
                  }}
                >
                  {noteLeft}
                </span>
                <p style={{ margin: 0, color: mute, fontSize: '12px', lineHeight: 1.6 }}>{noteRight}</p>
              </div>
            )}
            <a
              href={continueUrl}
              style={{
                display: 'inline-flex',
                marginTop: '22px',
                paddingTop: '14px',
                borderTop: `1px solid ${line}`,
                width: '100%',
                color: mute,
                fontFamily: 'var(--atlas-mono, "Geist Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              ← {continueLabel}
            </a>
          </aside>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .at-cart-head { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .at-cart-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .at-cart-summary { position: static !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 70px 5vw 90px !important; }
          [data-section-id="${section.id}"] h1 { font-size: 52px !important; }
          [data-section-id="${section.id}"] .at-cart-row { grid-template-columns: 1fr !important; row-gap: 16px; }
          [data-section-id="${section.id}"] .at-cart-row > div:nth-child(3),
          [data-section-id="${section.id}"] .at-cart-row > p { justify-self: start !important; text-align: left !important; }
        }
      `}</style>
    </section>
  )
}
