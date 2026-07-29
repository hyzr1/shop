'use client'

import { useState } from 'react'
import Link from 'next/link'
import { templates, liveDemo } from '@/lib/templates'
import { TemplatePreview } from './template-preview'
import { LiveThumb } from './live-thumb'
import { CreateSiteModal } from './create-site-modal'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export function TemplateShowcase() {
  const [preselect, setPreselect] = useState<string | undefined>()
  const [open, setOpen] = useState(false)
  const [touring, setTouring] = useState<string | null>(null)

  function pick(id: string) { setPreselect(id); setOpen(true) }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Start with a template</h2>
          <p className="text-sm text-muted-foreground">Production-ready designs you can launch in minutes.</p>
        </div>
        <Link href="/dashboard/templates" className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          Browse all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.slice(0, 6).map((t) => {
          const demo = liveDemo(t.id)
          return (
            <article
              key={t.id}
              className="group text-left"
              onMouseEnter={() => demo && setTouring(t.id)}
              onMouseLeave={() => setTouring((current) => (current === t.id ? null : current))}
              onFocus={() => demo && setTouring(t.id)}
              onBlur={() => setTouring((current) => (current === t.id ? null : current))}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted/40 shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-elevated">
                <button
                  type="button"
                  onClick={() => pick(t.id)}
                  aria-label={`Use the ${t.name} template`}
                  className="absolute inset-0 cursor-pointer text-left"
                >
                  {demo ? (
                    <LiveThumb src={`${demo}?thumb=1`} ratio={0.625} tour={touring === t.id} />
                  ) : (
                    <div className="absolute inset-2.5 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
                      <TemplatePreview id={t.id} />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/[0.04] group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-background px-3.5 py-1.5 text-sm font-medium shadow-elevated">
                      Use template <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
                {demo && (
                  <Link
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the ${t.name} live demo`}
                    className="absolute left-2.5 top-2.5 z-10 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Badge variant="success" dot>
                      Live demo <ArrowUpRight className="h-3 w-3" />
                    </Badge>
                  </Link>
                )}
              </div>
              <div className="mt-2.5 flex items-center justify-between px-0.5">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.category}</p>
              </div>
              <p className="px-0.5 text-xs text-muted-foreground">{t.tagline}</p>
            </article>
          )
        })}
      </div>

      {open && <CreateSiteModal initialTemplate={preselect} onClose={() => setOpen(false)} />}
    </div>
  )
}
