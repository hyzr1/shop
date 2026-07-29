'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/dashboard/page-header'
import { CreateSiteModal } from '@/components/dashboard/create-site-modal'
import { TemplatePreview } from '@/components/dashboard/template-preview'
import { LiveThumb } from '@/components/dashboard/live-thumb'
import { SiteThumb } from '@/components/dashboard/site-thumb'
import { templates, liveDemo } from '@/lib/templates'
import { cn } from '@/lib/utils'
import { Plus, ArrowUpRight, Eye } from 'lucide-react'

const CATS = ['All', 'E-commerce', 'Technology', 'Education', 'Startup', 'Portfolio', 'Creative', 'Business']

export default function TemplatesPage() {
  const [showModal, setShowModal] = useState(false)
  const [preselect, setPreselect] = useState<string | undefined>()
  const [cat, setCat] = useState('All')
  const [touring, setTouring] = useState<string | null>(null)

  const filtered = cat === 'All' ? templates : templates.filter(t => t.category === cat)

  function use(id: string) { setPreselect(id); setShowModal(true) }
  const demoOf = (id: string) => liveDemo(id)

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
      <PageHeader title="Templates" description="Production-ready designs. Pick one and ship in minutes.">
        <Button variant="outline" onClick={() => use('')}>
          <Plus className="h-4 w-4" /> Blank site
        </Button>
      </PageHeader>

      {/* Category chips — cleaner pill row */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-4">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'inline-flex h-8 items-center rounded-full px-3.5 text-[12.5px] font-medium transition-colors',
              cat === c
                ? 'bg-foreground text-background'
                : 'border border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => (
          <div
            key={t.id}
            className="group animate-in"
            style={{ animationDelay: `${i * 40}ms` }}
            onMouseEnter={() => demoOf(t.id) && setTouring(t.id)}
            onMouseLeave={() => setTouring((current) => (current === t.id ? null : current))}
            onFocus={() => demoOf(t.id) && setTouring(t.id)}
            onBlur={() => setTouring((current) => (current === t.id ? null : current))}
          >
            <button
              onClick={() => use(t.id)}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/40 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
            >
              {demoOf(t.id) ? (
                touring === t.id ? (
                  <LiveThumb src={`${demoOf(t.id)}?thumb=1`} tour />
                ) : (
                  <SiteThumb
                    src={`${demoOf(t.id)}?thumb=1`}
                    aspect="4/3"
                    sourceWidth={1440}
                    className="absolute inset-0"
                  />
                )
              ) : (
                <div className="absolute inset-3 overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                  <TemplatePreview id={t.id} />
                </div>
              )}
              <div className="absolute left-3 top-3 flex gap-1.5">
                {demoOf(t.id) && <Badge variant="success" dot>Live demo</Badge>}
                {t.popular && <Badge className="bg-foreground text-background">Popular</Badge>}
              </div>
              <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3.5 py-1.5 text-[12.5px] font-semibold shadow-elevated">
                  Use template <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
            <div className="mt-3 flex items-start justify-between gap-3 px-0.5">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold tracking-tight">{t.name}</p>
                <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">{t.tagline}</p>
              </div>
              {demoOf(t.id) && (
                <a
                  href={demoOf(t.id)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Eye className="h-3 w-3" /> Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && <CreateSiteModal initialTemplate={preselect} onClose={() => setShowModal(false)} />}
    </div>
  )
}
