'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scroll-reveal hook. Within the returned ref:
 *  - [data-reveal] elements fade + rise into place (staggered if siblings)
 *  - .a-mask > span elements do a masked line reveal
 *  - [data-reveal-stagger] children stagger in
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    // In thumbnail mode, leave everything statically visible (no scroll animations)
    if (new URLSearchParams(window.location.search).has('thumb')) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // masked headline lines
      root.querySelectorAll('.a-mask > span, .p-mask > span, .f-mask > span').forEach((el) => {
        gsap.fromTo(el, { yPercent: 115 }, {
          yPercent: 0, duration: 1.05, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // generic reveals
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 22, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })

      // staggered groups
      root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
        gsap.fromTo(group.children, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 86%' },
        })
      })

      // parallax media
      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: -12, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return ref
}
