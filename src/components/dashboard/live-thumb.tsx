'use client'

import { useEffect, useRef, useState } from 'react'

const DESIGN_WIDTH = 1440

/**
 * Renders a real page (src) at desktop width, scaled to fit the container —
 * a pixel-accurate, non-interactive thumbnail of the actual site.
 */
export function LiveThumb({ src, ratio = 0.75, tour = false }: { src: string; ratio?: number; tour?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const raf = useRef<number | null>(null)
  const resetTimer = useRef<number | null>(null)
  const [scale, setScale] = useState(0.25)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / DESIGN_WIDTH))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    if (resetTimer.current) window.clearTimeout(resetTimer.current)
    raf.current = null
    resetTimer.current = null

    const win = frame.current?.contentWindow
    const doc = frame.current?.contentDocument
    if (!win || !doc || !loaded) return

    const scroller = doc.scrollingElement ?? doc.documentElement

    if (!tour) {
      scroller.scrollTop = 0
      win.scrollTo(0, 0)
      return
    }

    const max = Math.max(
      0,
      scroller.scrollHeight - scroller.clientHeight
    )
    if (!max) return

    const start = performance.now()
    const duration = 700
    const target = max
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const next = target * ease(progress)
      scroller.scrollTop = next
      win.scrollTo(0, next)
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      if (resetTimer.current) window.clearTimeout(resetTimer.current)
      raf.current = null
      resetTimer.current = null
    }
  }, [tour, loaded, src, ratio])

  const designHeight = DESIGN_WIDTH * ratio

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden bg-[#f6f4ee]">
      <iframe
        ref={frame}
        src={src}
        title="Live preview"
        tabIndex={-1}
        loading="lazy"
        onLoad={() => {
          const doc = frame.current?.contentDocument
          const win = frame.current?.contentWindow
          if (doc && !doc.getElementById('hyzr-live-thumb-scrollbar-style')) {
            const style = doc.createElement('style')
            style.id = 'hyzr-live-thumb-scrollbar-style'
            style.textContent = 'html,body{scrollbar-width:none!important}::-webkit-scrollbar{display:none!important}'
            doc.head.appendChild(style)
          }
          win?.scrollTo(0, 0)
          setLoaded(true)
        }}
        className={`pointer-events-none origin-top-left border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: DESIGN_WIDTH,
          height: designHeight,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}
