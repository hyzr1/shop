'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SiteThumbProps {
  /** URL to load in the iframe (a fully rendered page) */
  src: string
  /** Aspect ratio for the thumbnail container (default 16/10) */
  aspect?: string
  /** Source viewport width used inside the iframe before scaling (default 1280) */
  sourceWidth?: number
  className?: string
}

/**
 * Renders a real, scaled-down screenshot-like thumbnail of any URL by loading it
 * in a non-interactive iframe and applying a CSS transform to fit the container.
 *
 * Unlike TemplatePreview (hand-drawn mockup), this shows the *actual* live page.
 */
export function SiteThumb({
  src,
  aspect = '16/10',
  sourceWidth = 1280,
  className,
}: SiteThumbProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(0.25)
  const [loaded, setLoaded] = useState(false)

  // Track container width so we can rescale on resize (responsive thumbnails)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const compute = () => setScale(el.clientWidth / sourceWidth)
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [sourceWidth])

  // The scaled iframe height = container width / aspect * (1 / scale) so we can
  // honor any aspect ratio while keeping a fixed source viewport. We derive the
  // source height from the parsed aspect ratio.
  const aspectRatio = (() => {
    const [w, h] = aspect.split('/').map((n) => Number(n.trim()))
    if (!w || !h) return 16 / 10
    return w / h
  })()
  const sourceHeight = sourceWidth / aspectRatio

  return (
    <div
      ref={wrapRef}
      className={cn('relative overflow-hidden bg-muted/40', className)}
      style={{ aspectRatio: aspect }}
    >
      {/* Skeleton shimmer while iframe loads */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-muted/60" />
      )}
      <iframe
        ref={frameRef}
        src={src}
        title="Site preview"
        tabIndex={-1}
        loading="lazy"
        sandbox="allow-same-origin"
        onLoad={() => {
          // Hide scrollbars inside the framed page so thumbnails look clean
          try {
            const doc = frameRef.current?.contentDocument
            if (doc && !doc.getElementById('hyzr-site-thumb-style')) {
              const s = doc.createElement('style')
              s.id = 'hyzr-site-thumb-style'
              s.textContent =
                'html,body{scrollbar-width:none!important;overflow:hidden!important}::-webkit-scrollbar{display:none!important}'
              doc.head.appendChild(s)
            }
          } catch {
            // Cross-origin: ignore — sandbox is allow-same-origin so this usually works
          }
          setLoaded(true)
        }}
        className={cn(
          'pointer-events-none origin-top-left border-0 transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          width: sourceWidth,
          height: sourceHeight,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}
