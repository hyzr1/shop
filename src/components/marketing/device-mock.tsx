'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * A device frame that renders a template page at a fixed viewport
 * (so 100vh-based heroes resolve correctly), and drives its internal scroll
 * via gsap as the section moves through view.
 */
function ScreenScroll({ src, designWidth, viewportRatio }: { src: string; designWidth: number; viewportRatio: number }) {
  const screen = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(0.3)
  const [scrollMax, setScrollMax] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // a sane "device viewport" height so the page's vh units behave naturally
  const viewportH = Math.round(designWidth * viewportRatio)

  // keep scale in sync with the frame width
  useEffect(() => {
    const el = screen.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / designWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [designWidth])

  // catch case where iframe finished loading before React attached onLoad
  useEffect(() => {
    if (loaded) return
    let stopped = false
    const tick = () => {
      if (stopped) return
      const doc = frame.current?.contentDocument
      if (doc && doc.readyState === 'complete' && (doc.body?.scrollHeight ?? 0) > 0) {
        setLoaded(true)
        return
      }
      setTimeout(tick, 120)
    }
    tick()
    return () => { stopped = true }
  }, [loaded])

  // measure scrollable distance once the iframe content is rendered
  useEffect(() => {
    if (!loaded) return
    const measure = () => {
      const doc = frame.current?.contentDocument
      const h = doc?.documentElement?.scrollHeight ?? doc?.body?.scrollHeight ?? 0
      if (h > viewportH) setScrollMax(h - viewportH)
    }
    measure()
    const t1 = setTimeout(measure, 600)
    const t2 = setTimeout(measure, 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [loaded, viewportH])

  // scroll-linked iframe scroll
  useEffect(() => {
    const el = screen.current
    const win = frame.current?.contentWindow
    if (!el || !win) return
    gsap.registerPlugin(ScrollTrigger)
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 58%',
      end: 'bottom 42%',
      scrub: 0.6,
      onUpdate: (self) => {
        win.scrollTo(0, self.progress * scrollMax)
      },
    })
    return () => st.kill()
  }, [scrollMax])

  return (
    <div ref={screen} className="absolute inset-0 overflow-hidden bg-[#0e0e12]">
      <iframe
        ref={frame}
        src={src}
        title="Template preview"
        tabIndex={-1}
        scrolling="no"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: designWidth, height: viewportH, transform: `scale(${scale})`, pointerEvents: 'none' }}
      />
    </div>
  )
}

export function PhoneMock({ src, tilt }: { src: string; tilt?: 'l' | 'r' }) {
  return (
    <div className={`lp-phone ${tilt === 'l' ? 'tilt-l' : tilt === 'r' ? 'tilt-r' : ''}`} data-reveal>
      <div className="lp-phone-screen">
        <span className="lp-phone-notch" />
        <ScreenScroll src={src} designWidth={430} viewportRatio={19.5 / 9} />
      </div>
    </div>
  )
}

export function LaptopMock({ src }: { src: string }) {
  return (
    <div className="lp-laptop" data-reveal>
      <div className="lp-laptop-screen">
        <ScreenScroll src={src} designWidth={1440} viewportRatio={10 / 16} />
      </div>
      <div className="lp-laptop-base" />
    </div>
  )
}
