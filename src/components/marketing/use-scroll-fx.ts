'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Landing-page scroll choreography:
 *  - .lp-mask > span        → masked line reveal
 *  - [data-reveal]          → fade + rise
 *  - [data-reveal-stagger]  → staggered children
 *  - [data-parallax]        → gentle scrub parallax (use data-parallax="-40" for amount)
 */
export function useScrollFx<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      root.querySelectorAll('.lp-mask > span').forEach((el) => {
        gsap.fromTo(el, { yPercent: 116 }, {
          yPercent: 0, duration: 1.05, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        })
      })
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 26, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
      root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
        gsap.fromTo(group.children, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: group, start: 'top 86%' },
        })
      })
      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || '-40')
        gsap.fromTo(el, { y: -amt }, {
          y: amt, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return ref
}
