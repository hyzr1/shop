'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/components/templates/aurora/use-reveal'
import { ProductCard } from '@/components/templates/aurora/product-card'
import { products } from '@/components/templates/aurora/data'

const cats = ['All', 'Knitwear', 'Outerwear', 'Shirting', 'Trousers', 'Accessories']

export default function AuroraProducts() {
  const ref = useReveal<HTMLDivElement>()
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? products : products.filter((p) => p.category === cat)

  return (
    <div ref={ref}>
      <div className="a-page-head a-container">
        <div className="a-crumb" style={{ justifyContent: 'center' }}>
          <Link href="/preview/aurora">Home</Link> <span>/</span> <span>Shop</span>
        </div>
        <h1><span className="a-mask"><span>The <em className="a-display">collection</em></span></span></h1>
        <p className="a-lede">Everything in one place — {products.length} considered pieces, designed to last.</p>
      </div>

      <section className="a-container" style={{ paddingBottom: 'clamp(80px,11vw,160px)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0 48px' }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} data-cursor
              className="a-btn"
              style={{
                padding: '10px 18px', fontSize: 13,
                background: cat === c ? 'var(--ink)' : 'rgba(255,255,255,0.6)',
                color: cat === c ? 'var(--bg)' : 'var(--ink-soft)',
                border: cat === c ? '1px solid var(--ink)' : '1px solid var(--hair)',
              }}>
              {c}
            </button>
          ))}
        </div>
        <div className="a-grid">
          {filtered.map((p) => <ProductCard key={p.handle} product={p} />)}
        </div>
      </section>
    </div>
  )
}
