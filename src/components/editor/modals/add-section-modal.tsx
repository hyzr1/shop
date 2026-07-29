'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
import { useEditorStore } from '@/lib/editor/store'
import { listByCategory } from '@/sections/registry'

const CATEGORIES = [
  { key: 'marketing', label: 'Marketing' },
  { key: 'commerce', label: 'Commerce' },
  { key: 'custom', label: 'Custom' },
] as const

export function AddSectionModal() {
  const addSectionModalOpen = useEditorStore((s) => s.addSectionModalOpen)
  const addSectionAtIndex = useEditorStore((s) => s.addSectionAtIndex)
  const closeAddSectionModal = useEditorStore((s) => s.closeAddSectionModal)
  const addSection = useEditorStore((s) => s.addSection)
  const [q, setQ] = useState('')

  if (!addSectionModalOpen) return null

  return (
    <div
      onClick={closeAddSectionModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-lg bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h3 className="text-sm font-semibold">Add a section</h3>
          <button
            onClick={closeAddSectionModal}
            aria-label="Close"
            className="rounded p-1 hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-2">
          <Search className="h-4 w-4 text-neutral-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sections"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="max-h-96 overflow-y-auto p-4">
          {CATEGORIES.map((cat) => {
            const items = listByCategory(cat.key).filter((s) =>
              s.label.toLowerCase().includes(q.toLowerCase())
            )
            if (!items.length) return null
            return (
              <div key={cat.key} className="mb-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {cat.label}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {items.map((s) => (
                    <button
                      key={s.type}
                      onClick={() => {
                        addSection(s.type, addSectionAtIndex ?? undefined)
                        closeAddSectionModal()
                      }}
                      className="rounded border border-neutral-200 p-3 text-left text-sm transition-colors hover:border-neutral-900 hover:bg-neutral-50"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
