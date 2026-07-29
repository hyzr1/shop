'use client'

import Link from 'next/link'
import { useReveal } from '@/components/templates/aurora/use-reveal'
import { Magnetic } from '@/components/templates/aurora/magnetic'
import { ProductCard } from '@/components/templates/aurora/product-card'
import { products, testimonials } from '@/components/templates/aurora/data'
import { ArrowUpRight, Star, Leaf, Truck, ShieldCheck, Asterisk } from 'lucide-react'

const marqueeItems = ['Considered design', 'Natural fibers', 'Made to last', 'Carbon neutral', 'Honest craft']

export default function AuroraHome() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="a-hero">
        <div className="a-hero-grid" />
        <div className="a-hero-glow" />
        <div className="a-container a-hero-inner">
          <div className="a-badge" data-reveal>
            <span className="a-badge-dot" />
            <span className="a-eyebrow">Autumn / Winter · New collection</span>
          </div>
          <h1 className="a-h1">
            <span className="a-mask"><span>The new season,</span></span><br />
            <span className="a-mask"><span><em className="a-display">defined</em> by you.</span></span>
          </h1>
          <p className="a-lede a-hero-sub" data-reveal>
            Considered clothing in natural fibers — designed in studio, made to last,
            and shipped carbon-neutral to your door.
          </p>
          <div className="a-hero-actions">
            <Magnetic><Link href="/preview/aurora/products" className="a-btn a-btn-primary a-btn-lg" data-cursor>
              Shop the collection <ArrowUpRight size={16} />
            </Link></Magnetic>
            <Magnetic><Link href="/preview/aurora/products" className="a-btn a-btn-ghost a-btn-lg" data-cursor>
              Explore lookbook
            </Link></Magnetic>
          </div>

          <div className="a-hero-shots">
            {products.slice(0, 3).map((p) => (
              <div className="a-shot" key={p.handle}>
                <div className={`a-shot-img ${p.img}`} data-parallax />
                <span className="a-shot-tag">{p.category}</span>
                <span className="a-shot-price">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="a-marquee">
        <div className="a-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span className="a-marquee-item" key={i}>{m} <Asterisk size={20} /></span>
          ))}
        </div>
      </div>

      {/* COLLECTION */}
      <section className="a-section a-container">
        <div className="a-head">
          <span className="a-eyebrow" data-reveal>Featured</span>
          <h2 className="a-h2">
            <span className="a-mask"><span>Pieces worth</span></span>{' '}
            <span className="a-mask"><span><em className="a-display">keeping</em>.</span></span>
          </h2>
          <p className="a-lede" data-reveal>A tightly edited selection — each piece designed to earn its place in your wardrobe.</p>
        </div>
        <div className="a-grid">
          {products.map((p) => <ProductCard key={p.handle} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <Magnetic><Link href="/preview/aurora/products" className="a-btn a-btn-ghost a-btn-lg" data-cursor>
            View all products <ArrowUpRight size={16} />
          </Link></Magnetic>
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="a-section a-container">
        <div className="a-split">
          <div className="a-split-media" data-reveal>
            <div className="a-img-1" data-parallax style={{ inset: '-12% 0' }} />
          </div>
          <div>
            <span className="a-eyebrow" data-reveal style={{ display: 'block', marginBottom: 22 }}>Our craft</span>
            <h2 className="a-h2">
              <span className="a-mask"><span>Better made,</span></span><br />
              <span className="a-mask"><span><em className="a-display">by design</em>.</span></span>
            </h2>
            <p className="a-lede" data-reveal style={{ marginTop: 22 }}>
              We work with a small circle of family-run mills to make fewer, better things —
              traceable from fiber to finish.
            </p>
            <div className="a-feat" data-reveal-stagger>
              {[
                { icon: Leaf, h: 'Responsibly sourced', p: 'Organic cotton, traceable merino, and GRS-certified cashmere.' },
                { icon: ShieldCheck, h: 'Built to last', p: 'Reinforced seams and natural fibers that age beautifully.' },
                { icon: Truck, h: 'Carbon-neutral delivery', p: 'Every order ships plastic-free and offset at source.' },
              ].map((f) => (
                <div className="a-feat-item" key={f.h}>
                  <span className="a-feat-ico"><f.icon size={18} /></span>
                  <div><h4>{f.h}</h4><p>{f.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="a-section a-container">
        <div className="a-stats" data-reveal-stagger>
          {[
            { n: '12', s: 'k+', l: 'Happy customers' },
            { n: '98', s: '%', l: 'Would buy again' },
            { n: '40', s: '+', l: 'Countries shipped' },
            { n: '4.9', s: '★', l: 'Average rating' },
          ].map((st) => (
            <div className="a-stat" key={st.l}>
              <div className="a-stat-num">{st.n}<span className="suffix">{st.s}</span></div>
              <div className="a-stat-label">{st.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="a-section a-container">
        <div className="a-head">
          <span className="a-eyebrow" data-reveal>Loved by thousands</span>
          <h2 className="a-h2">
            <span className="a-mask"><span>Words from</span></span>{' '}
            <span className="a-mask"><span>the <em className="a-display">wardrobe</em>.</span></span>
          </h2>
        </div>
        <div className="a-quotes" data-reveal-stagger>
          {testimonials.map((t) => (
            <div className="a-quote" key={t.name}>
              <div className="a-quote-stars">{[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
              <p>“{t.quote}”</p>
              <div className="a-quote-by">
                <span className={`a-quote-av ${t.av}`} />
                <div><strong>{t.name}</strong><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="a-section a-container">
        <div className="a-cta">
          <div className="a-cta-glow" />
          <div className="a-cta-inner">
            <span className="a-eyebrow" data-reveal style={{ color: 'var(--spark)' }}>Join the list</span>
            <h2 className="a-h2" style={{ marginTop: 20 }}>
              <span className="a-mask"><span>Ten percent off</span></span><br />
              <span className="a-mask"><span>your <em className="a-display">first</em> order.</span></span>
            </h2>
            <form className="a-cta-form" onSubmit={(e) => e.preventDefault()} data-reveal>
              <input className="a-cta-input" type="email" placeholder="you@email.com" required />
              <Magnetic><button className="a-btn a-btn-lg" type="submit" data-cursor>Subscribe</button></Magnetic>
            </form>
            <p className="a-cta-note">No spam, just new arrivals and the occasional story. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
