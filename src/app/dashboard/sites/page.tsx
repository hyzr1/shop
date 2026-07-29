'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/dashboard/page-header'
import { CreateSiteModal } from '@/components/dashboard/create-site-modal'
import { SiteThumb } from '@/components/dashboard/site-thumb'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Globe, Plus, ExternalLink, Search, ArrowRight } from 'lucide-react'

interface Site {
  id: string
  name: string
  subdomain: string
  status: string
  template: string
  created_at: string
  updated_at?: string
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState('')

  async function loadSites() {
    const res = await fetch('/api/sites')
    setSites(await res.json())
    setLoading(false)
  }
  useEffect(() => {
    let cancelled = false

    void fetch('/api/sites').then(async (res) => {
      const nextSites = await res.json()
      if (cancelled) return
      setSites(nextSites)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  const filtered = sites.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.subdomain.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
      <PageHeader title="Sites" description="Manage and launch your sites on hyzr.ai">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" /> Create site
        </Button>
      </PageHeader>

      {!loading && sites.length > 0 && (
        <div className="max-w-xs">
          <Input
            icon={<Search />}
            placeholder="Search sites…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-14" />)}
        </div>
      ) : !sites.length ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-24 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
            <Globe className="h-6 w-6 text-foreground" />
          </div>
          <p className="mt-5 text-[16px] font-semibold tracking-tight">Launch your first site</p>
          <p className="mt-1.5 max-w-sm text-[13px] text-muted-foreground">
            Pick a subdomain on hyzr.ai and choose a template. Your site goes live instantly.
          </p>
          <Button variant="primary" className="mt-6" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" /> Create a site
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Table head */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_0.7fr_0.7fr_auto] items-center gap-4 border-b border-border bg-muted/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Site</span>
            <span>Subdomain</span>
            <span>Template</span>
            <span>Status</span>
            <span>Updated</span>
            <span aria-hidden="true" className="w-8" />
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-[13px] text-muted-foreground">
              No sites match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((site) => (
              <Link
                key={site.id}
                href={`/dashboard/sites/${site.id}`}
                className="group grid grid-cols-[1.5fr_1fr_1fr_0.7fr_0.7fr_auto] items-center gap-4 border-b border-border px-4 py-3.5 text-[13.5px] transition-colors last:border-b-0 hover:bg-muted/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-background">
                    <SiteThumb
                      src={`/edit/${site.id}/preview?page=home`}
                      aspect="1/1"
                      sourceWidth={1280}
                      className="h-full w-full"
                    />
                  </div>
                  <span className="truncate font-semibold tracking-tight">{site.name}</span>
                </div>
                <span className="inline-flex items-center gap-1 truncate text-muted-foreground">
                  {site.subdomain}.hyzr.ai <ExternalLink className="h-3 w-3 shrink-0" />
                </span>
                <span className="truncate capitalize text-muted-foreground">{site.template}</span>
                <Badge variant={site.status === 'active' ? 'success' : 'warning'} dot>{site.status}</Badge>
                <span className="text-muted-foreground">{formatDate(new Date(site.updated_at ?? site.created_at))}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))
          )}
        </div>
      )}

      {showModal && <CreateSiteModal onClose={() => { setShowModal(false); loadSites() }} />}
    </div>
  )
}
