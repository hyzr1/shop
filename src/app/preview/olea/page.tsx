import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Leaf, Menu, Search, ShoppingBag, Sparkles } from 'lucide-react'

const products = [
  { name: 'Dawn Recovery Serum', type: 'Renew + restore', price: '$74', tone: 'clear' },
  { name: 'Olive Barrier Cream', type: 'Nourish + protect', price: '$58', tone: 'amber' },
  { name: 'Fig Enzyme Veil', type: 'Refine + soften', price: '$46', tone: 'ivory' },
]

export default function OleaHome() {
  return (
    <main>
      <div className="ol-announce">Complimentary ritual pouch with orders over $90 <ArrowRight size={13} /></div>
      <header className="ol-nav" id="top">
        <a className="ol-brand" href="#top">
          OLÉA
          <small>Botanical skin laboratory</small>
        </a>
        <div className="ol-nav-menu">
          <span>Daily rituals / Made in small batches</span>
          <nav>
            <a href="#shop">Formulas</a>
            <a href="#ritual">Ritual finder</a>
            <a href="#story">Ingredients</a>
            <a href="#journal">Journal</a>
          </nav>
        </div>
        <div className="ol-nav-tools">
          <button type="button" aria-label="Search"><Search size={18} /></button>
          <a className="ol-bag" href="#shop" aria-label="Shopping bag"><ShoppingBag size={17} /> Bag <b>0</b></a>
          <a className="ol-nav-cta" href="#ritual">Find your ritual <ArrowUpRight size={14} /></a>
        </div>
        <button className="ol-menu-btn" type="button" aria-label="Open menu"><Menu size={19} /></button>
      </header>

      <section className="ol-hero">
        <div className="ol-hero-copy">
          <span className="ol-eyebrow"><Leaf size={13} /> Botanical skin rituals</span>
          <h1>Skin, returned<br />to <em>rhythm.</em></h1>
          <p>High-performance formulas rooted in Mediterranean botanicals, made slowly for skin that wants less noise.</p>
          <a href="#shop">Discover the collection <ArrowUpRight size={16} /></a>
          <div className="ol-hero-note">
            <span>01 / 03</span>
            <p>Cold-pressed olive leaf, fermented fig, and mineral-rich spring water.</p>
          </div>
        </div>
        <div className="ol-hero-media">
          <Image src="/templates/olea-hero.webp" alt="Olea botanical skincare collection" fill priority sizes="(max-width: 800px) 100vw, 60vw" />
          <span className="ol-image-caption">The Daily Restoration Ritual</span>
          <div className="ol-image-index"><span /><span className="active" /><span /></div>
        </div>
      </section>

      <section className="ol-values">
        {[
          ['01', 'Potent by nature', 'Clinically considered actives paired with whole-plant extracts.'],
          ['02', 'Made in small batches', 'Fresh formulas, produced close to the ingredients that inspire them.'],
          ['03', 'Designed to return', 'Refillable glass, recyclable aluminum, and nothing ornamental.'],
        ].map(([number, title, copy]) => (
          <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
        ))}
      </section>

      <section className="ol-shop" id="shop">
        <div className="ol-section-head">
          <div><span className="ol-eyebrow">The essentials</span><h2>A ritual for every day.</h2></div>
          <a href="#ritual">Shop all formulas <ArrowRight size={15} /></a>
        </div>
        <div className="ol-products">
          {products.map((product, index) => (
            <article key={product.name}>
              <div className={`ol-product-art ${product.tone}`}>
                <span className="ol-product-number">0{index + 1}</span>
                <div className="ol-bottle">
                  <i />
                  <span>OLÉA<small>{product.type}</small></span>
                </div>
                <button type="button" aria-label={`Add ${product.name} to bag`}><ShoppingBag size={16} /></button>
              </div>
              <div className="ol-product-meta">
                <div><h3>{product.name}</h3><p>{product.type}</p></div>
                <span>{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ol-ritual" id="ritual">
        <div className="ol-ritual-image">
          <Image src="/templates/olea-hero.webp" alt="" fill sizes="50vw" />
          <span>Evening light / olive grove, Puglia</span>
        </div>
        <div className="ol-ritual-copy">
          <span className="ol-eyebrow">The three-minute ritual</span>
          <h2>Care that follows<br />the body&apos;s pace.</h2>
          <p>Warm the serum between your palms. Press, do not rub. Let the formula settle before sealing in moisture.</p>
          <ol>
            <li><span>01</span><div><strong>Prepare</strong><small>Cleanse without stripping the skin&apos;s natural oils.</small></div></li>
            <li><span>02</span><div><strong>Replenish</strong><small>Apply serum while the skin is still lightly damp.</small></div></li>
            <li><span>03</span><div><strong>Protect</strong><small>Finish with a thin veil of barrier cream.</small></div></li>
          </ol>
          <a href="#shop">Build your ritual <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="ol-story" id="story">
        <div className="ol-story-mark"><Leaf size={28} /></div>
        <blockquote>“We make fewer things, with more of what the skin recognizes.”</blockquote>
        <p>OLÉA began between a family olive grove and a formulation studio. We pair inherited plant knowledge with modern skin science, keeping every formula purposeful, traceable, and sensorial.</p>
        <a href="#journal">Read our story <ArrowRight size={14} /></a>
      </section>

      <section className="ol-ingredients">
        <div className="ol-section-head">
          <div><span className="ol-eyebrow">Ingredient index</span><h2>Grown with a reason.</h2></div>
          <p>Every ingredient earns its place through efficacy, origin, and how it feels on the skin.</p>
        </div>
        <div className="ol-ingredient-row">
          {[
            ['Olive leaf', 'Antioxidant support', 'Puglia'],
            ['Fermented fig', 'Gentle renewal', 'Aegean coast'],
            ['Rosehip seed', 'Barrier repair', 'Atlas foothills'],
            ['Mineral water', 'Deep hydration', 'Italian Alps'],
          ].map(([name, use, origin], index) => (
            <article key={name}>
              <div className={`ol-ingredient-art ing-${index + 1}`}><i /><i /><i /></div>
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{use}</p>
              <small>{origin}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="ol-newsletter" id="journal">
        <Sparkles size={20} />
        <span className="ol-eyebrow">Notes from the grove</span>
        <h2>Seasonal rituals,<br />quietly delivered.</h2>
        <form>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="submit">Join the journal <ArrowRight size={15} /></button>
        </form>
      </section>

      <footer className="ol-footer" id="stockists">
        <a className="ol-brand" href="#top">OLÉA</a>
        <p>Botanical skin rituals made between land and laboratory.</p>
        <div><a href="#shop">Shop</a><a href="#story">Story</a><a href="#stockists">Instagram</a></div>
      </footer>
    </main>
  )
}
