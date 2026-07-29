'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function RadioField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <Label>{field.label}</Label>
      <div className="flex gap-3">
        {(field.options ?? []).map((o) => (
          <label key={o.value} className="flex items-center gap-1.5 text-xs">
            <input type="radio" name={field.key} checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  )
}
