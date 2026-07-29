'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function TextareaField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <Label>{field.label}</Label>
      <textarea value={(value as string) ?? ''} rows={field.rows ?? 3}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-neutral-200 px-2 py-1.5 text-sm" />
    </div>
  )
}
