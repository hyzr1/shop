'use client'
import { useEditorStore } from '@/lib/editor/store'
import { useEffect, useState } from 'react'

function relative(ts: number | null): string {
  if (!ts) return ''
  const s = Math.round((Date.now() - ts) / 1000)
  if (s < 5) return 'just now'
  if (s < 60) return `${s}s ago`
  return `${Math.round(s / 60)}m ago`
}

export function StatusIndicator() {
  const saving = useEditorStore((s) => s.saving)
  const lastSavedAt = useEditorStore((s) => s.lastSavedAt)
  const isDirty = useEditorStore((s) => s.isDirty)
  const saveConflict = useEditorStore((s) => s.saveConflict)
  const [, tick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => tick((v) => v + 1), 30000)
    return () => clearInterval(t)
  }, [])

  if (saveConflict) {
    return (
      <button
        onClick={() => window.location.reload()}
        className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700 hover:bg-red-100"
      >
        Page updated elsewhere — refresh
      </button>
    )
  }

  let label = ''
  if (saving) label = 'Saving…'
  else if (isDirty) label = 'Unsaved changes'
  else if (lastSavedAt) label = `Saved ${relative(lastSavedAt)}`

  return <span className="text-xs text-neutral-500">{label}</span>
}
