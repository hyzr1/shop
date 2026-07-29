'use client'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

function BagIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export function OleaCartSection({ section }: { section: Section }) {
  const s = section.settings
  const heading = (s.heading as string) ?? 'Your apothecary'
  const continueLabel = (s.continue_label as string) ?? 'Continue browsing'
  const continueUrl = (s.continue_url as string) ?? '/collections/all'
  const checkoutLabel = (s.checkout_label as string) ?? 'Proceed to checkout'
  const noteIndex = (s.note_index as string) ?? 'A note'
  const noteText = (s.note_text as string) ?? 'Each order is hand-wrapped in linen-blend paper and tied with a sprig of dried olive.'
  const bg = (s.background_color as string) ?? '#f4efe5'
  const italicColor = (s.italic_color as string) ?? '#695036'
  const lineColor = 'rgba(28,32,25,.18)'
  const ink = '#1c2019'
  const mute = '#68675f'

  const { cart } = usePageContext()
  if (!cart) return null

  const tax = cart.subtotal * 0.08
  const total = cart.subtotal + tax
  const isEmpty = cart.lines.length === 0

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-cart"
      style={{
        background: bg,
        color: ink,
        padding: '90px 5.5vw 130px',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div className="flex flex-wrap items-end" style={{ gap: '14px 30px', marginBottom: '50px' }}>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
            fontWeight: 500,
            letterSpacing: '-0.05em',
            fontSize: 'clamp(56px, 6vw, 96px)',
            lineHeight: 0.85,
          }}
        >
          {heading.split(' ')[0]}{' '}
          <em style={{ color: italicColor, fontWeight: 400 }}>
            {heading.split(' ').slice(1).join(' ') || heading}
          </em>
        </h1>
        <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b826f' }}>
          {cart.lines.length} formula{cart.lines.length === 1 ? '' : 's'} held
        </span>
        <a
          href={continueUrl}
          style={{
            marginLeft: 'auto',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: ink,
            textDecoration: 'none',
            borderBottom: `1px solid ${ink}`,
            paddingBottom: '4px',
          }}
        >
          {continueLabel}
        </a>
      </div>

      {isEmpty ? (
        <div
          style={{
            padding: '90px 30px',
            textAlign: 'center',
            border: `1px solid ${lineColor}`,
          }}
        >
          <p
            style={{
              margin: 0,
              font: 'italic 28px var(--olea-serif, "Cormorant Garamond", serif)',
              color: italicColor,
            }}
          >
            The shelves are empty.
          </p>
          <p style={{ margin: '12px 0 28px', color: mute, fontSize: '13px', lineHeight: 1.7 }}>
            When something speaks to you, it will land here.
          </p>
          <a
            href={continueUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 28px',
              background: '#ded4c2',
              color: '#252b20',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <BagIcon size={14} /> Browse formulas
          </a>
        </div>
      ) : (
        <div
          className="olea-cart-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: '6vw',
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr 110px 90px',
                gap: '20px',
                paddingBottom: '14px',
                borderBottom: `1px solid ${lineColor}`,
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8b826f',
              }}
            >
              <span></span>
              <span>Formula</span>
              <span style={{ textAlign: 'center' }}>Quantity</span>
              <span style={{ textAlign: 'right' }}>Total</span>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {cart.lines.map((line) => {
                const v = line.product.variants.find((x) => x.id === line.variant_id) ?? line.product.variants[0]
                return (
                  <li
                    key={line.id}
                    className="olea-cart-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr 110px 90px',
                      gap: '20px',
                      alignItems: 'center',
                      padding: '28px 0',
                      borderBottom: `1px solid ${lineColor}`,
                    }}
                  >
                    <div
                      style={{
                        width: '90px',
                        height: '110px',
                        overflow: 'hidden',
                        background: 'linear-gradient(145deg,#d8d7c4,#f0eee3)',
                      }}
                    >
                      { }
                      <img
                        src={line.product.media[0]?.url}
                        alt={line.product.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          font: '500 22px var(--olea-serif, "Cormorant Garamond", serif)',
                          letterSpacing: '-0.02em',
                          color: ink,
                        }}
                      >
                        {line.product.title}
                      </h3>
                      <p
                        style={{
                          margin: '6px 0 12px',
                          color: '#8b826f',
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
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
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#77776d',
                          borderBottom: '1px solid #b9b1a0',
                          paddingBottom: '2px',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div
                      className="inline-flex items-center"
                      style={{
                        border: `1px solid ${lineColor}`,
                        justifySelf: 'center',
                      }}
                    >
                      <button
                        type="button"
                        style={{ width: '34px', height: '36px', background: 'transparent', border: 0, color: ink, cursor: 'pointer', fontSize: '14px' }}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span style={{ width: '36px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{line.quantity}</span>
                      <button
                        type="button"
                        style={{ width: '34px', height: '36px', background: 'transparent', border: 0, color: ink, cursor: 'pointer', fontSize: '14px' }}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        textAlign: 'right',
                        fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
                        fontSize: '20px',
                        fontWeight: 500,
                        color: ink,
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
            className="olea-cart-summary"
            style={{
              padding: '32px',
              background: '#3e2d24',
              color: '#f0e8dc',
              position: 'sticky',
              top: '120px',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '9px',
                fontWeight: 650,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#c7b6a4',
                marginBottom: '14px',
              }}
            >
              Order summary
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
                fontWeight: 500,
                fontSize: '32px',
                letterSpacing: '-0.03em',
                color: '#f0e8dc',
              }}
            >
              ${total.toFixed(2)}
            </h2>
            <div
              className="flex flex-col"
              style={{
                gap: '10px',
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,.22)',
                fontSize: '12px',
                lineHeight: 1.6,
              }}
            >
              <div className="flex justify-between">
                <span style={{ color: 'rgba(240,232,220,.7)' }}>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(240,232,220,.7)' }}>Tax (est.)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(240,232,220,.7)' }}>Shipping</span>
                <span>Complimentary</span>
              </div>
            </div>
            <button
              type="button"
              style={{
                width: '100%',
                marginTop: '28px',
                padding: '18px 22px',
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
              }}
            >
              {checkoutLabel}
            </button>
            {(noteIndex || noteText) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: '14px',
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,.22)',
                }}
              >
                <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c7b6a4' }}>
                  {noteIndex}
                </span>
                <p style={{ margin: 0, font: 'italic 14px var(--olea-serif, "Cormorant Garamond", serif)', lineHeight: 1.5, color: '#f0e8dc' }}>
                  {noteText}
                </p>
              </div>
            )}
          </aside>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .olea-cart-grid { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .olea-cart-summary { position: static !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 70px 6vw 90px !important; }
          [data-section-id="${section.id}"] h1 { font-size: 56px !important; }
          [data-section-id="${section.id}"] .olea-cart-row { grid-template-columns: 64px 1fr !important; row-gap: 14px; }
          [data-section-id="${section.id}"] .olea-cart-row > div:nth-child(3),
          [data-section-id="${section.id}"] .olea-cart-row > p { grid-column: 2 !important; text-align: left !important; justify-self: start !important; }
        }
      `}</style>
    </section>
  )
}
