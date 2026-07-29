'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function LinkField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  const v = typeof value === 'string' ? value : ''
  return (
    <div>
      <Label>{field.label}</Label>
      <input type="text" value={v} placeholder="/products  or  https://…"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-neutral-200 px-2 py-1.5 text-sm" />
    </div>
  )
}
