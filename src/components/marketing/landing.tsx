'use client'

import './marketing.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useScrollFx } from './use-scroll-fx'
import { MarketingNav } from './nav'
import { MarketingFooter } from './footer'
import { LiveThumb } from '@/components/dashboard/live-thumb'
import { templates, liveDemo } from '@/lib/templates'
import {
  ArrowRight, ArrowUpRight, ArrowUp, Wand2, Check, Minus, Play,
  Shirt, Rocket, UtensilsCrossed, Palette,
  Puzzle, Globe, Layers, BarChart3, Mail,
  Sparkles, ShoppingBag, CreditCard, TrendingUp, Zap, Image as ImageIcon,
  Headphones, Lock, BadgeCheck, Plus,
} from 'lucide-react'

const suggestions: { label: string; icon: typeof Shirt }[] = [
  { label: 'Online store', icon: Shirt },
  { label: 'Portfolio', icon: Palette },
  { label: 'Restaurant', icon: UtensilsCrossed },
  { label: 'SaaS landing', icon: Rocket },
]

// Invented but plausible brand names (mono / serif mix) for the logo wall
const customerLogos: { name: string; font: 'sans' | 'serif' | 'mono' }[] = [
  { name: 'Nova', font: 'serif' },
  { name: 'ATLAS', font: 'sans' },
  { name: 'tide', font: 'mono' },
  { name: 'Loom & Co.', font: 'serif' },
  { name: 'HELIX', font: 'sans' },
  { name: 'Pace', font: 'serif' },
  { name: 'Sable', font: 'sans' },
  { name: 'wren.', font: 'mono' },
]

const steps = [
  { n: '01', h: 'Describe your brand', p: 'Start from a prompt or pick a template tuned to your field.' },
  { n: '02', h: 'Make it yours', p: 'Customize copy, colors, sections, and plugins in the live editor.' },
  { n: '03', h: 'Publish & grow', p: 'Launch on hyzr.ai instantly. Add a domain and scale anytime.' },
]

const compareRows: { feature: string; hyzr: string | true; generic: string | false; custom: string | false }[] = [
  { feature: 'Time to launch', hyzr: 'Minutes', generic: 'Hours to days', custom: '4–12 weeks' },
  { feature: 'Monthly cost', hyzr: '$20 flat', generic: '$30–$500+', custom: '$2k–$10k+' },
  { feature: 'Designed by AI for your brand', hyzr: true, generic: false, custom: false },
  { feature: 'Hosting & SSL included', hyzr: true, generic: 'Add-on', custom: 'Pay separately' },
  { feature: 'Unlimited edits, instantly', hyzr: true, generic: 'Limited', custom: 'Dev required' },
  { feature: 'Plugin marketplace', hyzr: true, generic: 'Limited', custom: 'Build your own' },
]

const testimonials: { quote: string; name: string; role: string; initials: string; tint: string }[] = [
  {
    quote: 'We launched our entire DTC storefront in a single afternoon. The design quality is genuinely indistinguishable from what we used to pay agencies five figures for.',
    name: 'Maya Lindgren',
    role: 'Founder · Ember & Oak',
    initials: 'ML',
    tint: '#7c5cff',
  },
  {
    quote: 'Hyzr is the first builder where the AI actually understands brand. It nailed our tone on the first try — then let me tweak every pixel without writing code.',
    name: 'Theo Park',
    role: 'Head of Brand · Tide',
    initials: 'TP',
    tint: '#10b981',
  },
  {
    quote: 'We replaced three tools — site builder, host, and analytics — with one Hyzr subscription. Page speeds went up, costs went down, and our team stopped fighting plugins.',
    name: 'Ada Okonkwo',
    role: 'Operator · Helix Studio',
    initials: 'AO',
    tint: '#f59e0b',
  },
]

const trustItems = [
  { ic: TrendingUp, k: '99.99%', v: 'Uptime SLA', d: 'Edge hosting, monitored 24/7.' },
  { ic: Headphones, k: '24/7', v: 'Human support', d: 'Reply times under 2 hours.' },
  { ic: Lock, k: 'SSL', v: 'Included on every site', d: 'Auto-renewed, never expires.' },
  { ic: BadgeCheck, k: '30-day', v: 'Money-back guarantee', d: 'No questions, no fine print.' },
]

const faqs: { q: string; a: string }[] = [
  {
    q: 'Can I use my own domain?',
    a: 'Yes. Every plan supports custom domains with one-click SSL — point your domain at hyzr.ai and we handle the rest in under a minute.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Anytime, with one click. We keep your site live until the end of the current billing period and we never charge cancellation fees.',
  },
  {
    q: 'Do I own my content?',
    a: 'You always own 100% of your content, copy, brand assets, and customer data. Export everything as a static archive whenever you like.',
  },
  {
    q: 'Is hosting included?',
    a: 'Yes — every plan includes global edge hosting, image optimization, a CDN, and SSL. There are no separate hosting bills, ever.',
  },
  {
    q: 'Can I import an existing site?',
    a: 'You can rebuild from a screenshot or URL with Hyzr Build. We are also rolling out a dedicated importer for Shopify and Webflow in 2026.',
  },
  {
    q: 'What if I need help?',
    a: 'Email, chat, and onboarding calls are included. Most questions are answered in under two hours, every day of the week.',
  },
]

export function Landing() {
  const ref = useScrollFx<HTMLDivElement>()
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [hover, setHover] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const liveTemplates = templates.filter((t) => t.live).slice(0, 6)

  function submit(text?: string) {
    const q = (text ?? prompt).trim()
    router.push(`/auth/signup${q ? `?prompt=${encodeURIComponent(q)}` : ''}`)
  }

  return (
    <div className="lp-root" ref={ref}>
      <MarketingNav />

      {/* HERO — more restrained, single accent gradient */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <div className="lp-mesh" />
          <div className="lp-grid" />
        </div>
        <div className="lp-container lp-hero-inner">
          <span className="lp-pill" data-reveal>
            <span className="tag">NEW</span>
            Hyzr Build — free for 30 days
          </span>
          <h1 className="lp-h1">
            <span className="lp-mask"><span>The platform for</span></span><br />
            <span className="lp-mask"><span>every <em className="lp-grad" style={{ fontStyle: 'normal' }}>kind</em> of brand.</span></span>
          </h1>
          <p className="lp-lede" data-reveal>
            Hyzr builds, hosts, and grows your site on your own corner of hyzr.ai.
            A store, a studio, a startup — every starting point is beautiful, every detail is yours.
          </p>

          <div className="lp-hero-actions" data-reveal>
            <Link href="/auth/signup" className="lp-btn lp-btn-primary">
              <span>Start your free trial</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#templates" className="lp-btn lp-btn-ghost lp-btn-watch">
              <span className="lp-btn-play"><Play className="h-3 w-3" fill="currentColor" /></span>
              <span>Watch demo</span>
              <span className="lp-btn-time">2 min</span>
            </a>
          </div>
          <p className="lp-hero-note" data-reveal>
            Free for 30 days · No credit card required · Cancel anytime
          </p>

          <div className="lp-composer" data-reveal>
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit() }}
              placeholder="Or describe what you want to build — e.g. a clean storefront for my candle brand…"
              aria-label="Describe what you want to build"
            />
            <div className="lp-composer-row">
              <span className="lp-composer-chip"><Wand2 className="h-3.5 w-3.5" /> Hyzr Build</span>
              <button className="lp-composer-send" onClick={() => submit()} aria-label="Build with Hyzr">
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="lp-suggest" data-reveal>
            {suggestions.map((s) => (
              <button key={s.label} onClick={() => submit(`A ${s.label.toLowerCase()}`)}>
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER LOGOS — directly under hero, professional trust signal */}
      <section id="customers" className="lp-logos">
        <div className="lp-container">
          <p className="lp-logos-eyebrow" data-reveal>
            Powering brands across every category
            <span className="lp-logos-stat">Trusted by 12,000+ stores</span>
          </p>
          <div className="lp-logos-grid" data-reveal>
            {customerLogos.map((b) => (
              <span key={b.name} className={`lp-logo lp-logo-${b.font}`}>{b.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES — cleaner, larger cards */}
      <section id="templates" className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>The gallery</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>Templates that</span></span>{' '}
            <span className="lp-mask"><span>look <em className="lp-grad" style={{ fontStyle: 'normal' }}>expensive</em>.</span></span>
          </h2>
          <p className="lp-lede" data-reveal>
            Real multi-page sites — hover to scroll through, preview live, then make it yours.
          </p>
        </div>
        <div className="lp-templates" data-reveal-stagger>
          {liveTemplates.map((t) => {
            const demo = liveDemo(t.id)!
            return (
              <Link
                key={t.id}
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-tcard"
                onMouseEnter={() => setHover(t.id)}
                onMouseLeave={() => setHover((c) => (c === t.id ? null : c))}
              >
                <div className="lp-tcard-frame">
                  <LiveThumb src={`${demo}?thumb=1`} ratio={0.625} tour={hover === t.id} />
                  <div className="lp-tcard-overlay">
                    <span className="lp-tcard-pill">
                      View live <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
                <div className="lp-tcard-meta">
                  <p className="lp-tcard-name">{t.name}</p>
                  <p className="lp-tcard-cat">{t.category}</p>
                </div>
                <p className="lp-tcard-tag">{t.tagline}</p>
              </Link>
            )
          })}
        </div>
        <div className="mt-12 text-center" data-reveal>
          <Link href="/dashboard/templates" className="lp-textlink">
            View 12 templates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FEATURES BENTO — simplified to 4 cells */}
      <section id="features" className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>Everything included</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>One subscription.</span></span>{' '}
            <span className="lp-mask"><span>The whole <em className="lp-grad" style={{ fontStyle: 'normal' }}>stack</em>.</span></span>
          </h2>
          <p className="lp-lede" data-reveal>
            No piecing together a builder, host, analytics, and a marketplace. Hyzr is all of them — designed to work together.
          </p>
        </div>
        <div className="lp-bento" data-reveal-stagger>
          {/* Build with AI — hero cell */}
          <div className="lp-cell lp-cell-hero span2 row2">
            <div className="lp-cell-glow" />
            <div className="lp-cell-body">
              <span className="lp-cell-tag"><Sparkles className="h-3.5 w-3.5" /> AI Build</span>
              <h3>Describe it, build it.</h3>
              <p>Tell Hyzr what you want and start from a polished, on-brand site in seconds — then keep chatting to refine every detail.</p>
            </div>
            <div className="lp-cell-stage">
              <div className="lp-chat-window">
                <div className="lp-chat-bar">
                  <span className="d" /><span className="d" /><span className="d" />
                  <span className="lp-chat-bar-title">hyzr · build</span>
                </div>
                <div className="lp-chat-body">
                  <div className="lp-mini-bubble me">Build a candle brand store, warm + minimal</div>
                  <div className="lp-mini-bubble">
                    <span className="lp-ai-dot" /> Done — added hero, product grid, and checkout.
                    <div className="lp-build-preview">
                      <div className="lp-build-card">
                        <div className="lp-build-img" style={{ background: 'linear-gradient(135deg,#f5e6d3,#e8c9a0)' }} />
                        <div className="lp-build-meta"><b>Ember No. 3</b><span>$28</span></div>
                      </div>
                      <div className="lp-build-card">
                        <div className="lp-build-img" style={{ background: 'linear-gradient(135deg,#e8dfd1,#cbb89c)' }} />
                        <div className="lp-build-meta"><b>Hearth</b><span>$32</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="lp-mini-input">Make the buttons rounder…<span className="send"><ArrowUp className="h-3.5 w-3.5" /></span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="lp-cell lp-cell-tint tint-violet">
            <div className="lp-cell-ico"><Layers className="h-5 w-5" /></div>
            <h3>Visual editor, no code.</h3>
            <p>Edit every word, color, and section in a live editor that feels handcrafted.</p>
            <div className="lp-cell-visual lp-theme-stage">
              <div className="lp-theme-preview">
                <div className="lp-theme-hero">
                  <span className="lp-theme-eyebrow">Spring drop</span>
                  <span className="lp-theme-title">Quiet luxe.</span>
                  <span className="lp-theme-btn">Shop now</span>
                </div>
              </div>
              <div className="lp-swatches">
                {['#6366f1', '#ec4899', '#16a34a', '#f59e0b', '#0ea5e9'].map((c, i) => (
                  <span key={c} className={`lp-swatch ${i === 0 ? 'active' : ''}`} style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>

          {/* Domain — moved up to fill the right column under Visual editor */}
          <div className="lp-cell">
            <div className="lp-cell-ico"><Globe className="h-5 w-5" /></div>
            <h3>Live in one click.</h3>
            <p>Go live on yourbrand.hyzr.ai, or connect a custom domain.</p>
            <div className="lp-cell-visual lp-domain-stage">
              <div className="lp-urlbar"><span className="dot" /> <b>yourbrand</b>.hyzr.ai <span className="badge">Live</span></div>
              <div className="lp-domain-rows">
                <span><Check className="h-3 w-3" /> SSL auto-provisioned</span>
                <span><Check className="h-3 w-3" /> Global CDN ready</span>
              </div>
            </div>
          </div>

          {/* Hosting + analytics — wide */}
          <div className="lp-cell lp-cell-dark span2">
            <span className="lp-cell-tag"><TrendingUp className="h-3.5 w-3.5" /> Hosting & analytics</span>
            <h3>Fast, hosted, measured.</h3>
            <p>Global edge hosting, image optimization, and built-in analytics — handled.</p>
            <div className="lp-cell-visual lp-dash">
              <div className="lp-dash-stats">
                <div className="lp-dash-stat">
                  <span className="k">Visitors</span>
                  <span className="v">24,812</span>
                  <span className="d pos">+18.4%</span>
                </div>
                <div className="lp-dash-stat">
                  <span className="k">Revenue</span>
                  <span className="v">$18,204</span>
                  <span className="d pos">+12.1%</span>
                </div>
                <div className="lp-dash-stat">
                  <span className="k">Conv.</span>
                  <span className="v">3.4%</span>
                  <span className="d pos">+0.6pt</span>
                </div>
              </div>
              <svg className="lp-spark" viewBox="0 0 600 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lpspark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,70 C60,64 100,30 170,40 C240,50 280,16 360,22 C440,28 500,8 600,16 L600,90 L0,90 Z" fill="url(#lpspark)" />
                <path d="M0,70 C60,64 100,30 170,40 C240,50 280,16 360,22 C440,28 500,8 600,16" fill="none" stroke="#22c55e" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Plugins */}
          <div className="lp-cell">
            <div className="lp-cell-ico"><Puzzle className="h-5 w-5" /></div>
            <h3>Plugin marketplace.</h3>
            <p>Commerce, payments, forms — one click away.</p>
            <div className="lp-cell-visual lp-plugin-grid">
              {[
                { Ic: ShoppingBag, l: 'Commerce', c: '#10b981' },
                { Ic: CreditCard, l: 'Payments', c: '#6366f1' },
                { Ic: BarChart3, l: 'Analytics', c: '#f59e0b' },
                { Ic: Mail, l: 'Forms', c: '#ec4899' },
                { Ic: Zap, l: 'Automate', c: '#8b5cf6' },
                { Ic: ImageIcon, l: 'Gallery', c: '#0ea5e9' },
              ].map(({ Ic, l, c }) => (
                <span className="lp-plugin-tile" key={l}>
                  <span className="ico" style={{ background: `color-mix(in srgb, ${c} 14%, transparent)`, color: c }}>
                    <Ic className="h-4 w-4" />
                  </span>
                  <b>{l}</b>
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT COMPARES — comparison table */}
      <section className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>How it compares</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>The honest <em className="lp-grad" style={{ fontStyle: 'normal' }}>comparison</em>.</span></span>
          </h2>
          <p className="lp-lede" data-reveal>
            We will not pretend Hyzr is right for everyone — but for most brands, the math is simple.
          </p>
        </div>
        <div className="lp-compare" data-reveal>
          <div className="lp-compare-head">
            <span />
            <span className="lp-compare-col lp-compare-best">
              <b>Hyzr</b>
              <em>Best for most brands</em>
            </span>
            <span className="lp-compare-col">
              <b>Generic builder</b>
              <em>Wix · Squarespace</em>
            </span>
            <span className="lp-compare-col">
              <b>Custom dev</b>
              <em>Agency or freelancer</em>
            </span>
          </div>
          {compareRows.map((r) => (
            <div key={r.feature} className="lp-compare-row">
              <span className="lp-compare-feat">{r.feature}</span>
              <span className="lp-compare-col lp-compare-best">
                {r.hyzr === true ? <Check className="h-4 w-4" /> : <b>{r.hyzr}</b>}
              </span>
              <span className="lp-compare-col">
                {r.generic === false ? <Minus className="h-4 w-4 lp-compare-x" /> : <span>{r.generic}</span>}
              </span>
              <span className="lp-compare-col">
                {r.custom === false ? <Minus className="h-4 w-4 lp-compare-x" /> : <span>{r.custom}</span>}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>How it works</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>Live in three steps.</span></span>
          </h2>
        </div>
        <div className="lp-steps" data-reveal-stagger>
          {steps.map((s) => (
            <div className="lp-step" key={s.n}>
              <div className="lp-step-n">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — three quote cards */}
      <section className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>Loved by makers</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>Real teams, real <em className="lp-grad" style={{ fontStyle: 'normal' }}>results</em>.</span></span>
          </h2>
        </div>
        <div className="lp-quotes" data-reveal-stagger>
          {testimonials.map((t) => (
            <figure className="lp-quote" key={t.name}>
              <div className="lp-quote-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 .5l2.32 4.7 5.18.76-3.75 3.65.88 5.16L8 12.34 3.37 14.77l.88-5.16L.5 5.96l5.18-.76L8 .5z" />
                  </svg>
                ))}
              </div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="lp-avatar" style={{ background: `color-mix(in srgb, ${t.tint} 18%, transparent)`, color: t.tint, borderColor: `color-mix(in srgb, ${t.tint} 28%, transparent)` }}>
                  {t.initials}
                </span>
                <span className="lp-quote-meta">
                  <b>{t.name}</b>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="lp-section lp-container">
        <div className="lp-trustband" data-reveal-stagger>
          {trustItems.map((t) => (
            <div className="lp-trust" key={t.v}>
              <span className="lp-trust-ico"><t.ic className="h-5 w-5" /></span>
              <span className="lp-trust-k">{t.k}</span>
              <span className="lp-trust-v">{t.v}</span>
              <span className="lp-trust-d">{t.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>Simple pricing</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>One plan. <em className="lp-grad" style={{ fontStyle: 'normal' }}>Everything</em>.</span></span>
          </h2>
          <p className="lp-lede" data-reveal>
            Start free for 30 days. Then one flat price — unlimited sites, every template, all plugins.
          </p>
        </div>
        <div className="lp-pricing" data-reveal>
          <div className="lp-price">
            <div className="lp-price-top">
              <div className="lp-price-head">
                <span className="lp-eyebrow">Hyzr Pro</span>
                <span className="lp-price-badge">Free 30-day trial</span>
              </div>
              <div className="amt">$20<span>/month</span></div>
              <p className="lp-price-sub">First month free. Cancel anytime — no fine print.</p>
            </div>
            <ul>
              {[
                'Unlimited sites on hyzr.ai',
                'Every template, fully customizable',
                'Full plugin marketplace',
                'Custom domain support',
                'Edge hosting, SSL, and CDN',
                'Priority human support',
              ].map((f) => (
                <li key={f}>
                  <span className="lp-price-check"><Check className="h-[14px] w-[14px]" /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="lp-price-foot">
              <Link href="/auth/signup" className="lp-btn lp-btn-primary lp-btn-lg">
                <span>Start your free month</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="lp-price-fine">No credit card required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section lp-container">
        <div className="lp-head">
          <span className="lp-eyebrow" data-reveal>Questions, answered</span>
          <h2 className="lp-h2">
            <span className="lp-mask"><span>Good to know.</span></span>
          </h2>
        </div>
        <div className="lp-faq" data-reveal>
          {faqs.map((f, i) => {
            const open = openFaq === i
            return (
              <button
                key={f.q}
                className={`lp-faq-row ${open ? 'is-open' : ''}`}
                onClick={() => setOpenFaq(open ? null : i)}
                aria-expanded={open}
              >
                <span className="lp-faq-q">{f.q}</span>
                <span className="lp-faq-icon" aria-hidden="true">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="lp-faq-a">{f.a}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* BIG CTA — cleaner, less mesh */}
      <section className="lp-section lp-container">
        <div className="lp-cta">
          <div className="lp-cta-mesh" />
          <div className="lp-cta-inner">
            <h2 className="lp-h2">
              <span className="lp-mask"><span>Your brand deserves</span></span><br />
              <span className="lp-mask"><span>a <em className="lp-grad" style={{ fontStyle: 'normal' }}>real</em> home.</span></span>
            </h2>
            <p className="lp-lede" data-reveal>
              Join 12,000+ teams shipping beautiful sites on Hyzr. Free for 30 days, no credit card required.
            </p>
            <div className="lp-hero-actions" data-reveal>
              <Link href="/auth/signup" className="lp-btn lp-btn-lg lp-btn-cta-light">
                <span>Get started free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#templates" className="lp-btn lp-btn-lg lp-btn-cta-ghost">
                Explore templates
              </a>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
