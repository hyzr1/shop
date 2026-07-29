'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

// Schemes will eventually come from theme state; for now hard-list scheme_1 + scheme_2 known names.
const SCHEMES = [
  { value: 'scheme_1', label: 'Light' },
  { value: 'scheme_2', label: 'Dark' },
]

export function ColorSchemeField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <Label>{field.label}</Label>
      <div className="flex gap-2">
        {SCHEMES.map((s) => (
          <button key={s.value} onClick={() => onChange(s.value)}
            className={`flex-1 rounded border px-3 py-1.5 text-xs ${value === s.value ? 'border-neutral-900 bg-neutral-100' : 'border-neutral-200'}`}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
