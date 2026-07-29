'use client'

import { useEffect, useState } from 'react'
import { useEditorStore } from '@/lib/editor/store'
import { ChevronDown } from 'lucide-react'

interface PageRow {
  id: string
  slug: string
  page_type: string
  title: string
}

export function PageSelector() {
  const { siteId, currentSlug, switchPage, hasUnsaved } = useEditorStore()
  const [pages, setPages] = useState<PageRow[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!siteId) return
    fetch(`/api/sites/${siteId}/pages`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: PageRow[] | unknown) => {
        if (Array.isArray(data)) setPages(data)
      })
      .catch(() => {})
  }, [siteId])

  const current = pages.find((p) => p.slug === currentSlug)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-neutral-100"
      >
        {current?.title || currentSlug} <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                if (
                  hasUnsaved() &&
                  !confirm('You have unsaved changes. Switch pages anyway?')
                )
                  return
                switchPage(p.slug)
                setOpen(false)
              }}
              className="block w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-100"
            >
              {p.title || p.slug}{' '}
              <span className="text-xs text-neutral-400">({p.page_type})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
