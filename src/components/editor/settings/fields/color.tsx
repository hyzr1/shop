'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function ColorField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  const v = (value as string) ?? '#000000'
  return (
    <div>
      <Label>{field.label}</Label>
      <div className="flex items-center gap-2">
        <input type="color" value={v} onChange={(e) => onChange(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-neutral-200" />
        <input type="text" value={v} onChange={(e) => onChange(e.target.value)} className="flex-1 rounded border border-neutral-200 px-2 py-1.5 font-mono text-xs" />
      </div>
    </div>
  )
}
