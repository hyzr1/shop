'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, Paperclip, Wand2, Store, Briefcase, Newspaper, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

const suggestions = [
  { icon: Store, label: 'Online store' },
  { icon: Briefcase, label: 'Portfolio' },
  { icon: Newspaper, label: 'Blog' },
  { icon: LayoutGrid, label: 'Landing page' },
]

export function PromptComposer() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  function submit(prompt?: string) {
    const q = (prompt ?? value).trim()
    router.push(`/dashboard/templates${q ? `?prompt=${encodeURIComponent(q)}` : ''}`)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.5rem]">
        What do you want to <span className="italic" style={{ fontFamily: 'Georgia, serif' }}>build</span>?
      </h1>
      <p className="mt-2 text-[0.95rem] text-muted-foreground">Describe your site and Hyzr will get you a head start.</p>

      <div
        className={cn(
          'mt-7 w-full max-w-2xl rounded-2xl border bg-card p-2 text-left shadow-card transition-all duration-300',
          focused ? 'border-foreground/30 shadow-elevated' : 'border-border'
        )}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit() }}
          rows={2}
          placeholder="Ask Hyzr to build a clean storefront for my candle brand…"
          className="w-full resize-none bg-transparent px-3 pt-2 text-[0.95rem] outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-1">
            <button className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Wand2 className="h-3.5 w-3.5" /> Hyzr Build
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => submit()}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            disabled={!value.trim()}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => submit(`A ${s.label.toLowerCase()}`)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-soft transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <s.icon className="h-3.5 w-3.5" /> {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
