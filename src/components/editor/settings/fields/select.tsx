'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function SelectField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <Label>{field.label}</Label>
      <select value={(value as string) ?? (field.default as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-neutral-200 px-2 py-1.5 text-sm">
        {(field.options ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
