'use client'
import { useState } from 'react'
import { Label } from './dispatcher'
import type { FieldSchema } from '@/sections/registry'
import { AssetPickerModal } from '@/components/editor/modals/asset-picker-modal'

export function ImageField({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }) {
  const img = value as { url?: string } | undefined
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Label>{field.label}</Label>
      {img?.url ? (
        <div className="space-y-2">
          <img src={img.url} alt="" className="aspect-video w-full rounded border border-neutral-200 object-cover" />
          <div className="flex gap-2">
            <button onClick={() => setOpen(true)} className="text-xs text-neutral-700 hover:underline">Change</button>
            <button onClick={() => onChange(null)} className="text-xs text-red-600 hover:underline">Remove</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="flex h-24 w-full items-center justify-center rounded border-2 border-dashed border-neutral-300 text-xs text-neutral-500 hover:border-neutral-900">Pick an image</button>
      )}
      <AssetPickerModal open={open} onClose={() => setOpen(false)} onPick={(a) => onChange({ url: a.url })} />
    </div>
  )
}
