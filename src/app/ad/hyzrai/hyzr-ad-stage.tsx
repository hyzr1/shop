'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './hyzr-ad-stage.module.css'

declare global {
  interface Window {
    hyzrAdReady?: boolean
    hyzrAdSeek?: (time: number) => Promise<boolean>
    hyzrAdLoaded?: number
  }
}

const TEMPLATE_CARDS = [
  { id: 'olea', name: 'Olea', label: 'Skincare storefront' },
  { id: 'arbor', name: 'Arbor', label: 'AI infrastructure' },
  { id: 'lucent', name: 'Lucent', label: 'Agent platform' },
  { id: 'forge', name: 'Forge', label: 'Course academy' },
]

const RAIL_CARDS = [
  { id: 'olea', name: 'Skin care', label: 'Editorial commerce' },
  { id: 'atlas', name: 'Architecture', label: 'Studio portfolio' },
  { id: 'forge', name: 'Courses', label: 'Education launch' },
  { id: 'lucent', name: 'Software', label: 'SaaS landing' },
]

const LOAD_TARGET = 16

function words(text: string) {
  return text.split(' ').map((word, index) => (
    <span className={styles.word} data-word key={`${word}-${index}`}>
      {word}
    </span>
  ))
}

function SiteFrame({
  id,
  className,
  onLoad,
  scrollKey,
  scale = 1,
}: {
  id: string
  className?: string
  onLoad: () => void
  scrollKey?: string
  scale?: number
}) {
  return (
    <iframe
      ref={(node) => {
        if (node && scrollKey) frameRegistry.set(scrollKey, node)
      }}
      src={`/preview/${id}?ad=1`}
      title={`${id} live site`}
      className={`${styles.siteFrame} ${className ?? ''}`}
      style={{ transform: `scale(${scale})` }}
      onLoad={(event) => {
        const frame = event.currentTarget
        try {
          const doc = frame.contentDocument
          if (doc && !doc.getElementById('hyzr-ad-frame-style')) {
            const style = doc.createElement('style')
            style.id = 'hyzr-ad-frame-style'
            style.textContent = 'html,body{scrollbar-width:none!important}::-webkit-scrollbar{display:none!important}'
            doc.head.appendChild(style)
          }
          frame.contentWindow?.scrollTo(0, 0)
        } catch {
          // Same-origin frames should be controllable locally; ignore capture-time races.
        }
        onLoad()
      }}
    />
  )
}

function Browser({
  id,
  className,
  onLoad,
  scrollKey,
  scale = 0.675,
}: {
  id: string
  className?: string
  onLoad: () => void
  scrollKey?: string
  scale?: number
}) {
  return (
    <div className={`${styles.browser} ${className ?? ''}`}>
      <div className={styles.browserBar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.iframeWindow}>
        <SiteFrame id={id} onLoad={onLoad} scrollKey={scrollKey} scale={scale} />
      </div>
    </div>
  )
}

const frameRegistry = new Map<string, HTMLIFrameElement>()

function scrollFrame(key: string, progress: number) {
  const frame = frameRegistry.get(key)
  const win = frame?.contentWindow
  const doc = frame?.contentDocument
  if (!win || !doc) return
  const scroller = doc.scrollingElement ?? doc.documentElement
  const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
  const eased = 1 - Math.pow(1 - Math.max(0, Math.min(1, progress)), 3)
  const y = max * eased
  scroller.scrollTop = y
  win.scrollTo(0, y)
}

export function HyzrAdStage() {
  const root = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const [loaded, setLoaded] = useState(0)

  const markLoaded = () => setLoaded((value) => Math.min(LOAD_TARGET, value + 1))

  useEffect(() => {
    window.hyzrAdLoaded = loaded
  }, [loaded])

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setLoaded(LOAD_TARGET)
    }, 3500)
    return () => window.clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (!root.current || loaded < LOAD_TARGET) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current)
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      timeline.current = tl

      gsap.set(q('[data-scene]'), { autoAlpha: 0 })
      gsap.set(q('[data-word]'), { yPercent: 110, opacity: 0, rotateX: -55 })
      gsap.set(q('[data-template-card]'), { y: 170, opacity: 0, rotateX: 12, scale: 0.94 })
      gsap.set(q('[data-rail-card]'), { y: 120, opacity: 0, scale: 0.94 })
      gsap.set(q('[data-chat]'), { y: 70, opacity: 0, scale: 0.94 })
      gsap.set(q('[data-edit-chip]'), { y: 65, opacity: 0 })
      gsap.set(q('[data-end-preview]'), { y: 90, opacity: 0, scale: 0.92, rotateZ: -1.2 })
      gsap.set(q('[data-end-feature]'), { y: 34, opacity: 0 })
      gsap.set(q('[data-confetti]'), { scale: 0, opacity: 0 })
      gsap.set(q('[data-scene="intro"]'), { autoAlpha: 1 })
      gsap.set(q('[data-scene="intro"] [data-word]'), { yPercent: 0, opacity: 1, rotateX: 0 })
      gsap.set(q('[data-intro-sub]'), { opacity: 1, y: 0 })

      tl.fromTo(q('[data-scene="intro"]'), { scale: 1.012 }, { scale: 1, duration: 1.15, ease: 'power1.out' }, 0)
        .fromTo(q('[data-intro-sub]'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.42 }, 0.48)
        .to(q('[data-scene="intro"]'), { autoAlpha: 0, y: -100, scale: 0.97, duration: 0.46, ease: 'power2.inOut' }, 1.62)

        .to(q('[data-scene="dashboard"]'), { autoAlpha: 1, duration: 0.01 }, 1.24)
        .fromTo(q('[data-dashboard-shell]'), { y: 285, rotateX: 10, rotateZ: -4.8, scale: 0.88, opacity: 0 }, { y: 0, rotateX: 0, rotateZ: -2.4, scale: 1, opacity: 1, duration: 0.68 }, 1.28)
        .to(q('[data-typed]'), { width: 520, duration: 0.72, ease: 'steps(28)' }, 2.36)
        .fromTo(q('[data-suggestion]'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.38 }, 2.50)
        .to(q('[data-dashboard-shell]'), { y: -160, scale: 0.86, rotateZ: 0, duration: 0.58, ease: 'power2.inOut' }, 3.12)
        .to(q('[data-scene="dashboard"]'), { autoAlpha: 0, duration: 0.20 }, 3.48)

        .to(q('[data-scene="templates"]'), { autoAlpha: 1, duration: 0.01 }, 3.68)
        .fromTo(q('[data-wall-word]'), { yPercent: 110, opacity: 0, rotateX: -55 }, { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.035, duration: 0.50 }, 3.76)
        .to(q('[data-template-card]'), { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.06, duration: 0.62 }, 3.98)
        .to(q('[data-scene="templates"]'), { autoAlpha: 0, scale: 1.08, y: -180, duration: 0.62, ease: 'power2.inOut' }, 5.24)

        .to(q('[data-scene="focus"]'), { autoAlpha: 1, duration: 0.01 }, 5.08)
        .fromTo(q('[data-focus-copy]'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72 }, 5.18)
        .fromTo(q('[data-focus-browser]'), { y: 245, scale: 0.74, opacity: 0, rotateZ: 2.5 }, { y: 0, scale: 1, opacity: 1, rotateZ: 0, duration: 1.0 }, 5.35)
        .fromTo(q('[data-ai-panel]'), { x: 110, y: 30, opacity: 0, scale: 0.88 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.58 }, 6.58)
        .fromTo(q('[data-cursor]'), { x: 80, y: 80, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.42 }, 6.92)
        .to(q('[data-ai-panel]'), { y: -10, scale: 1.02, duration: 0.22, yoyo: true, repeat: 1 }, 7.20)
        .to(q('[data-scene="focus"]'), { autoAlpha: 0, x: -260, scale: 0.96, duration: 0.58, ease: 'power2.inOut' }, 8.08)

        .to(q('[data-scene="rail"]'), { autoAlpha: 1, duration: 0.01 }, 8.58)
        .fromTo(q('[data-rail-title]'), { y: 74, opacity: 0 }, { y: 0, opacity: 1, duration: 0.54 }, 8.68)
        .to(q('[data-rail-card]'), { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.56 }, 8.86)
        .to(q('[data-rail-track]'), { x: -900, duration: 1.55, ease: 'power2.inOut' }, 9.35)
        .to(q('[data-scene="rail"]'), { autoAlpha: 0, y: -120, duration: 0.48, ease: 'power2.inOut' }, 10.70)

        .to(q('[data-scene="chat"]'), { autoAlpha: 1, duration: 0.01 }, 10.86)
        .fromTo(q('[data-editor-browser]'), { y: 150, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.58 }, 10.94)
        .to(q('[data-chat]'), { y: 0, opacity: 1, scale: 1, stagger: 0.11, duration: 0.50 }, 11.18)
        .to(q('[data-edit-chip]'), { y: 0, opacity: 1, stagger: 0.07, duration: 0.38 }, 11.70)
        .to(q('[data-scene="chat"]'), { autoAlpha: 0, scale: 0.95, y: -90, duration: 0.50, ease: 'power2.inOut' }, 12.48)

        .to(q('[data-scene="responsive"]'), { autoAlpha: 1, duration: 0.01 }, 12.40)
        .fromTo(q('[data-responsive-browser]'), { y: 110, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.52 }, 12.50)
        .fromTo(q('[data-phone]'), { y: 130, opacity: 0, rotateZ: 4, scale: 0.8 }, { y: 0, opacity: 1, rotateZ: 0, scale: 1, duration: 0.62 }, 12.76)
        .to(q('[data-scene="responsive"]'), { autoAlpha: 0, y: -80, scale: 0.96, duration: 0.42, ease: 'power2.inOut' }, 13.34)

        .to(q('[data-scene="launch"]'), { autoAlpha: 1, duration: 0.01 }, 13.30)
        .fromTo(q('[data-check]'), { scale: 0.55, opacity: 0, rotateZ: -18 }, { scale: 1, opacity: 1, rotateZ: 0, duration: 0.42, ease: 'back.out(1.8)' }, 13.38)
        .fromTo(q('[data-launch-title]'), { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.40 }, 13.56)
        .fromTo(q('[data-domain]'), { y: 26, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.34 }, 13.74)
        .to(q('[data-confetti]'), {
          x: (_i, el) => Number((el as HTMLElement).dataset.x),
          y: (_i, el) => Number((el as HTMLElement).dataset.y),
          scale: 1,
          opacity: 1,
          stagger: 0.006,
          duration: 0.78,
          ease: 'power3.out',
        }, 13.42)
        .to(q('[data-scene="launch"]'), { autoAlpha: 0, y: -100, duration: 0.34, ease: 'power2.inOut' }, 14.30)

        .to(q('[data-scene="end"]'), { autoAlpha: 1, duration: 0.01 }, 14.24)
        .fromTo(q('[data-end-lockup]'), { y: 70, opacity: 0, scale: 0.86 }, { y: 0, opacity: 1, scale: 1, duration: 0.46, ease: 'back.out(1.4)' }, 14.34)
        .fromTo(q('[data-end-line]'), { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.30 }, 14.62)
        .fromTo(q('[data-cta]'), { y: 28, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.28 }, 14.74)
        .to(q('[data-end-preview]'), { y: 0, opacity: 0.52, scale: 1, rotateZ: 0, duration: 0.54, ease: 'power2.out' }, 14.28)
        .to(q('[data-end-feature]'), { y: 0, opacity: 1, stagger: 0.045, duration: 0.30 }, 14.56)
        .to({}, { duration: 0.22 }, 14.78)

      tl.eventCallback('onUpdate', () => {
        const time = tl.time()
        scrollFrame('focus-olea', (time - 5.55) / 2.45)
        scrollFrame('rail-olea', (time - 8.80) / 1.25)
        scrollFrame('rail-atlas', (time - 9.00) / 1.35)
        scrollFrame('rail-forge', (time - 9.15) / 1.45)
        scrollFrame('rail-lucent', (time - 9.30) / 1.50)
        scrollFrame('chat-olea', (time - 10.98) / 1.25)
        scrollFrame('responsive-olea', (time - 12.55) / 0.85)
      })

      window.hyzrAdSeek = async (time: number) => {
        tl.time(Math.max(0, Math.min(15, time)), false)
        tl.eventCallback('onUpdate')?.()
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
        return true
      }
      window.hyzrAdReady = true
      void window.hyzrAdSeek(0)
    }, root)

    return () => {
      window.hyzrAdReady = false
      window.hyzrAdSeek = undefined
      timeline.current = null
      ctx.revert()
    }
  }, [loaded])

  const confetti = Array.from({ length: 72 }, (_, index) => {
    const angle = (index * 137.5 * Math.PI) / 180
    const radius = 90 + (index % 9) * 24
    const x = (Math.cos(angle) * radius).toFixed(3)
    const y = (Math.sin(angle) * radius * 0.82).toFixed(3)
    const colors = ['#655bff', '#52c984', '#f2bd54', '#73c7f6']
    return <span key={index} className={styles.confetti} data-confetti data-x={x} data-y={y} style={{ background: colors[index % colors.length] }} />
  })

  return (
    <main className={styles.page}>
      <div ref={root} className={styles.stage}>
        <span className={`${styles.orb} ${styles.orbOne}`} />
        <span className={`${styles.orb} ${styles.orbTwo}`} />
        <img src="/ad-assets/hyzrai-wordmark-transparent.png" alt="HyzrAI" className={styles.brand} />

        <section className={`${styles.scene} ${styles.intro}`} data-scene="intro">
          <div className={styles.introStack}>
            <div className={styles.introEyebrow}>HyzrAI ecommerce</div>
            <h1 className={styles.introTitle}>
              {words('Your website should feel as custom as your business.')}
            </h1>
            <p className={styles.introSub} data-intro-sub>
              Build from a template, a photo, or one sentence.
              <br />
              Then shape every detail with AI.
            </p>
          </div>
        </section>

        <section className={`${styles.scene} ${styles.dashboardScene}`} data-scene="dashboard">
          <div className={styles.dashboardShell} data-dashboard-shell>
            <aside className={styles.dashboardSidebar}>
              <img src="/ad-assets/hyzrai-wordmark-transparent.png" alt="" className={styles.dashLogo} />
              <div className={styles.navGroup}>
                {['Overview', 'Sites', 'Templates', 'Plugins', 'Analytics'].map((item, index) => (
                  <div key={item} className={`${styles.navItem} ${index === 0 ? styles.navActive : ''}`}>
                    <span className={styles.navDot} />
                    {item}
                  </div>
                ))}
              </div>
              <div className={styles.proCard}>
                <strong>Pro plan</strong>
                <span>Unlimited sites and plugins</span>
              </div>
            </aside>
            <header className={styles.topbar}>
              <div className={styles.search}>Search sites, plugins, settings...</div>
              <div className={styles.account}>
                <span className={styles.avatar}>k</span>
                Kaylem
              </div>
            </header>
            <div className={styles.dashboardMain}>
              <div className={styles.buildTitle}>
                What do you want to <em>build</em>?
              </div>
              <div className={styles.buildSub}>Describe your site and HyzrAI will get you a head start.</div>
              <div className={styles.promptBox}>
                <div className={styles.typed} data-typed>
                  <span className={styles.typedInner}>Build me a luxury skincare brand</span>
                </div>
                <div className={styles.promptMeta}>HyzrAI Build</div>
                <div className={styles.sendButton} />
              </div>
              <div className={styles.suggestions}>
                {['Online store', 'Portfolio', 'Blog', 'Landing page'].map((item) => (
                  <span key={item} className={styles.suggestion} data-suggestion>{item}</span>
                ))}
              </div>
              <div className={styles.dashTemplates}>
                <h3>Start with a template</h3>
                <p>Production-ready designs you can launch in minutes.</p>
                <div className={styles.miniGrid}>
                  {['olea', 'arbor', 'lucent'].map((id) => (
                    <div key={id} className={styles.miniThumb}>
                      <SiteFrame id={id} onLoad={markLoaded} scale={0.18} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.scene} ${styles.templateWall}`} data-scene="templates">
          <div className={styles.wallHeader}>
            <h2 className={styles.wallTitle}>
              {'Choose a starting point.'.split(' ').map((word, index) => (
                <span className={styles.word} data-wall-word key={index}>{word}</span>
              ))}
            </h2>
            <p className={styles.wallSub}>Clean ecommerce, courses, service businesses, creative studios, and software launches.</p>
          </div>
          <div className={styles.wallGrid}>
            {TEMPLATE_CARDS.map((card) => (
              <article className={styles.templateCard} data-template-card key={card.id}>
                <div className={styles.templateFrame}>
                  <SiteFrame id={card.id} onLoad={markLoaded} scale={0.33} />
                </div>
                <div className={styles.templateLabel}>
                  <strong>{card.name}</strong>
                  <span>{card.label}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.scene}`} data-scene="focus">
          <h2 className={styles.focusCopy} data-focus-copy>
            Ask for a site.
            <br />
            Watch it become a brand.
          </h2>
          <Browser id="olea" className={styles.focusBrowser} onLoad={markLoaded} scrollKey="focus-olea" scale={0.675} />
          <div className={styles.aiPanel} data-ai-panel>
            <h3>Edit with AI</h3>
            <div className={styles.aiRow}><span>Brand tone</span><span>Warm luxury</span></div>
            <div className={styles.aiRow}><span>Typography</span><span>Elegant editorial</span></div>
            <div className={styles.aiRow}><span>Motion</span><span>Soft reveal, faster scroll</span></div>
            <div className={styles.swatches}><span className={styles.swatch} /><span className={styles.swatch} /><span className={styles.swatch} /><span className={styles.swatch} /></div>
            <div className={styles.apply}>Apply changes</div>
          </div>
          <div className={styles.cursor} data-cursor>
            <svg viewBox="0 0 56 70" fill="none" aria-hidden="true">
              <path d="M5 4L17 57L29 43L40 66L52 60L41 37H56L5 4Z" fill="white" stroke="#08090d" strokeWidth="3" />
            </svg>
          </div>
        </section>

        <section className={`${styles.scene} ${styles.industryRail}`} data-scene="rail">
          <h2 className={styles.railTitle} data-rail-title>
            One platform.
            <br />
            Very different businesses.
          </h2>
          <div className={styles.railTrack} data-rail-track>
            {RAIL_CARDS.map((card) => (
              <article className={styles.railCard} data-rail-card key={card.id}>
                <Browser id={card.id} className={styles.railBrowser} onLoad={markLoaded} scrollKey={`rail-${card.id}`} scale={0.542} />
                <div className={styles.railMeta}>
                  <strong>{card.name}</strong>
                  <span>{card.label}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.scene} ${styles.chatScene}`} data-scene="chat">
          <div className={styles.editorWrap}>
            <Browser id="olea" className={styles.editorBrowser} onLoad={markLoaded} scrollKey="chat-olea" scale={0.51} />
            <aside className={styles.chatPanel}>
              <h2>Customize it like a conversation.</h2>
              <div className={`${styles.chatBubble} ${styles.userBubble}`} data-chat>
                Make the hero warmer. Add my product photos. More premium, less generic.
              </div>
              <div className={`${styles.chatBubble} ${styles.aiBubble}`} data-chat>
                Done. I updated the palette, layout rhythm, section motion, and launch copy.
              </div>
            </aside>
            <div className={styles.editorSidebar}>
              {[
                ['Sections', 'Add a ritual finder'],
                ['Effects', 'Parallax image reveal'],
                ['Content', 'Rewrite product copy'],
              ].map(([label, value]) => (
                <div className={styles.editChip} data-edit-chip key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.scene} ${styles.responsiveScene}`} data-scene="responsive">
          <Browser id="olea" className={styles.responsiveBrowser} onLoad={markLoaded} scrollKey="responsive-olea" scale={0.611} />
          <div className={styles.phone} data-phone>
            <SiteFrame id="olea" onLoad={markLoaded} scale={0.34} />
          </div>
        </section>

        <section className={`${styles.scene} ${styles.launchScene}`} data-scene="launch">
          {confetti}
          <div>
            <div className={styles.check} data-check>✓</div>
            <h2 className={styles.launchTitle} data-launch-title>Your site is live.</h2>
            <div className={styles.domain} data-domain>lumiere-skin.com</div>
          </div>
        </section>

        <section className={`${styles.scene} ${styles.endScene}`} data-scene="end">
          <div className={styles.endContent}>
            <div className={styles.endLockup} data-end-lockup>
              <img src="/ad-assets/hyzrai-logo-transparent.png" alt="" className={styles.mark} />
              <img src="/ad-assets/hyzrai-wordmark-transparent.png" alt="HyzrAI" className={styles.endWord} />
            </div>
            <div className={styles.endLine} data-end-line>
              Build exactly what you <span className={styles.italic}>imagine.</span>
            </div>
            <div className={styles.cta} data-cta>Start with AI. Make it yours.</div>
          </div>
          <Browser id="olea" className={styles.endPreview} onLoad={markLoaded} scale={0.611} />
          <div className={styles.endFeatureRow}>
            {['Templates', 'AI edits', 'Launch live'].map((item) => (
              <span key={item} className={styles.endFeature} data-end-feature>{item}</span>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
