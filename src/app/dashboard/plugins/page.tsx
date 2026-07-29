'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/dashboard/page-header'
import { pluginIcon, categoryColors } from '@/lib/plugin-icons'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface Plugin {
  id: string; name: string; slug: string; description: string
  category: string; is_free: boolean; version: string; author: string
}

const CATEGORIES = ['All', 'Analytics', 'Marketing', 'Communication', 'Commerce', 'Content', 'Social', 'Security', 'Developer']

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/api/plugins').then(r => r.json()).then(d => { setPlugins(d); setLoading(false) })
  }, [])

  const filtered = plugins.filter(p =>
    (filter === 'All' || p.category === filter) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <PageHeader title="Plugin marketplace" description="Extend your sites with powerful, one-click plugins" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                filter === cat ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}>
              {cat}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-64">
          <Input icon={<Search />} placeholder="Search plugins…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plugin) => {
            const Icon = pluginIcon(plugin.slug)
            return (
              <Card key={plugin.id} hover className="group p-5">
                <div className="flex items-start justify-between">
                  <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-soft', categoryColors[plugin.category] ?? 'from-slate-500 to-gray-600')}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant={plugin.is_free ? 'success' : 'accent'}>{plugin.is_free ? 'Free' : 'Paid'}</Badge>
                </div>
                <p className="mt-4 font-semibold">{plugin.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{plugin.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <span>{plugin.category}</span>
                  <span>v{plugin.version}</span>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
