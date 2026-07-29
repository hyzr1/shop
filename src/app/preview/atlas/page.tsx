import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Circle, Compass, Grid3X3, MoveDiagonal2 } from 'lucide-react'

const projects = [
  ['Mesa House', 'Joshua Tree, CA', 'Residential / 2026'],
  ['Courtyard Works', 'Marfa, TX', 'Hospitality / 2025'],
  ['Low Archive', 'Taos, NM', 'Cultural / 2024'],
]

export default function AtlasHome() {
  return (
    <main>
      <aside className="at-rail" aria-label="Project navigation">
        <a href="#top" className="at-brand">ATLAS</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#method">Method</a>
          <a href="#studio">Studio</a>
          <a href="#contact">Contact</a>
        </nav>
        <span>Selected works / 18</span>
      </aside>

      <section className="at-hero" id="top">
        <Image src="/templates/atlas-hero.webp" alt="Desert residence by Atlas Studio" fill priority sizes="100vw" className="at-hero-image" />
        <div className="at-shade" />
        <div className="at-topline">
          <span>Architecture / Interiors / Landscape</span>
          <a href="#contact">Start a project <ArrowUpRight size={14} /></a>
        </div>
        <div className="at-hero-copy">
          <span><Compass size={15} /> Studio for grounded modern spaces</span>
          <h1>Buildings that listen<br />to the land.</h1>
          <p>Atlas designs quiet, exacting places where material, light, and landscape become one continuous experience.</p>
        </div>
        <div className="at-index">
          <span>Current feature</span>
          <strong>Mesa House</strong>
          <p>A desert residence shaped by shade, thermal mass, and the long line of the horizon.</p>
          <a href="#work">View case study <ArrowRight size={15} /></a>
        </div>
      </section>

      <section className="at-work" id="work">
        <div className="at-section-title">
          <span>01 / Selected work</span>
          <h2>Precise forms,<br />quiet materials.</h2>
        </div>
        <div className="at-projects">
          {projects.map(([name, place, type], index) => (
            <article key={name}>
              <div className={`at-project-art at-art-${index + 1}`}>
                <span>0{index + 1}</span>
                <MoveDiagonal2 size={18} />
              </div>
              <div>
                <h3>{name}</h3>
                <p>{place}</p>
              </div>
              <small>{type}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="at-method" id="method">
        <div className="at-method-copy">
          <span>02 / Method</span>
          <h2>We start with forces,<br />not finishes.</h2>
          <p>Sun, wind, slope, access, memory, and maintenance shape the work before style enters the conversation.</p>
        </div>
        <div className="at-method-grid">
          {[
            ['Site readings', 'Environmental constraints become design tools.'],
            ['Material studies', 'Local texture, weathering, and thermal behavior guide the palette.'],
            ['Spatial edits', 'Every line earns its place through use, light, and movement.'],
            ['Long stewardship', 'The building is detailed for the decades after opening day.'],
          ].map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="at-studio" id="studio">
        <div className="at-studio-card">
          <Grid3X3 size={19} />
          <h2>Small studio.<br />Long attention.</h2>
          <p>We take on a limited number of projects each year so senior designers stay close to the work from first walk-through to final detail.</p>
        </div>
        <div className="at-stats">
          {['18 built projects', '6 climate zones', '4 active sites', '0 generic details'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="at-final" id="contact">
        <Circle size={15} fill="currentColor" />
        <h2>Bring us the site.<br />We will find the architecture.</h2>
        <a href="#top">Begin a conversation <ArrowUpRight size={16} /></a>
      </section>
    </main>
  )
}
