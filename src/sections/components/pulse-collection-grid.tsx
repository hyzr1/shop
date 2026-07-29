'use client'
import { useState } from 'react'
import type { Section } from '@/sections/types'
import { getScheme } from '@/sections/lib/scheme'
import { containerMaxWidth } from '@/sections/lib/layout'
import { usePageContext } from '@/sections/wrappers/context'

function FilterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function ChevronDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function PulseCollectionGridSection({ section }: { section: Section }) {
  const s = section.settings
  const c = getScheme(s.color_scheme)
  const isDark = (s.color_scheme as string) === 'scheme_2'

  const columnsRaw = (s.columns as number | string) ?? 4
  const columns = typeof columnsRaw === 'string' ? parseInt(columnsRaw, 10) : columnsRaw
  const cardStyle = (s.card_style as string) ?? 'soft'
  const showFilters = (s.show_filters as boolean) ?? true
  const showCount = (s.show_count as boolean) ?? true
  const maxW = containerMaxWidth(s.container_width)

  const { collection } = usePageContext()
  const [sort, setSort] = useState('featured')

  if (!collection) return null

  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff'
  const accent = isDark ? '#a5b4fc' : '#6366f1'

  return (
    <section
      data-section-id={section.id}
      data-section-type="pulse-collection-grid"
      style={{
        background: c.background,
        color: c.text,
        paddingTop: 'clamp(16px, 3vw, 36px)',
        paddingBottom: 'clamp(72px, 9vw, 130px)',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        {(showFilters || showCount) && (
          <div
            className="flex flex-wrap items-center pulse-cg-toolbar"
            style={{
              gap: '12px',
              padding: '14px 16px',
              marginBottom: 'clamp(24px, 3vw, 36px)',
              borderRadius: '14px',
              background: cardBg,
              border: `1px solid ${c.hair}`,
              boxShadow: '0 4px 14px -10px rgba(11,11,18,.08)',
            }}
          >
            {showCount && (
              <p style={{ fontSize: '13.5px', fontWeight: 600, color: c.text, margin: 0 }}>
                <span style={{ color: c.text }}>{collection.products.length}</span>
                <span style={{ color: c.mute, fontWeight: 400, marginLeft: '4px' }}>
                  result{collection.products.length === 1 ? '' : 's'}
                </span>
              </p>
            )}
            {showFilters && (
              <div className="flex flex-wrap items-center pulse-cg-filters" style={{ gap: '8px', marginLeft: 'auto' }}>
                {['All', 'New', 'Best sellers', 'Sale'].map((f, i) => (
                  <button
                    key={f}
                    type="button"
                    style={{
                      height: '34px',
                      padding: '0 14px',
                      borderRadius: '9px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      background: i === 0 ? (isDark ? 'rgba(165,180,252,.15)' : '#eef0ff') : 'transparent',
                      color: i === 0 ? accent : c.text,
                      border: `1px solid ${i === 0 ? accent : c.hair}`,
                    }}
                  >
                    {f}
                  </button>
                ))}
                <div
                  className="inline-flex items-center"
                  style={{
                    gap: '6px',
                    height: '34px',
                    padding: '0 12px',
                    borderRadius: '9px',
                    border: `1px solid ${c.hair}`,
                    background: 'transparent',
                  }}
                >
                  <FilterIcon size={13} />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 0,
                      outline: 'none',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: c.text,
                      cursor: 'pointer',
                    }}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                  </select>
                  <ChevronDown size={12} />
                </div>
              </div>
            )}
          </div>
        )}

        <div
          className="pulse-cg-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 'clamp(16px, 1.6vw, 22px)',
          }}
        >
          {collection.products.map((p) => (
            <a
              key={p.id}
              href={`/products/${p.handle}`}
              className="pulse-cg-card"
              style={{
                display: 'block',
                background: cardStyle === 'card' ? cardBg : 'transparent',
                borderRadius: '16px',
                padding: cardStyle === 'card' ? '10px' : 0,
                border: cardStyle === 'card' ? `1px solid ${c.hair}` : 'none',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform .35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow .35s',
                boxShadow: cardStyle === 'card' ? '0 1px 2px rgba(11,11,18,.04)' : 'none',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  borderRadius: cardStyle === 'card' ? '10px' : '14px',
                  overflow: 'hidden',
                  background: cardBg,
                  border: cardStyle === 'card' ? 'none' : `1px solid ${c.hair}`,
                }}
              >
                { }
                <img
                  src={p.media[0]?.url}
                  alt={p.media[0]?.alt ?? p.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .55s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
              <div style={{ padding: cardStyle === 'card' ? '14px 6px 6px' : '14px 0 0' }}>
                <div className="flex items-start justify-between" style={{ gap: '10px' }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '15px',
                      fontWeight: 620,
                      letterSpacing: '-0.015em',
                      color: c.text,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </h3>
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: accent, whiteSpace: 'nowrap' }}>
                    ${p.price.toFixed(2)}
                  </span>
                </div>
                {p.variants[0] && (
                  <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: c.mute }}>
                    {p.variants.length} option{p.variants.length === 1 ? '' : 's'}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>

        {collection.products.length === 0 && (
          <div
            className="text-center"
            style={{
              padding: '64px 20px',
              borderRadius: '16px',
              border: `1px dashed ${c.hair}`,
              color: c.mute,
            }}
          >
            <p style={{ fontSize: '14px', margin: 0 }}>No products found.</p>
          </div>
        )}
      </div>

      <style>{`
        [data-section-id="${section.id}"] .pulse-cg-card:hover { transform: translateY(-4px); }
        [data-section-id="${section.id}"] .pulse-cg-card:hover img { transform: scale(1.05); }
        @media (max-width: 1000px) {
          [data-section-id="${section.id}"] .pulse-cg-grid { grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr) !important; }
        }
        @media (max-width: 720px) {
          [data-section-id="${section.id}"] .pulse-cg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          [data-section-id="${section.id}"] .pulse-cg-toolbar { flex-direction: column; align-items: stretch !important; }
          [data-section-id="${section.id}"] .pulse-cg-filters { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  )
}
