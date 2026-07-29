'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { navSections } from '@/lib/nav'
import { AnimatePresence, motion } from 'motion/react'
import { Search, Globe, CornerDownLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Item {
  id: string
  label: string
  sub?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  group: string
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [sites, setSites] = useState<{ id: string; name: string; subdomain: string }[]>([])
  const router = useRouter()
  const [supabase] = useState(createClient)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setQuery('')
      setActive(0)
    })
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('sites').select('id, name, subdomain').eq('user_id', user.id)
      if (!cancelled) setSites(data ?? [])
    })
    return () => { cancelled = true }
  }, [open, supabase])

  const items: Item[] = useMemo(() => {
    const nav: Item[] = navSections.flatMap((s) =>
      s.items.map((it) => ({
        id: it.href,
        label: it.label,
        icon: it.icon,
        group: 'Navigation',
        action: () => { router.push(it.href); onClose() },
      }))
    )
    const siteItems: Item[] = sites.map((s) => ({
      id: s.id,
      label: s.name,
      sub: `${s.subdomain}.hyzr.ai`,
      icon: Globe,
      group: 'Your sites',
      action: () => { router.push(`/dashboard/sites/${s.id}`); onClose() },
    }))
    return [...nav, ...siteItems]
  }, [sites, onClose, router])

  const filtered = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter((it) => it.label.toLowerCase().includes(q) || it.sub?.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
      if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.action() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, active, onClose])

  const groups = useMemo(() => {
    const map: Record<string, Item[]> = {}
    filtered.forEach((it) => { (map[it.group] ??= []).push(it) })
    return map
  }, [filtered])

  let flatIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0) }}
                placeholder="Search…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">No results for “{query}”</div>
              ) : (
                Object.entries(groups).map(([group, list]) => (
                  <div key={group} className="mb-1">
                    <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">{group}</p>
                    {list.map((it) => {
                      flatIndex++
                      const idx = flatIndex
                      return (
                        <button
                          key={it.id}
                          onMouseEnter={() => setActive(idx)}
                          onClick={it.action}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition-colors',
                            active === idx ? 'bg-muted' : 'hover:bg-muted/50'
                          )}
                        >
                          <it.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{it.label}</span>
                          {it.sub && <span className="text-xs text-muted-foreground">{it.sub}</span>}
                          {active === idx && <CornerDownLeft className="ml-auto h-3.5 w-3.5 text-muted-foreground" />}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
