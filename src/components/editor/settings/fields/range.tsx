'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function RangeField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  const v = (value as number) ?? (field.default as number) ?? 0
  return (
    <div>
      <Label>{field.label} <span className="text-neutral-400">({v})</span></Label>
      <input type="range" value={v} min={field.min ?? 0} max={field.max ?? 100} step={field.step ?? 1}
        onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  )
}
