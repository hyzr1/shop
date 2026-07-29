'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function PulseCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(max-width: 880px)').matches) return
    if (new URLSearchParams(window.location.search).has('thumb')) return
    const d = dot.current!, r = ring.current!
    const xTo = gsap.quickTo(r, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(r, 'y', { duration: 0.4, ease: 'power3' })
    const move = (e: MouseEvent) => { gsap.set(d, { x: e.clientX, y: e.clientY }); xTo(e.clientX); yTo(e.clientY) }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      r.classList.toggle('is-hover', !!t.closest('a, button, [data-cursor]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return (<><div ref={ring} className="pulse-cursor-ring" /><div ref={dot} className="pulse-cursor" /></>)
}
