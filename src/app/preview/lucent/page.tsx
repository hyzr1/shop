import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Check, Circle, Command, Layers3, Route, Sparkles, WandSparkles } from 'lucide-react'

const workflows = [
  ['01', 'Understand', 'Turn a goal into constraints, milestones, and a live plan.'],
  ['02', 'Compose', 'Assign the best agent, model, and tool for each decision.'],
  ['03', 'Verify', 'Review outputs against your policies before anything ships.'],
  ['04', 'Evolve', 'Learn from every correction and improve the next run.'],
]

export default function LucentHome() {
  return (
    <main>
      <section className="lu-hero" id="top">
        <Image src="/templates/lucent-hero.webp" alt="" fill priority sizes="100vw" className="lu-hero-image" />
        <div className="lu-hero-wash" />
        <header className="lu-nav">
          <a className="lu-brand" href="#top"><span><Command size={16} /></span>LUCENT</a>
          <nav>
            <a href="#platform">Platform</a>
            <a href="#workflow">How it works</a>
            <a href="#security">Security</a>
            <a href="#company">Company</a>
          </nav>
          <div className="lu-nav-actions">
            <a href="#company">Sign in</a>
            <a href="#start">Start building <ArrowUpRight size={14} /></a>
          </div>
        </header>

        <div className="lu-hero-copy">
          <span className="lu-pill"><Sparkles size={13} /> Lucent orchestration cloud is live</span>
          <h1>Build agents<br />that move<br /><em>in concert.</em></h1>
          <p>One visual operating system to compose, supervise, and improve every intelligent workflow in your company.</p>
          <div className="lu-actions">
            <a href="#start">Build your first system <ArrowRight size={16} /></a>
            <a href="#workflow"><span><Circle size={10} fill="currentColor" /></span> Watch how it works</a>
          </div>
        </div>

        <div className="lu-float lu-float-one">
          <span><i /> Finance agent</span>
          <strong>Reconciled 124 invoices</strong>
          <small>2 exceptions routed to Maya</small>
        </div>
        <div className="lu-float lu-float-two">
          <WandSparkles size={16} />
          <span>12 agents collaborating</span>
        </div>
        <div className="lu-float lu-float-three">
          <span>Quality score</span>
          <strong>96.4</strong>
          <i>+8.2 this month</i>
        </div>

        <div className="lu-trust">
          <span>Built for ambitious teams at</span>
          {['Aperture', 'Northstar', 'Quarry', 'Morrow', 'Fieldwork'].map((name) => <b key={name}>{name}</b>)}
        </div>
      </section>

      <section className="lu-platform" id="platform">
        <div className="lu-platform-head">
          <span className="lu-eyebrow">The orchestration layer</span>
          <h2>From one instruction<br />to a complete system.</h2>
          <p>Lucent makes complex work visible. See what every agent knows, why it chose an action, and where a human should step in.</p>
        </div>

        <div className="lu-canvas">
          <div className="lu-canvas-bar">
            <div><i /><i /><i /></div>
            <span>Customer launch / Production</span>
            <b><i /> Running</b>
          </div>
          <div className="lu-flow">
            <svg className="lu-flow-lines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="lucentFlowLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#b1b5ff" />
                  <stop offset="52%" stopColor="#5d5cff" />
                  <stop offset="100%" stopColor="#c9ccda" />
                </linearGradient>
              </defs>
              <path className="lu-connector" d="M207 151 C238 160 250 192 280 201" />
              <path className="lu-connector" d="M436 201 C470 224 474 304 480 331" />
              <path className="lu-connector" d="M636 331 C690 310 660 170 693 166" />
              <path className="lu-connector" d="M772 212 C805 284 790 364 813 400" />
              <circle className="lu-flow-dot dot-a" cx="247" cy="174" r="5" />
              <circle className="lu-flow-dot dot-b" cx="466" cy="268" r="5" />
              <circle className="lu-flow-dot dot-c" cx="670" cy="246" r="5" />
              <circle className="lu-flow-dot dot-d" cx="797" cy="323" r="5" />
            </svg>
            <article className="lu-node node-trigger"><small>TRIGGER</small><strong>New account created</strong><span>CRM event</span></article>
            <article className="lu-node node-plan"><small>STRATEGIST</small><strong>Build launch plan</strong><span><i /> Claude 4.1</span></article>
            <article className="lu-node node-write"><small>WRITER</small><strong>Draft campaign</strong><span><i /> Brand memory</span></article>
            <article className="lu-node node-review"><small>REVIEW</small><strong>Policy and tone check</strong><span><i /> 98% confidence</span></article>
            <article className="lu-node node-send"><small>ACTION</small><strong>Schedule launch</strong><span><i /> 4 channels</span></article>
            <div className="lu-cursor"><span>MK</span><small>Looks good. Ship it.</small></div>
          </div>
          <div className="lu-canvas-stats">
            <span><small>Run time</small><strong>01:42</strong></span>
            <span><small>Tasks complete</small><strong>18 / 18</strong></span>
            <span><small>Human review</small><strong>1 step</strong></span>
            <span><small>Estimated savings</small><strong>6.4 hrs</strong></span>
          </div>
        </div>
      </section>

      <section className="lu-workflow" id="workflow">
        <div className="lu-workflow-copy">
          <span className="lu-eyebrow">A clearer way to automate</span>
          <h2>Give the work a goal.<br />Lucent builds the path.</h2>
          <p>Start with an outcome, not a flowchart. The system plans the work, asks for missing context, and adapts as conditions change.</p>
          <a href="#start">Explore the platform <ArrowRight size={15} /></a>
        </div>
        <div className="lu-workflow-list">
          {workflows.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <ArrowUpRight size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="lu-dark" id="security">
        <div className="lu-dark-head">
          <span className="lu-eyebrow">Control without the drag</span>
          <h2>Fast enough for builders.<br /><em>Serious enough for everyone else.</em></h2>
        </div>
        <div className="lu-dark-grid">
          <article className="lu-dark-wide">
            <div>
              <span className="lu-card-icon"><Route size={19} /></span>
              <h3>Every decision, traceable.</h3>
              <p>Inspect context, model choice, tool calls, and approvals in one timeline.</p>
            </div>
            <div className="lu-trace">
              {['Context loaded', 'Model routed', 'Policy verified', 'Action approved'].map((item, index) => (
                <span key={item}><i style={{ animationDelay: `${index * 240}ms` }}><Check size={11} /></i>{item}<small>00:0{index + 1}</small></span>
              ))}
            </div>
          </article>
          <article>
            <span className="lu-card-icon"><Layers3 size={19} /></span>
            <h3>Your models. Your rules.</h3>
            <p>Route by quality, latency, region, cost, or your own evaluation signals.</p>
            <div className="lu-models"><i>O</i><i>A</i><i>G</i><i>M</i><span>+12</span></div>
          </article>
          <article>
            <span className="lu-card-icon"><Sparkles size={19} /></span>
            <h3>Memory with boundaries.</h3>
            <p>Keep useful context close while enforcing retention and access policies.</p>
            <div className="lu-memory"><i /><i /><i /><i /><i /></div>
          </article>
        </div>
      </section>

      <section className="lu-final" id="start">
        <span className="lu-pill"><i /> Free workspace includes 1,000 actions</span>
        <h2>Make your best process<br />run itself.</h2>
        <p>Start from a template or describe the outcome. Lucent will help you build the rest.</p>
        <a href="#top">Start building for free <ArrowUpRight size={18} /></a>
      </section>

      <footer className="lu-footer" id="company">
        <a className="lu-brand" href="#top"><span><Command size={16} /></span>LUCENT</a>
        <p>The operating system for intelligent work.</p>
        <div><a href="#platform">Product</a><a href="#security">Security</a><a href="#company">Terms</a></div>
      </footer>
    </main>
  )
}
