'use client'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { containerMaxWidth } from '@/sections/lib/layout'
import { usePageContext } from '@/sections/wrappers/context'

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function PulseCartSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'

  const heading = (s.heading as string) ?? 'Your cart'
  const continueLabel = (s.continue_label as string) ?? 'Continue shopping'
  const continueUrl = (s.continue_url as string) ?? '/collections/all'
  const checkoutLabel = (s.checkout_label as string) ?? 'Checkout'
  const showPromo = (s.show_promo as boolean) ?? true
  const shippingNote = (s.shipping_note as string) ?? 'Shipping calculated at checkout'
  const maxW = containerMaxWidth(s.container_width)

  const { cart } = usePageContext()
  if (!cart) return null

  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff'
  const accent = isDark ? '#a5b4fc' : '#6366f1'
  const tax = cart.subtotal * 0.08
  const total = cart.subtotal + tax

  const isEmpty = cart.lines.length === 0

  return (
    <section
      data-section-id={section.id}
      data-section-type="pulse-cart"
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
        <div className="flex flex-wrap items-baseline" style={{ gap: '12px 18px', marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <h1
            style={{
              fontWeight: 680,
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: c.text,
              margin: 0,
            }}
          >
            {heading}
          </h1>
          <span style={{ fontSize: '14px', color: c.mute }}>
            {cart.lines.length} item{cart.lines.length === 1 ? '' : 's'}
          </span>
          <a
            href={continueUrl}
            className="inline-flex items-center"
            style={{
              gap: '4px',
              marginLeft: 'auto',
              fontSize: '13.5px',
              color: c.mute,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            ← {continueLabel}
          </a>
        </div>

        {isEmpty ? (
          <div
            className="text-center"
            style={{
              padding: '80px 24px',
              borderRadius: '20px',
              background: cardBg,
              border: `1px solid ${c.hair}`,
            }}
          >
            <p style={{ fontSize: '17px', fontWeight: 600, color: c.text, margin: 0 }}>Your cart is empty</p>
            <p style={{ fontSize: '14px', color: c.mute, margin: '8px 0 24px' }}>
              Find something you love and add it to your bag.
            </p>
            <a
              href={continueUrl}
              className="inline-flex items-center"
              style={{
                gap: '8px',
                height: '46px',
                padding: '0 22px',
                borderRadius: '12px',
                background: isDark ? '#ffffff' : '#0b0b12',
                color: isDark ? '#0b0b12' : '#ffffff',
                fontSize: '14.5px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Shop now <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <div
            className="pulse-cart-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.7fr 1fr',
              gap: 'clamp(24px, 3vw, 40px)',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                borderRadius: '20px',
                background: cardBg,
                border: `1px solid ${c.hair}`,
                overflow: 'hidden',
                boxShadow: '0 4px 14px -10px rgba(11,11,18,.08)',
              }}
            >
              <div
                className="hidden md:flex"
                style={{
                  padding: '14px 24px',
                  borderBottom: `1px solid ${c.hair}`,
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: c.mute,
                }}
              >
                <span style={{ flex: 1 }}>Item</span>
                <span style={{ width: '100px', textAlign: 'center' }}>Quantity</span>
                <span style={{ width: '100px', textAlign: 'right' }}>Total</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {cart.lines.map((line, idx) => {
                  const variant = line.product.variants.find((v) => v.id === line.variant_id) ?? line.product.variants[0]
                  return (
                    <li
                      key={line.id}
                      className="pulse-cart-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '20px 24px',
                        borderTop: idx === 0 ? 'none' : `1px solid ${c.hair}`,
                      }}
                    >
                      <div
                        style={{
                          width: '88px',
                          height: '108px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          background: isDark ? 'rgba(255,255,255,.08)' : '#f7f8fa',
                          flex: '0 0 88px',
                        }}
                      >
                        { }
                        <img
                          src={line.product.media[0]?.url}
                          alt={line.product.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '15px', fontWeight: 620, color: c.text, margin: 0, letterSpacing: '-0.015em' }}>
                          {line.product.title}
                        </p>
                        <p style={{ fontSize: '12.5px', color: c.mute, margin: '4px 0 10px' }}>
                          Size {variant?.title} · ${variant?.price.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          className="inline-flex items-center"
                          style={{
                            gap: '4px',
                            background: 'transparent',
                            border: 0,
                            color: c.mute,
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          <TrashIcon size={12} /> Remove
                        </button>
                      </div>
                      <div
                        className="inline-flex items-center"
                        style={{
                          gap: '4px',
                          padding: '4px',
                          borderRadius: '8px',
                          background: 'transparent',
                          border: `1px solid ${c.hair}`,
                          width: '100px',
                          justifyContent: 'center',
                          flex: '0 0 100px',
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            width: '26px',
                            height: '26px',
                            border: 0,
                            background: 'transparent',
                            color: c.text,
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span style={{ width: '24px', textAlign: 'center', fontSize: '13.5px', fontWeight: 600 }}>
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          style={{
                            width: '26px',
                            height: '26px',
                            border: 0,
                            background: 'transparent',
                            color: c.text,
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <p
                        style={{
                          width: '100px',
                          textAlign: 'right',
                          fontSize: '15px',
                          fontWeight: 700,
                          color: c.text,
                          margin: 0,
                          flex: '0 0 100px',
                        }}
                      >
                        ${(line.product.price * line.quantity).toFixed(2)}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>

            <aside
              className="pulse-cart-summary"
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: cardBg,
                border: `1px solid ${c.hair}`,
                boxShadow: '0 4px 14px -10px rgba(11,11,18,.08)',
                position: 'sticky',
                top: '110px',
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 680,
                  letterSpacing: '-0.02em',
                  color: c.text,
                  margin: '0 0 18px',
                }}
              >
                Order summary
              </h2>
              <div className="flex flex-col" style={{ gap: '10px', fontSize: '14px', marginBottom: '18px' }}>
                <div className="flex justify-between">
                  <span style={{ color: c.mute }}>Subtotal</span>
                  <span style={{ color: c.text, fontWeight: 600 }}>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: c.mute }}>Tax (est.)</span>
                  <span style={{ color: c.text, fontWeight: 600 }}>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: c.mute }}>Shipping</span>
                  <span style={{ color: c.text, fontWeight: 600 }}>Free</span>
                </div>
              </div>
              <div
                className="flex justify-between items-baseline"
                style={{ padding: '14px 0', borderTop: `1px solid ${c.hair}`, borderBottom: `1px solid ${c.hair}`, marginBottom: '18px' }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: c.text }}>Total</span>
                <span style={{ fontSize: '22px', fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              {showPromo && (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex"
                  style={{ gap: '8px', marginBottom: '16px' }}
                >
                  <input
                    type="text"
                    placeholder="Promo code"
                    style={{
                      flex: 1,
                      height: '40px',
                      padding: '0 12px',
                      borderRadius: '10px',
                      background: isDark ? 'rgba(255,255,255,.06)' : '#f7f8fa',
                      border: `1px solid ${c.hair}`,
                      outline: 'none',
                      fontSize: '13.5px',
                      color: c.text,
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      height: '40px',
                      padding: '0 16px',
                      borderRadius: '10px',
                      background: 'transparent',
                      color: c.text,
                      fontSize: '13px',
                      fontWeight: 600,
                      border: `1px solid ${c.hair}`,
                      cursor: 'pointer',
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}

              <button
                type="button"
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '12px',
                  background: isDark ? '#ffffff' : '#0b0b12',
                  color: isDark ? '#0b0b12' : '#ffffff',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: 0,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(11,11,18,.18), inset 0 1px 0 rgba(255,255,255,.12)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <LockIcon size={14} /> {checkoutLabel}
              </button>
              {shippingNote && (
                <p style={{ fontSize: '12px', color: c.mute, textAlign: 'center', margin: '12px 0 0' }}>{shippingNote}</p>
              )}
            </aside>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 880px) {
          [data-section-id="${section.id}"] .pulse-cart-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .pulse-cart-summary { position: static !important; }
          [data-section-id="${section.id}"] .pulse-cart-row { flex-wrap: wrap !important; }
        }
      `}</style>
    </section>
  )
}
