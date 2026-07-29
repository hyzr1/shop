import { useEffect } from 'react'
import { useEditorStore } from './store'

export function useAutosave(intervalMs = 1500) {
  const isDirty = useEditorStore((s) => s.isDirty)
  const save = useEditorStore((s) => s.save)
  useEffect(() => {
    if (!isDirty) return
    const t = setTimeout(() => {
      save()
    }, intervalMs)
    return () => clearTimeout(t)
  }, [isDirty, save, intervalMs])
}
