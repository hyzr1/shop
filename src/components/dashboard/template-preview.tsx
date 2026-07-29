'use client'

import { cn } from '@/lib/utils'
import { getTemplate, type TemplateContent } from '@/lib/templates'

interface Props {
  id: string
  /** override the template's default content (for the live editor) */
  content?: Partial<TemplateContent>
  /** override accent */
  accent?: string
  chrome?: boolean
  className?: string
}

export function TemplatePreview({ id, content, accent, chrome = true, className }: Props) {
  const tpl = getTemplate(id)
  const c = { ...tpl.content, ...content }
  const a = accent ?? tpl.accent
  const body = STYLES[tpl.style]({ c, a })

  return (
    <div className={cn('h-full w-full overflow-hidden bg-white text-[#0a0a0a]', className)}>
      {chrome ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-[#fafafa] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
            <div className="ml-2 h-2.5 flex-1 rounded-full bg-black/[0.04]" />
          </div>
          <div className="flex-1 overflow-hidden">{body}</div>
        </div>
      ) : body}
    </div>
  )
}

const fill = 'bg-black/[0.06]'
const bar = 'bg-black/10 rounded-full'

type Ctx = { c: TemplateContent; a: string }

const STYLES: Record<string, (ctx: Ctx) => React.ReactNode> = {
  // AURORA — editorial fashion
  editorial: ({ c, a }) => (
    <div className="flex h-full flex-col px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.2em]">{c.brandName}</span>
        <div className="flex gap-2">
          {['Shop', 'About'].map((x) => <span key={x} className="text-[7px] text-black/50">{x}</span>)}
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: a }} />
        </div>
      </div>
      <div className="mt-auto mb-auto">
        <p className="font-serif text-[19px] font-medium leading-[1.05] tracking-tight">{c.headline}</p>
        <p className="mt-1.5 text-[8px] text-black/55">{c.subhead}</p>
        <span className="mt-2.5 inline-block rounded-full px-2.5 py-1 text-[7px] font-semibold text-white" style={{ background: a }}>{c.ctaText}</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => <div key={i} className={cn('aspect-[3/4] rounded-sm', fill)} />)}
      </div>
    </div>
  ),

  // FORGE - cohort academy
  academy: ({ c, a }) => (
    <div className="flex h-full flex-col bg-[#0b0d0c] px-3.5 py-3 text-[#f5f7ef]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-[0.16em]">{c.brandName}</span>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[6px] text-white/65">COHORT 08</span>
      </div>
      <div className="grid flex-1 grid-cols-[1.1fr_.9fr] items-center gap-3">
        <div>
          <span className="text-[6px] font-semibold uppercase tracking-[0.14em]" style={{ color: a }}>Project-led learning</span>
          <p className="mt-1.5 text-[15px] font-semibold leading-[1.02] tracking-tight">{c.headline}</p>
          <p className="mt-1.5 max-w-[95%] text-[7px] leading-snug text-white/50">{c.subhead}</p>
          <span className="mt-2.5 inline-block rounded-md px-2 py-1 text-[6px] font-bold text-[#10120e]" style={{ background: a }}>{c.ctaText}</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center justify-between text-[6px] text-white/45">
            <span>Studio plan</span><span>72%</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full" style={{ background: a }} />
          </div>
          <div className="mt-2 space-y-1">
            {['Prototype', 'Critique', 'Ship'].map((item, i) => (
              <div key={item} className="flex items-center gap-1.5 rounded bg-white/[0.045] px-1.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? a : 'rgba(255,255,255,.18)' }} />
                <span className="text-[6px] text-white/65">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 border-t border-white/10 pt-2">
        {['10 weeks', 'Live studio', '4 projects'].map((item) => (
          <span key={item} className="text-[6px] uppercase tracking-wide text-white/40">{item}</span>
        ))}
      </div>
    </div>
  ),

  // MONO — minimal portfolio
  minimal: ({ c, a }) => (
    <div className="flex h-full flex-col px-4 py-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold">{c.brandName}</span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: a }} />
      </div>
      <p className="mt-6 max-w-[85%] text-[15px] font-medium leading-[1.15] tracking-tight">{c.headline}</p>
      <p className="mt-2 text-[8px] text-black/50">{c.subhead}</p>
      <div className="mt-auto space-y-1.5">
        {['Helix — Brand system', 'Northwind — Web app', 'Atlas — Mobile'].map((x, i) => (
          <div key={i} className="flex items-center justify-between border-t border-black/[0.08] pt-1.5">
            <span className="text-[8px] font-medium">{x}</span>
            <span className="text-[7px] text-black/40">202{4 + i}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  // BAZAAR — vibrant marketplace
  market: ({ c, a }) => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 py-2 text-white" style={{ background: a }}>
        <span className="text-[10px] font-bold">{c.brandName}</span>
        <div className="h-2.5 w-2.5 rounded-sm bg-white/90" />
      </div>
      <div className="px-3 py-2">
        <p className="text-[12px] font-bold leading-tight">{c.headline}</p>
        <p className="text-[7px] text-black/50">{c.subhead}</p>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-1.5 px-3 pb-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="overflow-hidden rounded-md border border-black/[0.06]">
            <div className={cn('aspect-square', fill)} />
            <div className="flex items-center justify-between px-1 py-1">
              <span className={cn('h-1 w-4', bar)} />
              <span className="text-[6px] font-bold" style={{ color: a }}>${9 + i}9</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  // FRAME — photography gallery
  gallery: ({ c, a }) => (
    <div className="relative h-full">
      <div className="grid h-full grid-cols-4 grid-rows-3 gap-1 p-1.5">
        <div className={cn('col-span-2 row-span-2 rounded-sm', fill)} />
        <div className={cn('rounded-sm', fill)} /><div className={cn('rounded-sm', fill)} />
        <div className={cn('rounded-sm', fill)} /><div className={cn('rounded-sm', fill)} />
        <div className={cn('col-span-2 rounded-sm', fill)} />
        <div className={cn('col-span-2 rounded-sm', fill)} />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
        <p className="font-serif text-[16px] italic text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{c.headline}</p>
        <span className="mt-1 inline-block h-0.5 w-6 rounded-full" style={{ background: a }} />
      </div>
    </div>
  ),

  // PLATE — restaurant menu
  menu: ({ c, a }) => (
    <div className="flex h-full flex-col">
      <div className="relative flex h-[42%] flex-col items-center justify-center gap-1" style={{ background: `${a}14` }}>
        <span className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: a }}>{c.brandName.toUpperCase()}</span>
        <p className="px-4 text-center font-serif text-[13px] font-medium leading-tight">{c.headline}</p>
        <span className="rounded-full border px-2 py-0.5 text-[6px] font-semibold" style={{ borderColor: a, color: a }}>{c.ctaText}</span>
      </div>
      <div className="space-y-1.5 px-4 py-2.5">
        {['Heirloom tomato', 'Wood-fired bream', 'Dark chocolate'].map((x, i) => (
          <div key={i} className="flex items-baseline gap-1.5">
            <span className="text-[8px] font-medium">{x}</span>
            <span className="flex-1 border-b border-dotted border-black/20" />
            <span className="text-[7px] text-black/50">${14 + i * 4}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  // PULSE — SaaS landing
  landing: ({ c, a }) => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="text-[10px] font-bold">{c.brandName}</span>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-black/50">Features</span>
          <span className="text-[7px] text-black/50">Pricing</span>
          <span className="rounded-md px-2 py-0.5 text-[7px] font-semibold text-white" style={{ background: a }}>Sign up</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full px-2 py-0.5 text-[6px] font-semibold" style={{ background: `${a}1a`, color: a }}>NEW · v2 is here</span>
        <p className="mt-2 text-[17px] font-bold leading-[1.1] tracking-tight">{c.headline}</p>
        <p className="mt-1.5 text-[8px] text-black/55">{c.subhead}</p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-md px-2.5 py-1 text-[7px] font-semibold text-white" style={{ background: a }}>{c.ctaText}</span>
          <span className="rounded-md border border-black/15 px-2.5 py-1 text-[7px] font-semibold">Docs</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 border-t border-black/[0.06] py-1.5 opacity-40">
        {[0, 1, 2, 3].map((i) => <span key={i} className={cn('h-1.5 w-8', bar)} />)}
      </div>
    </div>
  ),
}
