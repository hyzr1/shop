'use client'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'

const FONTS = ['Inter', 'Geist', 'Playfair Display', 'JetBrains Mono', 'Lora', 'Merriweather', 'Manrope']

export function FontField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  const v = (value as { family?: string } | undefined)?.family ?? 'Inter'
  return (
    <div>
      <Label>{field.label}</Label>
      <select value={v} onChange={(e) => onChange({ family: e.target.value, weight: 400 })}
        className="w-full rounded border border-neutral-200 px-2 py-1.5 text-sm">
        {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
      </select>
    </div>
  )
}
