'use client'

import { useEffect, useRef } from 'react'
import { useEditorStore } from '@/lib/editor/store'
import type { HostToFrame, FrameToHost } from '@/lib/editor/messages'
import { cn } from '@/lib/utils'

const DEVICE_SIZES = {
  desktop: 'w-full max-w-[1400px] h-full',
  tablet: 'w-[768px] h-full',
  mobile: 'w-[375px] h-full',
} as const

export function PreviewIframe() {
  const ref = useRef<HTMLIFrameElement>(null)
  const siteId = useEditorStore((s) => s.siteId)
  const currentSlug = useEditorStore((s) => s.currentSlug)
  const page = useEditorStore((s) => s.page)
  const device = useEditorStore((s) => s.device)
  const selectedSectionId = useEditorStore((s) => s.selectedSectionId)
  const selectSection = useEditorStore((s) => s.selectSection)

  // Push page state to iframe (debounced 80ms)
  useEffect(() => {
    if (!page) return
    const t = setTimeout(() => {
      ref.current?.contentWindow?.postMessage(
        { type: 'sync', page } satisfies HostToFrame,
        '*'
      )
    }, 80)
    return () => clearTimeout(t)
  }, [page])

  // Push selection changes to iframe
  useEffect(() => {
    ref.current?.contentWindow?.postMessage(
      { type: 'select', sectionId: selectedSectionId } satisfies HostToFrame,
      '*'
    )
  }, [selectedSectionId])

  // Receive messages from iframe
  useEffect(() => {
    function handler(e: MessageEvent<FrameToHost>) {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'select') selectSection(e.data.sectionId)
      if (e.data.type === 'ready' && page) {
        ref.current?.contentWindow?.postMessage(
          { type: 'sync', page } satisfies HostToFrame,
          '*'
        )
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [page, selectSection])

  if (!siteId) {
    return <div className="p-8 text-sm text-neutral-400">Loading preview…</div>
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded bg-white shadow-lg transition-all',
        DEVICE_SIZES[device]
      )}
    >
      <iframe
        ref={ref}
        src={`/edit/${siteId}/preview?page=${currentSlug}&interactive=1`}
        className="h-full w-full border-0"
        title="Preview"
      />
    </div>
  )
}
