import Image from 'next/image'
import { ArrowRight, ArrowUpRight, CalendarDays, Menu, Moon, Waves } from 'lucide-react'

export default function HalcyonHome() {
  return (
    <main>
      <section className="ha-hero" id="top">
        <Image src="/templates/halcyon-hero.webp" alt="Remote coastal cabins at Halcyon" fill priority sizes="100vw" className="ha-hero-image" />
        <div className="ha-haze" />
        <header className="ha-nav">
          <a href="#top" className="ha-brand">HALCYON<span>Coastal retreat</span></a>
          <button type="button" aria-label="Open menu"><Menu size={18} /> Menu</button>
        </header>
        <div className="ha-hero-copy">
          <span><Waves size={15} /> North coast / eight cabins</span>
          <h1>Stay where the<br />morning slows.</h1>
          <p>A quiet coastal retreat for sleep, salt air, cold water, and unstructured days.</p>
        </div>
        <form className="ha-booking">
          <label><span>Arrive</span><b>Jun 21</b></label>
          <label><span>Nights</span><b>3</b></label>
          <label><span>Guests</span><b>2</b></label>
          <button type="submit">Check stays <ArrowUpRight size={15} /></button>
        </form>
      </section>

      <section className="ha-rhythm">
        <span>01</span>
        <h2>Ocean, fire, cedar, silence.</h2>
        <p>Everything here is intentionally simple: a warm room, a walking path, a bathhouse facing the weather, and meals that follow the tide.</p>
      </section>

      <section className="ha-grid" id="stays">
        {[
          ['Cabins', 'Eight private timber cabins above the dunes.'],
          ['Bathhouse', 'Hot pools, cold plunge, cedar sauna, open sky.'],
          ['Table', 'Breakfast baskets and slow dinners from local producers.'],
        ].map(([title, copy], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <div className={`ha-card-art ha-art-${index + 1}`}><Moon size={20} /></div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="ha-day">
        <div>
          <span>Suggested day</span>
          <h2>No itinerary.<br />Just a rhythm.</h2>
        </div>
        <ol>
          <li><b>06:40</b><span>Walk the boardwalk before breakfast.</span></li>
          <li><b>09:15</b><span>Sauna, cold water, coffee by the stove.</span></li>
          <li><b>14:00</b><span>Read, nap, or follow the coastal path north.</span></li>
          <li><b>19:30</b><span>Shared table, candlelight, tide report.</span></li>
        </ol>
      </section>

      <section className="ha-final">
        <CalendarDays size={18} />
        <h2>The coast is quiet this week.</h2>
        <a href="#top">Reserve a cabin <ArrowRight size={15} /></a>
      </section>
    </main>
  )
}
