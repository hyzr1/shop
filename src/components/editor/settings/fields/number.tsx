'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function NumberField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <Label>{field.label}</Label>
      <input type="number" value={(value as number) ?? field.default as number ?? 0}
        min={field.min} max={field.max} step={field.step ?? 1}
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
        className="w-full rounded border border-neutral-200 px-2 py-1.5 text-sm" />
    </div>
  )
}
