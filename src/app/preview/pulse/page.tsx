'use client'

import { useReveal } from '@/components/templates/aurora/use-reveal'
import { Magnetic } from '@/components/templates/aurora/magnetic'
import {
  ArrowRight, Check, Zap, Workflow, BarChart3, Shield, Boxes, GitBranch, Bell, Sparkles,
} from 'lucide-react'

const features = [
  { icon: Workflow, h: 'Visual workflows', p: 'Design and automate any process with a drag-and-drop builder — no code required.' },
  { icon: BarChart3, h: 'Live analytics', p: 'Real-time dashboards that turn raw activity into decisions your team can act on.' },
  { icon: GitBranch, h: 'Native integrations', p: 'Connect the 100+ tools you already use in a click. Two-way sync, always on.' },
  { icon: Shield, h: 'Enterprise security', p: 'SOC 2 Type II, SSO/SAML, and granular roles — secure by default.' },
  { icon: Boxes, h: 'Unlimited workspaces', p: 'Spin up a space for every team, client, or project with shared context.' },
  { icon: Bell, h: 'Smart alerts', p: 'Get notified the moment something needs you — never a second sooner.' },
]

const tiers = [
  { plan: 'Starter', amt: '$0', per: '/mo', desc: 'For individuals getting started.', feats: ['Up to 3 projects', 'Community support', '1 GB storage'], cta: 'Start free', feat: false },
  { plan: 'Pro', amt: '$20', per: '/mo', desc: 'For growing teams that ship fast.', feats: ['Unlimited projects', 'Live analytics', 'Priority support', '100 GB storage'], cta: 'Start free trial', feat: true },
  { plan: 'Scale', amt: '$60', per: '/mo', desc: 'For organizations at scale.', feats: ['Everything in Pro', 'SSO & SAML', 'Audit logs', 'Dedicated CSM'], cta: 'Contact sales', feat: false },
]

const quotes = [
  { q: 'Pulse replaced four tools for us. Our cycle time dropped 40% in the first month.', n: 'Lena Park', r: 'VP Eng, Northwind' },
  { q: 'The cleanest product analytics I’ve used. Onboarding took ten minutes.', n: 'Marcus Hale', r: 'Founder, Vela' },
  { q: 'Finally a platform our whole company actually wants to use.', n: 'Priya Raman', r: 'COO, Loop' },
  { q: 'We shipped our roadmap a quarter early. Pulse paid for itself instantly.', n: 'Tom Becker', r: 'PM, Cartwheel' },
  { q: 'Support is unreal, and the API is a joy. Rare combination.', n: 'Sofia Ruiz', r: 'CTO, Mast' },
  { q: 'The dashboards alone changed how our leadership makes decisions.', n: 'Dan Whitfield', r: 'Head of Ops, Beacon' },
]

export default function PulseHome() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="p-hero p-container">
        <div className="p-hero-grid" />
        <div className="p-hero-glow" />
        <span className="p-pill"><span className="tag">NEW</span> Pulse v2 is here — <b>see what’s new</b></span>
        <h1 className="p-h1">
          <span className="p-mask"><span>Ship <em className="p-grad" style={{ fontStyle: 'normal' }}>faster</em></span></span>{' '}
          <span className="p-mask"><span>than ever.</span></span>
        </h1>
        <p className="p-lede">The all-in-one platform for modern teams to plan, build, and launch — with the speed your roadmap deserves.</p>
        <div className="p-hero-cta">
          <Magnetic><a className="p-btn p-btn-primary p-btn-lg" href="#" data-cursor>Start for free <ArrowRight size={16} /></a></Magnetic>
          <Magnetic><a className="p-btn p-btn-ghost p-btn-lg" href="#" data-cursor>Book a demo</a></Magnetic>
        </div>
        <p className="p-hero-note">No credit card required · Free 30-day trial · Cancel anytime</p>

        {/* App mockup */}
        <div className="p-shot" data-reveal>
          <div className="p-shot-bar">
            <span className="dot" style={{ background: '#ff5f57' }} /><span className="dot" style={{ background: '#febc2e' }} /><span className="dot" style={{ background: '#28c840' }} />
          </div>
          <div className="p-shot-body">
            <div className="p-shot-side">
              <div className="row on" /><div className="row" /><div className="row" /><div className="row" /><div className="row" /><div className="row" />
            </div>
            <div className="p-shot-main">
              <div className="p-shot-cards">
                <div className="p-shot-card"><div className="k">Active users</div><div className="v">24.8k</div></div>
                <div className="p-shot-card"><div className="k">Revenue</div><div className="v">$182k</div></div>
                <div className="p-shot-card"><div className="k">Conversion</div><div className="v">4.7%</div></div>
              </div>
              <div className="p-shot-chart">
                <svg viewBox="0 0 600 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,140 C80,120 120,60 200,70 C280,80 320,30 400,40 C480,50 540,20 600,25 L600,180 L0,180 Z" fill="url(#pg)" />
                  <path d="M0,140 C80,120 120,60 200,70 C280,80 320,30 400,40 C480,50 540,20 600,25" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="p-logos">
        <div className="p-container">
          <p>Trusted by fast-moving teams at</p>
          <div className="p-logos-row">
            {['Northwind', 'Vela', 'Loop', 'Cartwheel', 'Mast', 'Beacon'].map((l) => <span className="logo" key={l}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="p-section p-container">
        <div className="p-head">
          <span className="p-eyebrow"><Sparkles size={14} /> Everything you need</span>
          <h2 className="p-h2"><span className="p-mask"><span>One platform.</span></span> <span className="p-mask"><span>Every workflow.</span></span></h2>
          <p className="p-lede">Replace a dozen disconnected tools with a single source of truth your whole team will love.</p>
        </div>
        <div className="p-features" data-reveal-stagger>
          {features.map((f) => (
            <div className="p-feature" key={f.h}>
              <div className="p-feature-ico"><f.icon size={20} /></div>
              <h3>{f.h}</h3><p>{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT */}
      <section className="p-section p-container">
        <div className="p-split">
          <div className="p-split-media" data-reveal>
            <div className="panel" style={{ inset: '14% 18% 36% 10%' }} />
            <div className="panel" style={{ inset: '44% 8% 12% 30%' }} />
          </div>
          <div>
            <span className="p-eyebrow"><Workflow size={14} /> Built for momentum</span>
            <h2 className="p-h2" style={{ marginTop: 14 }}>Automate the busywork, keep the focus.</h2>
            <p className="p-lede" style={{ marginTop: 16 }}>Pulse handles the handoffs, reminders, and reporting so your team can spend time on the work that matters.</p>
            <div className="p-check" data-reveal-stagger>
              {[
                { h: 'Triggers & automations', p: 'If-this-then-that flows across every tool you use.' },
                { h: 'Real-time collaboration', p: 'Comments, mentions, and presence baked into everything.' },
                { h: 'One-click reporting', p: 'Share live dashboards with a link — always up to date.' },
              ].map((c) => (
                <div className="p-check-item" key={c.h}>
                  <span className="p-check-ico"><Check size={13} /></span>
                  <div><h4>{c.h}</h4><p>{c.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="p-section p-container">
        <div className="p-stats" data-reveal-stagger>
          {[{ n: '40%', l: 'Faster cycle time' }, { n: '12k+', l: 'Teams onboarded' }, { n: '99.99%', l: 'Uptime SLA' }, { n: '4.9/5', l: 'Average rating' }].map((s) => (
            <div className="p-stat" key={s.l}><div className="num">{s.n}</div><div className="lbl">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="p-section p-container">
        <div className="p-head">
          <span className="p-eyebrow"><BarChart3 size={14} /> Simple pricing</span>
          <h2 className="p-h2">Plans that scale with you.</h2>
          <p className="p-lede">Start free. Upgrade when you’re ready. No surprises.</p>
        </div>
        <div className="p-prices" data-reveal-stagger>
          {tiers.map((t) => (
            <div className={`p-price ${t.feat ? 'feat' : ''}`} key={t.plan}>
              <div className="plan">{t.plan}</div>
              <div className="amt">{t.amt}<span>{t.per}</span></div>
              <div className="desc">{t.desc}</div>
              <ul>{t.feats.map((f) => <li key={f}><Check size={16} /> {f}</li>)}</ul>
              <a className={`p-btn ${t.feat ? 'p-btn-primary' : 'p-btn-ghost'}`} href="#" data-cursor>{t.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="p-section p-container">
        <div className="p-head">
          <span className="p-eyebrow"><Zap size={14} fill="currentColor" /> Loved by teams</span>
          <h2 className="p-h2">Don’t take our word for it.</h2>
        </div>
        <div className="p-quotes" data-reveal-stagger>
          {quotes.map((q) => (
            <div className="p-quote" key={q.n}>
              <p>“{q.q}”</p>
              <div className="p-quote-by"><span className="p-quote-av" /><div><strong>{q.n}</strong><span>{q.r}</span></div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="p-section p-container">
        <div className="p-cta">
          <div className="p-cta-glow" />
          <div className="p-cta-inner">
            <h2 className="p-h2"><span className="p-mask"><span>Ready to move faster?</span></span></h2>
            <p className="p-lede">Join 12,000+ teams shipping better work with Pulse. Free for 30 days.</p>
            <div className="p-cta-actions">
              <Magnetic><a className="p-btn p-btn-primary p-btn-lg" href="#" data-cursor>Get started free <ArrowRight size={16} /></a></Magnetic>
              <a className="p-btn p-btn-ghost p-btn-lg" href="#" data-cursor>Talk to sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
