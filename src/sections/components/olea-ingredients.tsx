'use client'
import type { Section } from '@/sections/types'

// Renders one of four abstract ingredient art compositions.
// Each style mirrors the original .ing-1/.ing-2/.ing-3/.ing-4 from olea.css.
function IngredientArt({ style }: { style: string }) {
  const bg =
    style === 'leaf' ? '#b8b49c'
    : style === 'circle' ? '#c7a784'
    : style === 'seed' ? '#b69487'
    : style === 'water' ? '#b6c0b9'
    : '#b8b49c'

  let shapes: React.ReactNode = null
  if (style === 'leaf') {
    // Two leaf shapes + a round seed (original .ing-1)
    shapes = (
      <>
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '55px',
            height: '170px',
            left: '35%',
            top: '35px',
            background: '#5f684e',
            borderRadius: '60% 5% 60% 5%',
            transform: 'rotate(35deg)',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '38px',
            height: '120px',
            left: '55%',
            top: '70px',
            background: '#5f684e',
            borderRadius: '60% 5% 60% 5%',
            transform: 'rotate(-20deg)',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '90px',
            height: '90px',
            left: '28%',
            top: '85px',
            background: '#7b5943',
            borderRadius: '50%',
          }}
        />
      </>
    )
  } else if (style === 'circle') {
    // Three brown circles (original .ing-2)
    shapes = (
      <>
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '55px',
            height: '170px',
            left: '35%',
            top: '35px',
            background: '#76513b',
            borderRadius: '50%',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '38px',
            height: '120px',
            left: '55%',
            top: '70px',
            background: '#76513b',
            borderRadius: '50%',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '90px',
            height: '90px',
            left: '28%',
            top: '85px',
            background: '#76513b',
            borderRadius: '50%',
          }}
        />
      </>
    )
  } else if (style === 'seed') {
    // Burgundy seed leaf-like shapes (original .ing-3)
    shapes = (
      <>
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '55px',
            height: '170px',
            left: '35%',
            top: '35px',
            background: '#873f3c',
            borderRadius: '60% 5% 60% 5%',
            transform: 'rotate(35deg)',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '38px',
            height: '120px',
            left: '55%',
            top: '70px',
            background: '#873f3c',
            borderRadius: '60% 5% 60% 5%',
            transform: 'rotate(-20deg)',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '90px',
            height: '90px',
            left: '28%',
            top: '85px',
            background: '#873f3c',
            borderRadius: '60% 5% 60% 5%',
          }}
        />
      </>
    )
  } else if (style === 'water') {
    // Translucent water droplets (original .ing-4)
    shapes = (
      <>
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '55px',
            height: '170px',
            left: '35%',
            top: '35px',
            background: 'rgba(235,244,237,.55)',
            border: '1px solid white',
            borderRadius: '60% 5% 60% 5%',
            transform: 'rotate(35deg)',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '38px',
            height: '120px',
            left: '55%',
            top: '70px',
            background: 'rgba(235,244,237,.55)',
            border: '1px solid white',
            borderRadius: '60% 5% 60% 5%',
            transform: 'rotate(-20deg)',
          }}
        />
        <i
          style={{
            position: 'absolute',
            display: 'block',
            width: '90px',
            height: '90px',
            left: '28%',
            top: '85px',
            background: 'rgba(235,244,237,.55)',
            border: '1px solid white',
            borderRadius: '50%',
          }}
        />
      </>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '250px',
        overflow: 'hidden',
        marginBottom: '18px',
        background: bg,
      }}
    >
      {shapes}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 65% 35%, rgba(255,255,255,.6), transparent 22%)',
        }}
      />
    </div>
  )
}

export function OleaIngredientsSection({ section }: { section: Section }) {
  const s = section.settings
  const eyebrow = (s.eyebrow as string) ?? 'Ingredient index'
  const heading = (s.heading as string) ?? 'Grown with a reason.'
  const lede = (s.lede as string) ?? 'Every ingredient earns its place through efficacy, origin, and how it feels on the skin.'
  const bg = (s.background_color as string) ?? '#f5f0e7'
  const line = 'rgba(28,32,25,.18)'

  const items = section.blocks.filter((b) => b.type === 'ingredient')

  return (
    <section
      data-section-id={section.id}
      data-section-type="olea-ingredients"
      className="olea-ingredients-root"
      style={{
        padding: '125px 4vw',
        background: bg,
        color: '#1c2019',
        fontFamily: 'var(--olea-sans, Manrope, sans-serif)',
      }}
    >
      <div
        className="olea-section-head"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: '4vw',
        }}
      >
        <div>
          {eyebrow && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#6e745f',
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
                margin: '14px 0 0',
                fontFamily: 'var(--olea-serif, "Cormorant Garamond", serif)',
                fontWeight: 500,
                letterSpacing: '-0.05em',
                fontSize: 'clamp(48px, 5vw, 76px)',
                lineHeight: 0.95,
              }}
            >
              {heading}
            </h2>
          )}
        </div>
        {lede && (
          <p
            style={{
              maxWidth: '380px',
              margin: 0,
              color: '#77766d',
              fontSize: '12px',
              lineHeight: 1.7,
            }}
          >
            {lede}
          </p>
        )}
      </div>

      <div
        className="olea-ingredient-row"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, 1fr)`,
          gap: '14px',
          marginTop: '55px',
        }}
      >
        {items.map((b, idx) => {
          const number = (b.settings.number as string) ?? String(idx + 1).padStart(2, '0')
          const name = (b.settings.name as string) ?? 'Ingredient'
          const use = (b.settings.use as string) ?? ''
          const origin = (b.settings.origin as string) ?? ''
          const art = (b.settings.art_style as string) ?? 'leaf'
          return (
            <article
              key={b.id}
              style={{
                paddingBottom: '20px',
                borderBottom: `1px solid ${line}`,
              }}
            >
              <IngredientArt style={art} />
              <span style={{ color: '#8b826f', fontSize: '8px' }}>{number}</span>
              <h3
                style={{
                  margin: '10px 0 0',
                  font: '500 23px var(--olea-serif, "Cormorant Garamond", serif)',
                }}
              >
                {name}
              </h3>
              {use && <p style={{ margin: '4px 0', color: '#737169', fontSize: '10px' }}>{use}</p>}
              {origin && (
                <small
                  style={{
                    color: '#9c988c',
                    fontSize: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                  }}
                >
                  {origin}
                </small>
              )}
            </article>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-section-id="${section.id}"] .olea-ingredient-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 620px) {
          [data-section-id="${section.id}"] { padding: 90px 5vw !important; }
          [data-section-id="${section.id}"] .olea-section-head { align-items: start !important; flex-direction: column !important; }
          [data-section-id="${section.id}"] .olea-section-head h2 { font-size: 47px !important; }
          [data-section-id="${section.id}"] .olea-ingredient-row { grid-template-columns: 1fr !important; }
          [data-section-id="${section.id}"] .olea-ingredient-row article > div:first-child { height: 330px !important; }
        }
      `}</style>
    </section>
  )
}
