'use client'
import type { FieldSchema } from '@/sections/registry'

export function CheckboxField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-neutral-700">
      <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
      {field.label}
    </label>
  )
}
