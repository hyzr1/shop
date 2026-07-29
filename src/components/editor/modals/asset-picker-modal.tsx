'use client'
import { useEffect, useState } from 'react'
import { useEditorStore } from '@/lib/editor/store'
import { X, Upload } from 'lucide-react'

interface Asset { id: string; url: string }

export function AssetPickerModal({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (a: Asset) => void }) {
  const siteId = useEditorStore((s) => s.siteId)
  const [assets, setAssets] = useState<Asset[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) return
    fetch(`/api/sites/${siteId}/assets`).then((r) => r.json()).then(setAssets)
  }, [open, siteId])

  async function upload(file: File) {
    setUploading(true)
    const fd = new FormData(); fd.set('file', file)
    const res = await fetch(`/api/sites/${siteId}/assets`, { method: 'POST', body: fd })
    if (res.ok) { const a = await res.json(); setAssets((prev) => [a, ...prev]) }
    setUploading(false)
  }

  if (!open) return null
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl rounded-lg bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-semibold">Choose an image</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-neutral-100"><X className="h-4 w-4" /></button>
        </header>
        <div className="p-4">
          <label className="mb-4 flex h-24 cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-neutral-300 text-sm text-neutral-500 hover:border-neutral-500">
            <Upload className="h-4 w-4" /> {uploading ? 'Uploading…' : 'Upload an image'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f) }} />
          </label>
          <div className="grid max-h-96 grid-cols-4 gap-3 overflow-y-auto">
            {assets.map((a) => (
              <button key={a.id} onClick={() => { onPick(a); onClose() }} className="overflow-hidden rounded border border-neutral-200 hover:border-neutral-900">
                <img src={a.url} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
