'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { slugify, cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { templates, liveDemo } from '@/lib/templates'
import { TemplatePreview } from './template-preview'
import { LiveThumb } from './live-thumb'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowLeft, ArrowRight, Check, AlertCircle, Globe } from 'lucide-react'

export function CreateSiteModal({ onClose, initialTemplate }: { onClose: () => void; initialTemplate?: string }) {
  const [step, setStep] = useState(initialTemplate ? 1 : 0)
  const [name, setName] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [template, setTemplate] = useState(initialTemplate || 'storefront')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function handleName(v: string) { setName(v); setSubdomain(slugify(v)) }

  async function submit() {
    setLoading(true); setError('')
    const res = await fetch('/api/sites', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, subdomain, template }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to create site'); setLoading(false) }
    else { router.push(`/dashboard/sites/${data.id}`); onClose() }
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="font-semibold tracking-tight">Create a new site</h2>
              <p className="text-xs text-muted-foreground">Step {step + 1} of 2 · {step === 0 ? 'Choose a template' : 'Name your site'}</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-0.5 bg-muted">
            <motion.div className="h-full bg-foreground" animate={{ width: step === 0 ? '50%' : '100%' }} transition={{ duration: 0.3 }} />
          </div>

          <div className="p-6">
            {step === 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {templates.map((t) => (
                  <button key={t.id} onClick={() => setTemplate(t.id)}
                    className={cn('group relative overflow-hidden rounded-lg border bg-background text-left transition-all',
                      template === t.id ? 'border-foreground ring-2 ring-foreground/15' : 'border-border hover:border-foreground/30')}>
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                      {liveDemo(t.id) ? <LiveThumb src={`${liveDemo(t.id)}?thumb=1`} /> : <TemplatePreview id={t.id} />}
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-2">
                      <span className="text-xs font-medium">{t.name}</span>
                      {template === t.id && <Check className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md border border-border">
                    {liveDemo(template) ? <LiveThumb src={`${liveDemo(template)}?thumb=1`} /> : <TemplatePreview id={template} />}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium">{templates.find(t => t.id === template)?.name ?? 'Blank'} template</p>
                    <p className="text-xs text-muted-foreground">{templates.find(t => t.id === template)?.tagline}</p>
                  </div>
                </div>
                <Input id="site-name" label="Site name" placeholder="My Brand" value={name} onChange={(e) => handleName(e.target.value)} autoFocus />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Subdomain</label>
                  <div className="flex h-10 items-center overflow-hidden rounded-lg border border-border bg-background focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/15">
                    <span className="pl-3 text-muted-foreground"><Globe className="h-4 w-4" /></span>
                    <input value={subdomain} onChange={(e) => setSubdomain(slugify(e.target.value))} placeholder="my-brand"
                      className="flex-1 bg-transparent px-2 text-sm outline-none" />
                    <span className="flex h-full items-center border-l border-border bg-muted px-3 text-sm text-muted-foreground">.hyzr.ai</span>
                  </div>
                  {subdomain && <p className="text-xs text-muted-foreground">Live at <span className="font-medium text-foreground">{subdomain}.hyzr.ai</span></p>}
                </div>
                {error && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            {step === 0 ? <span /> : <Button variant="ghost" onClick={() => setStep(0)}><ArrowLeft className="h-4 w-4" /> Back</Button>}
            {step === 0 ? (
              <Button variant="primary" onClick={() => setStep(1)}>Continue <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button variant="primary" onClick={submit} loading={loading} disabled={!name || !subdomain}>Create site</Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
