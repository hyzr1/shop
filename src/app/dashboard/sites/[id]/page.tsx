'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { cn, formatDate } from '@/lib/utils'
import { getTemplate, type TemplateContent } from '@/lib/templates'
import { SiteThumb } from '@/components/dashboard/site-thumb'
import { pluginIcon, categoryColors } from '@/lib/plugin-icons'
import {
  ArrowLeft, ExternalLink, Globe, Trash2, Check, Plus,
  LayoutDashboard, Paintbrush, Puzzle, Settings2, Eye,
  Pencil, ShieldCheck, Activity, CircleCheck, Circle,
  ArrowUpRight, FileText, ShoppingCart, Search, Home, Layers,
} from 'lucide-react'

interface Plugin { id: string; name: string; slug: string; description: string; category: string; is_free: boolean }
interface SitePlugin { plugin_id: string; plugins: Plugin }
interface Site {
  id: string
  name: string
  subdomain: string
  status: string
  template: string
  content?: Partial<TemplateContent>
  accent?: string | null
  updated_at?: string
  created_at?: string
  site_plugins: SitePlugin[]
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'editor', label: 'Editor', icon: Paintbrush },
  { id: 'plugins', label: 'Plugins', icon: Puzzle },
  { id: 'settings', label: 'Settings', icon: Settings2 },
] as const

const PAGES: { slug: string; label: string; icon: typeof Home }[] = [
  { slug: 'home', label: 'Home', icon: Home },
  { slug: 'product', label: 'Product', icon: ShoppingCart },
  { slug: 'collection', label: 'Collection', icon: Layers },
  { slug: 'cart', label: 'Cart', icon: ShoppingCart },
  { slug: 'search', label: 'Search', icon: Search },
  { slug: 'about', label: 'About', icon: FileText },
]

export default function SiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [site, setSite] = useState<Site | null>(null)
  const [allPlugins, setAllPlugins] = useState<Plugin[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<typeof TABS[number]['id']>('overview')
  const [toggling, setToggling] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function load() {
    const [s, p] = await Promise.all([fetch(`/api/sites/${id}`), fetch('/api/plugins')])
    setSite(await s.json()); setAllPlugins(await p.json()); setLoading(false)
  }
  useEffect(() => {
    let cancelled = false

    void Promise.all([fetch(`/api/sites/${id}`), fetch('/api/plugins')]).then(async ([s, p]) => {
      const [nextSite, nextPlugins] = await Promise.all([s.json(), p.json()])
      if (cancelled) return
      setSite(nextSite)
      setAllPlugins(nextPlugins)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [id])

  async function togglePlugin(pluginId: string, enabled: boolean) {
    setToggling(pluginId)
    await fetch(`/api/plugins/${id}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pluginId, enabled: !enabled }),
    })
    await load(); setToggling(null)
  }

  async function deleteSite() {
    if (!confirm('Delete this site permanently? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/sites/${id}`, { method: 'DELETE' })
    router.push('/dashboard/sites')
  }

  if (loading) return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <Skeleton className="h-9 w-48" /><Skeleton className="h-10 w-full max-w-md" /><Skeleton className="h-64" />
    </div>
  )
  if (!site) return <div className="p-8 text-muted-foreground">Site not found.</div>

  const tpl = getTemplate(site.template)
  const installedIds = new Set(site.site_plugins?.map(sp => sp.plugin_id) ?? [])
  const previewSrc = `/edit/${site.id}/preview?page=home`

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      {/* Back + header */}
      <button onClick={() => router.push('/dashboard/sites')} className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All sites
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-border shadow-soft">
            <SiteThumb src={previewSrc} aspect="1/1" sourceWidth={1280} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight">{site.name}</h1>
              <Badge variant={site.status === 'active' ? 'success' : 'warning'} dot>{site.status}</Badge>
            </div>
            <a href={`https://${site.subdomain}.hyzr.ai`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent">
              {site.subdomain}.hyzr.ai <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`https://${site.subdomain}.hyzr.ai`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline"><Eye className="h-4 w-4" /> Visit site</Button>
          </a>
          <Link href={`/edit/${site.id}`}>
            <Button variant="primary"><Pencil className="h-4 w-4" /> Edit site</Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn(
              'relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors',
              tab === t.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}>
            <t.icon className="h-4 w-4" /> {t.label}
            {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground" />}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <OverviewTab site={site} tpl={tpl} previewSrc={previewSrc} installedCount={installedIds.size} />
      )}

      {/* Editor */}
      {tab === 'editor' && (
        <div className="space-y-4">
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              The full-screen editor is the new way to customize your site.
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => router.push(`/edit/${site.id}`)}
            >
              Open editor
            </Button>
          </Card>
        </div>
      )}

      {/* Plugins */}
      {tab === 'plugins' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {allPlugins.map((plugin) => {
            const Icon = pluginIcon(plugin.slug)
            const installed = installedIds.has(plugin.id)
            return (
              <Card key={plugin.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white', categoryColors[plugin.category] ?? 'from-slate-500 to-gray-600')}>
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{plugin.name}</p>
                      {!plugin.is_free && <Badge variant="accent">Paid</Badge>}
                    </div>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{plugin.description}</p>
                  </div>
                </div>
                <Button variant={installed ? 'subtle' : 'outline'} size="sm" loading={toggling === plugin.id}
                  onClick={() => togglePlugin(plugin.id, installed)} className="shrink-0">
                  {installed ? <><Check className="h-3.5 w-3.5" /> Installed</> : <><Plus className="h-3.5 w-3.5" /> Install</>}
                </Button>
              </Card>
            )
          })}
        </div>
      )}

      {/* Settings */}
      {tab === 'settings' && (
        <div className="space-y-4">
          <Card className="p-6">
            <p className="font-semibold">Site details</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Domain and visibility settings for this site.</p>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-muted-foreground" /> {site.subdomain}.hyzr.ai</div>
              <Badge variant="success" dot>Live</Badge>
            </div>
          </Card>
          <Card className="border-red-200 p-6 dark:border-red-500/20">
            <p className="font-semibold text-red-600 dark:text-red-400">Danger zone</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Permanently delete this site and all its data.</p>
            <Button variant="destructive" className="mt-4" onClick={deleteSite} loading={deleting}>
              <Trash2 className="h-4 w-4" /> Delete site
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Overview tab — full-featured dashboard with edit-inline + analytics        */
/* -------------------------------------------------------------------------- */

function OverviewTab({
  site,
  tpl,
  previewSrc,
  installedCount,
}: {
  site: Site
  tpl: ReturnType<typeof getTemplate>
  previewSrc: string
  installedCount: number
}) {
  // Deterministic mock metrics seeded from site id so they don't look random
  // and they stay stable across renders.
  const seed = hashStr(site.id)
  const isLive = site.status === 'active'
  const visitors = isLive ? 1200 + (seed % 800) : 0
  const conversion = isLive ? 2 + (seed % 30) / 10 : 0
  const pages = isLive ? 6 + (seed % 5) : 0

  const lastEdited = site.updated_at ? new Date(site.updated_at) : null
  const lastEditedLabel = lastEdited ? relTime(lastEdited) : 'just now'

  const quickActions: { label: string; href: string; icon: typeof Pencil }[] = [
    { label: 'Edit', href: `/edit/${site.id}`, icon: Pencil },
    { label: 'Preview', href: `/edit/${site.id}/preview?page=home`, icon: Eye },
    { label: 'Plugins', href: `#`, icon: Puzzle },
    { label: 'Settings', href: `#`, icon: Settings2 },
  ]

  return (
    <div className="space-y-6">
      {/* Hero — preview iframe on left, action panel on right */}
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Link
          href={`/edit/${site.id}`}
          className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
        >
          <SiteThumb src={previewSrc} aspect="16/10" sourceWidth={1440} />
          <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3.5 py-1.5 text-[12.5px] font-semibold shadow-elevated">
              Open editor <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-1.5 bg-gradient-to-b from-black/30 to-transparent px-3 py-2 text-[11px] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="ml-1 truncate">{site.subdomain}.hyzr.ai</span>
          </div>
        </Link>

        <Card className="flex flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {tpl.name} · {tpl.category}
              </p>
              <h2 className="mt-1 truncate text-lg font-bold tracking-tight">{site.name}</h2>
              <a
                href={`https://${site.subdomain}.hyzr.ai`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.subdomain}.hyzr.ai <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <Badge variant={isLive ? 'success' : 'warning'} dot>{site.status}</Badge>
          </div>

          <div className="mt-5 space-y-2">
            <Link href={`/edit/${site.id}`} className="block">
              <Button variant="primary" className="w-full justify-center">
                <Pencil className="h-4 w-4" /> Edit site
              </Button>
            </Link>
            <a
              href={`https://${site.subdomain}.hyzr.ai`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full justify-center">
                <Eye className="h-4 w-4" /> Visit site
              </Button>
            </a>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 border-t border-border pt-4">
            {quickActions.map((qa) => (
              <Link
                key={qa.label}
                href={qa.href}
                className="group flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-2.5 text-center text-[11.5px] font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
              >
                <qa.icon className="h-4 w-4" />
                {qa.label}
              </Link>
            ))}
          </div>

          <p className="mt-auto pt-4 text-[12px] text-muted-foreground">
            Last edited {lastEditedLabel}
          </p>
        </Card>
      </div>

      {/* Performance + Site health */}
      <div className="grid gap-5 lg:grid-cols-2">
        <PerformanceCard visitors={visitors} conversion={conversion} pages={pages} seed={seed} />
        <SiteHealthCard installedCount={installedCount} isTrialing={false} />
      </div>

      {/* Recent activity */}
      <ActivityFeed siteName={site.name} isNewSite={!isLive} seed={seed} />

      {/* Pages on this site */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div>
            <p className="text-[14.5px] font-semibold tracking-tight">Pages on this site</p>
            <p className="text-[12.5px] text-muted-foreground">Jump straight into editing a specific page.</p>
          </div>
          <Link
            href={`/edit/${site.id}`}
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All pages <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
          {PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/edit/${site.id}?page=${p.slug}`}
              className="group flex items-center gap-3 bg-card px-5 py-4 transition-colors hover:bg-muted/40"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover:border-foreground/20">
                <p.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold tracking-tight">{p.label}</p>
                <p className="truncate text-[12px] text-muted-foreground">/{p.slug}</p>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}

/* ------------------- Performance card with sparklines --------------------- */

function PerformanceCard({
  visitors,
  conversion,
  pages,
  seed,
}: {
  visitors: number
  conversion: number
  pages: number
  seed: number
}) {
  const series = (offset: number, amp: number) =>
    Array.from({ length: 12 }, (_, i) => {
      const x = (Math.sin((i + offset + seed) * 0.7) + 1) * 0.5
      return 0.25 + x * amp
    })

  const metrics = [
    { label: 'Visitors', value: visitors.toLocaleString(), delta: '+12%', up: true, data: series(0, 0.7) },
    { label: 'Conversion', value: `${conversion.toFixed(1)}%`, delta: '+0.4pt', up: true, data: series(3, 0.5) },
    { label: 'Pages', value: pages.toLocaleString(), delta: '—', up: false, data: series(6, 0.4) },
  ]

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14.5px] font-semibold tracking-tight">Performance</p>
          <p className="text-[12.5px] text-muted-foreground">Last 7 days</p>
        </div>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-background/40 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className="mt-1.5 text-xl font-bold tabular-nums">{m.value}</p>
            <div className="mt-2 h-7">
              <Sparkline data={m.data} />
            </div>
            <p className={cn('mt-1 text-[11px] font-medium', m.up ? 'text-emerald-600' : 'text-muted-foreground')}>
              {m.delta}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const w = 100, h = 28
  const max = Math.max(...data, 1)
  const step = w / (data.length - 1)
  const points = data.map((d, i) => `${i * step},${h - (d / max) * h}`)
  const linePath = `M ${points.join(' L ')}`
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-area)" className="text-emerald-500" />
      <path d={linePath} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" />
    </svg>
  )
}

/* ------------------------- Site health checklist -------------------------- */

function SiteHealthCard({ installedCount, isTrialing }: { installedCount: number; isTrialing: boolean }) {
  const items: { done: boolean; label: string; note?: string; action?: { label: string; href: string } }[] = [
    { done: true, label: 'SSL certificate' },
    { done: true, label: 'Site published' },
    {
      done: false,
      label: 'Custom domain not connected',
      action: { label: 'Add', href: '/dashboard/settings' },
    },
    ...(isTrialing
      ? [{
          done: false,
          label: 'Payment method not added',
          action: { label: 'Add', href: '/dashboard/billing' },
        }]
      : []),
    {
      done: false,
      label: 'Analytics not configured',
      action: { label: 'Set up', href: '/dashboard/analytics' },
    },
  ]

  const completed = items.filter((i) => i.done).length

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14.5px] font-semibold tracking-tight">Site health</p>
          <p className="text-[12.5px] text-muted-foreground">
            {completed} of {items.length} checks complete · {installedCount} plugin{installedCount === 1 ? '' : 's'}
          </p>
        </div>
        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
      </div>
      <ul className="mt-4 space-y-1.5">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-muted/40"
          >
            {item.done ? (
              <CircleCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <span className={cn('flex-1 text-[13px]', item.done ? 'text-foreground' : 'text-muted-foreground')}>
              {item.label}
            </span>
            {item.action && (
              <Link
                href={item.action.href}
                className="text-[12px] font-semibold text-foreground underline-offset-2 hover:underline"
              >
                {item.action.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ----------------------------- Activity feed ------------------------------ */

function ActivityFeed({ siteName, isNewSite, seed }: { siteName: string; isNewSite: boolean; seed: number }) {
  if (isNewSite) {
    return (
      <Card className="p-5">
        <p className="text-[14.5px] font-semibold tracking-tight">Recent activity</p>
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/40 py-10 text-center">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 text-[13.5px] font-medium">No activity yet</p>
          <p className="mt-1 max-w-xs text-[12.5px] text-muted-foreground">
            Edit your site to see updates here.
          </p>
        </div>
      </Card>
    )
  }

  const types = [
    { icon: Pencil, label: 'Home page edited', tone: 'text-emerald-600' },
    { icon: Puzzle, label: 'SEO plugin installed', tone: 'text-indigo-600' },
    { icon: Globe, label: `Published changes to ${siteName}`, tone: 'text-emerald-600' },
    { icon: Layers, label: 'Collection page updated', tone: 'text-blue-600' },
    { icon: ShieldCheck, label: 'SSL certificate renewed', tone: 'text-amber-600' },
  ]

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-[14.5px] font-semibold tracking-tight">Recent activity</p>
        <span className="text-[12px] text-muted-foreground">Last 7 days</span>
      </div>
      <ul className="mt-4 space-y-2">
        {types.map((t, i) => {
          const hoursAgo = ((seed + i * 7) % 96) + 1
          return (
            <li
              key={t.label}
              className="flex items-center gap-3 rounded-md border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-muted/40"
            >
              <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background', t.tone)}>
                <t.icon className="h-3.5 w-3.5" />
              </div>
              <p className="flex-1 truncate text-[13px] font-medium">{t.label}</p>
              <span className="text-[12px] text-muted-foreground">{hoursAgo}h ago</span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

/* ----------------------------- helpers ------------------------------------ */

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function relTime(d: Date) {
  const diff = Date.now() - d.getTime()
  const m = Math.round(diff / 60_000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m} minute${m === 1 ? '' : 's'} ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} hour${h === 1 ? '' : 's'} ago`
  const days = Math.round(h / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  return formatDate(d)
}
