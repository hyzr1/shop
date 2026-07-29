'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/components/templates/aurora/use-reveal'
import { Magnetic } from '@/components/templates/aurora/magnetic'
import { ProductCard } from '@/components/templates/aurora/product-card'
import { getProduct, products } from '@/components/templates/aurora/data'
import { Heart, Truck, RefreshCw, ShieldCheck, ShoppingBag, Minus, Plus } from 'lucide-react'

const swatchColors = ['#7c5cff', '#0a0a09', '#e6c9a8', '#43b35a']
const sizes = ['XS', 'S', 'M', 'L', 'XL']
const thumbs = ['a-img-1', 'a-img-5', 'a-img-3', 'a-img-2']

export default function AuroraProductDetail({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params)
  const ref = useReveal<HTMLDivElement>()
  const product = getProduct(handle)
  const [activeImg, setActiveImg] = useState(0)
  const [color, setColor] = useState(0)
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(1)
  const related = products.filter((p) => p.handle !== handle).slice(0, 3)

  return (
    <div ref={ref}>
      <section className="a-pd a-container">
        <div className="a-crumb">
          <Link href="/preview/aurora">Home</Link> <span>/</span>
          <Link href="/preview/aurora/products">Shop</Link> <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="a-pd-grid">
          {/* Gallery */}
          <div className="a-pd-gallery" data-reveal>
            <div className="a-pd-main"><div className={thumbs[activeImg]} /></div>
            <div className="a-pd-thumbs">
              {thumbs.map((t, i) => (
                <button key={i} className={`a-pd-thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)} data-cursor>
                  <div className={t} style={{ position: 'absolute', inset: 0 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="a-pd-info">
            <span className="a-eyebrow" data-reveal>{product.category}</span>
            <h1 data-reveal style={{ marginTop: 12 }}>{product.name}</h1>
            <div className="a-pd-price" data-reveal>
              <span className="now">${product.price}</span>
              {product.was && <span className="was">${product.was}</span>}
              {product.was && <span className="save">Save ${product.was - product.price}</span>}
            </div>
            <p className="a-pd-desc" data-reveal>
              A quietly luxurious staple in responsibly-sourced fibers. Cut for a relaxed,
              true-to-size fit with reinforced seams and a hand-finished trim — the kind of
              piece you reach for season after season.
            </p>

            <div className="a-pd-opt" data-reveal>
              <h4>Color</h4>
              <div className="a-pd-swatches">
                {swatchColors.map((c, i) => (
                  <button key={c} className={`a-pd-swatch ${color === i ? 'active' : ''}`} style={{ background: c }} onClick={() => setColor(i)} data-cursor aria-label={`Color ${i + 1}`} />
                ))}
              </div>
            </div>

            <div className="a-pd-opt" data-reveal>
              <h4>Size</h4>
              <div className="a-pd-sizes">
                {sizes.map((s) => (
                  <button key={s} className={`a-pd-size ${size === s ? 'active' : ''}`} onClick={() => setSize(s)} data-cursor>{s}</button>
                ))}
              </div>
            </div>

            <div className="a-pd-buy" data-reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, border: '1px solid var(--hair-strong)', borderRadius: 999, padding: '0 6px' }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} data-cursor style={{ width: 38, height: 46, display: 'grid', placeItems: 'center' }}><Minus size={16} /></button>
                <span style={{ minWidth: 18, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} data-cursor style={{ width: 38, height: 46, display: 'grid', placeItems: 'center' }}><Plus size={16} /></button>
              </div>
              <Magnetic strength={0.2}><button className="a-btn a-btn-primary a-btn-lg" data-cursor><ShoppingBag size={16} /> Add to cart — ${product.price * qty}</button></Magnetic>
              <button className="a-nav-cart" data-cursor aria-label="Save"><Heart size={17} strokeWidth={1.6} /></button>
            </div>

            <div className="a-pd-trust" data-reveal-stagger>
              {[
                { icon: Truck, t: 'Free carbon-neutral shipping over $75' },
                { icon: RefreshCw, t: '30-day easy returns & exchanges' },
                { icon: ShieldCheck, t: '2-year craftsmanship guarantee' },
              ].map((x) => (
                <div className="a-pd-trust-item" key={x.t}><x.icon size={17} /> {x.t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="a-section a-container">
        <div className="a-head">
          <span className="a-eyebrow" data-reveal>You might also like</span>
          <h2 className="a-h2"><span className="a-mask"><span>Complete the <em className="a-display">look</em>.</span></span></h2>
        </div>
        <div className="a-grid">
          {related.map((p) => <ProductCard key={p.handle} product={p} />)}
        </div>
      </section>
    </div>
  )
}
