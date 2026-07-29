import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Asterisk, Braces, CircleDot, Network, Sparkles } from 'lucide-react'

const systems = [
  {
    number: '01',
    title: 'Context that survives the handoff',
    copy: 'Every agent inherits the decisions, constraints, and evidence that came before it.',
    icon: Braces,
  },
  {
    number: '02',
    title: 'Work that routes itself',
    copy: 'Tasks move to the right model, tool, or human based on live confidence and cost.',
    icon: Network,
  },
  {
    number: '03',
    title: 'Quality that improves in public',
    copy: 'Evaluation runs beside production, turning each result into a stronger next attempt.',
    icon: CircleDot,
  },
]

export default function ArborHome() {
  return (
    <main>
      <section className="ar-hero" id="top">
        <Image
          src="/templates/arbor-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="ar-hero-image"
        />
        <div className="ar-hero-shade" />
        <div className="ar-grid" />
        <header className="ar-nav">
          <a className="ar-brand" href="#top" aria-label="Arbor home">
            <Asterisk size={21} strokeWidth={2.4} />
            <span>ARBOR</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#system">System</a>
            <a href="#proof">Proof</a>
            <a href="#research">Research</a>
          </nav>
          <a className="ar-nav-cta" href="#contact">Enter the network <ArrowUpRight size={15} /></a>
        </header>

        <div className="ar-hero-copy">
          <span className="ar-kicker"><i /> Autonomous infrastructure / Release 04</span>
          <h1>
            Intelligence
            <em>that compounds.</em>
          </h1>
          <p>Arbor is the coordination layer for teams building reliable systems of agents, models, tools, and human judgment.</p>
          <div className="ar-actions">
            <a href="#system">Explore the system <ArrowRight size={17} /></a>
            <a href="#research">Read the field notes</a>
          </div>
        </div>

        <div className="ar-hero-status">
          <div>
            <span>Network state</span>
            <strong><i /> Learning</strong>
          </div>
          <div>
            <span>Coordinated runs</span>
            <strong>48.2M</strong>
          </div>
          <div>
            <span>Median handoff</span>
            <strong>83ms</strong>
          </div>
          <div className="ar-wave" aria-hidden><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </section>

      <section className="ar-marquee" aria-label="Platform capabilities">
        <div>
          {['Reason', 'Route', 'Observe', 'Evaluate', 'Remember', 'Improve', 'Reason', 'Route', 'Observe', 'Evaluate'].map((item, index) => (
            <span key={`${item}-${index}`}><Asterisk size={12} /> {item}</span>
          ))}
        </div>
      </section>

      <section className="ar-system" id="system">
        <div className="ar-section-head">
          <span className="ar-eyebrow">01 / The operating model</span>
          <h2>One shared memory.<br /><em>Many ways to think.</em></h2>
          <p>Replace brittle chains of prompts with an adaptive network that understands what changed, why it matters, and who should act next.</p>
        </div>

        <div className="ar-system-grid">
          <div className="ar-orbit-card" aria-label="Animated agent network">
            <div className="ar-orbit ar-orbit-a"><i /><i /><i /></div>
            <div className="ar-orbit ar-orbit-b"><i /><i /></div>
            <div className="ar-core"><Sparkles size={22} /><span>Shared<br />context</span></div>
            <span className="ar-node-label ar-node-one">Planner</span>
            <span className="ar-node-label ar-node-two">Research</span>
            <span className="ar-node-label ar-node-three">Review</span>
            <span className="ar-node-label ar-node-four">Execution</span>
          </div>
          <div className="ar-system-list">
            {systems.map((system) => (
              <article key={system.number}>
                <span>{system.number}</span>
                <system.icon size={20} />
                <div>
                  <h3>{system.title}</h3>
                  <p>{system.copy}</p>
                </div>
                <ArrowUpRight size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ar-proof" id="proof">
        <div className="ar-proof-copy">
          <span className="ar-eyebrow">02 / Evidence, not demos</span>
          <h2>Built for the moment a prototype becomes <em>infrastructure.</em></h2>
          <p>Trace every decision, replay any run, and compare quality across models without rebuilding your stack.</p>
        </div>
        <div className="ar-console">
          <div className="ar-console-top">
            <span>live / production-eval</span>
            <span><i /> healthy</span>
          </div>
          <div className="ar-console-metric">
            <span>Task completion</span>
            <strong>98.7%</strong>
            <small>+12.4% after memory routing</small>
          </div>
          <div className="ar-chart">
            <svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="arFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4f3d" stopOpacity=".36" />
                  <stop offset="100%" stopColor="#ff4f3d" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 155 C70 150 90 115 145 122 C215 130 220 78 285 92 C345 105 370 60 430 67 C500 74 516 25 575 45 C625 61 660 20 700 16 L700 190 L0 190Z" fill="url(#arFill)" />
              <path d="M0 155 C70 150 90 115 145 122 C215 130 220 78 285 92 C345 105 370 60 430 67 C500 74 516 25 575 45 C625 61 660 20 700 16" fill="none" stroke="#ff5a47" strokeWidth="2" />
            </svg>
          </div>
          <div className="ar-console-foot">
            {['Identity resolution', 'Tool selection', 'Policy check', 'Response review'].map((item, index) => (
              <span key={item}><i style={{ animationDelay: `${index * 180}ms` }} /> {item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="ar-research" id="research">
        <div className="ar-research-head">
          <span className="ar-eyebrow">03 / Field notes</span>
          <h2>What we are learning<br />at the edge.</h2>
          <a href="#contact">View all research <ArrowRight size={15} /></a>
        </div>
        <div className="ar-articles">
          {[
            ['04.18.26', 'Why agent memory fails quietly', 'Reliability'],
            ['03.02.26', 'The economics of model routing', 'Infrastructure'],
            ['01.27.26', 'Evaluation should be a living system', 'Research'],
          ].map(([date, title, tag], index) => (
            <a href="#contact" key={title}>
              <span>{date}</span>
              <div className={`ar-article-art art-${index + 1}`}><i /><i /><i /></div>
              <small>{tag}</small>
              <h3>{title}</h3>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>

      <section className="ar-final" id="contact">
        <span className="ar-eyebrow">Private preview / Summer 2026</span>
        <h2>Build something that<br /><em>gets better with use.</em></h2>
        <a href="#top">Request access <ArrowUpRight size={18} /></a>
      </section>

      <footer className="ar-footer">
        <a className="ar-brand" href="#top"><Asterisk size={20} /><span>ARBOR</span></a>
        <p>Adaptive infrastructure for reliable intelligence.</p>
        <span>New York / London / Everywhere</span>
      </footer>
    </main>
  )
}
