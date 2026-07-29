'use client'
import { useEditorStore } from '@/lib/editor/store'
import { getSection } from '@/sections/registry'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function BlocksList({ sectionId }: { sectionId: string }) {
  const { page, addBlock, removeBlock, selectBlock } = useEditorStore()
  const [pickerOpen, setPickerOpen] = useState(false)
  const section = page?.sections.find((s) => s.id === sectionId)
  const def = getSection(section?.type as never)
  if (!section || !def) return null

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-neutral-500">Blocks</p>
      {section.blocks.map((b) => {
        const bt = def.blockTypes.find((t) => t.type === b.type)
        return (
          <div key={b.id} className="flex items-center justify-between rounded border border-neutral-200 px-2 py-1.5 text-sm">
            <button onClick={() => selectBlock(b.id)} className="flex-1 text-left hover:underline">{bt?.label ?? b.type}</button>
            <button onClick={() => removeBlock(sectionId, b.id)} className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-red-600">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
      <div className="relative">
        <button onClick={() => setPickerOpen((v) => !v)} className="flex w-full items-center justify-center gap-1 rounded border border-dashed border-neutral-300 py-1.5 text-xs text-neutral-500 hover:border-neutral-500 hover:text-neutral-900">
          <Plus className="h-3 w-3" /> Add block
        </button>
        {pickerOpen && (
          <div className="absolute z-10 mt-1 w-full rounded border border-neutral-200 bg-white py-1 shadow-lg">
            {def.blockTypes.map((bt) => (
              <button key={bt.type} onClick={() => { addBlock(sectionId, bt.type); setPickerOpen(false) }}
                className="block w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-100">{bt.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
