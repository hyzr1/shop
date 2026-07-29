'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

export function TextField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <Label>{field.label}</Label>
      <input type="text" value={(value as string) ?? ''} placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-neutral-200 px-2 py-1.5 text-sm" />
    </div>
  )
}
