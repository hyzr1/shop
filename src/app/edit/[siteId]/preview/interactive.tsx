'use client'

import { useEffect, useMemo, useState } from 'react'
import { SectionsRenderer } from '@/sections/renderer'
import { PageContextProvider } from '@/sections/wrappers/context'
import { getProduct, getCollection, getCart } from '@/lib/stub-commerce'
import type { Page, Section } from '@/sections/types'
import type { HostToFrame, FrameToHost } from '@/lib/editor/messages'

export function InteractivePreview({ initialPage }: { initialPage: Page }) {
  const [page, setPage] = useState<Page>(initialPage)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Receive sync/select from host
  useEffect(() => {
    function handler(e: MessageEvent<HostToFrame>) {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'sync') setPage(e.data.page)
      if (e.data.type === 'select') setSelectedId(e.data.sectionId)
    }
    window.addEventListener('message', handler)
    window.parent.postMessage({ type: 'ready' } satisfies FrameToHost, '*')
    return () => window.removeEventListener('message', handler)
  }, [])

  // Intercept clicks on any section, post selection back to host
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest(
        '[data-section-id]'
      ) as HTMLElement | null
      if (!el) return
      // Always prevent anchor navigation in the editor preview
      const anchor = (e.target as HTMLElement).closest('a')
      if (anchor) e.preventDefault()
      const id = el.dataset.sectionId
      if (!id) return
      window.parent.postMessage(
        { type: 'select', sectionId: id } satisfies FrameToHost,
        '*'
      )
    }
    document.body.addEventListener('click', onClick, true)
    return () => document.body.removeEventListener('click', onClick, true)
  }, [])

  // Visual selection outline — applied imperatively to all data-section-id elements
  useEffect(() => {
    document.querySelectorAll('[data-section-id]').forEach((el) => {
      const isSel = (el as HTMLElement).dataset.sectionId === selectedId
      ;(el as HTMLElement).style.outline = isSel
        ? '2px solid rgb(59 130 246)'
        : ''
      ;(el as HTMLElement).style.outlineOffset = isSel ? '-2px' : ''
    })
  }, [selectedId, page])

  // Compute page context based on page_type so sections like product-info,
  // collection-grid, cart-items can read product/collection/cart from context.
  const ctx = useMemo(() => {
    switch (page.page_type) {
      case 'product':
        return { product: getProduct() }
      case 'collection':
        return { collection: getCollection() }
      case 'cart':
        return { cart: getCart() }
      default:
        return {}
    }
  }, [page.page_type])

  const sections = (page.draft_sections ?? page.sections) as Section[]

  return (
    <PageContextProvider value={ctx}>
      <SectionsRenderer sections={sections} />
    </PageContextProvider>
  )
}
