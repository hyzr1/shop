'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 880px)').matches) return
    if (new URLSearchParams(window.location.search).has('thumb')) return
    const d = dot.current!, r = ring.current!
    const xTo = gsap.quickTo(r, 'x', { duration: 0.42, ease: 'power3' })
    const yTo = gsap.quickTo(r, 'y', { duration: 0.42, ease: 'power3' })

    const move = (e: MouseEvent) => {
      gsap.set(d, { x: e.clientX, y: e.clientY })
      xTo(e.clientX); yTo(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor]')) r.classList.add('is-hover')
      else r.classList.remove('is-hover')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="aurora-cursor-ring" />
      <div ref={dot} className="aurora-cursor" />
    </>
  )
}
