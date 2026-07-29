'use client'
import { Plus } from 'lucide-react'
import { useEditorStore } from '@/lib/editor/store'

export function AddSectionButton({ atIndex }: { atIndex: number }) {
  const openPicker = useEditorStore((s) => s.openAddSectionModal)
  return (
    <button
      onClick={() => openPicker(atIndex)}
      className="flex w-full items-center justify-center gap-1 py-1.5 text-xs text-neutral-500 opacity-60 hover:text-neutral-900 hover:opacity-100"
    >
      <Plus className="h-3 w-3" /> Add section
    </button>
  )
}
