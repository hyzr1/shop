'use client'

import { useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current!
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.6, ease: 'power3.out',
    })
  }
  function onLeave() {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  )
}
