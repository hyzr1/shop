import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  /** Shared Hyzr family lockup or compact family mark. */
  variant?: 'word' | 'mark'
  className?: string
}

export function Logo({ size = 18, variant = 'word', className }: LogoProps) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-2', className)} aria-label="Hyzr Shop">
      <span
        aria-hidden="true"
        className="inline-grid place-items-center rounded-[24%] bg-[#111210] font-serif font-semibold italic text-white"
        style={{ width: size, height: size, fontSize: Math.max(11, size * 0.55) }}
      >H</span>
      {variant === 'word' && <span className="inline-flex items-baseline gap-1.5 font-semibold tracking-tight"><span className="font-serif text-[1.08em]">Hyzr</span><span className="text-[.78em] font-medium opacity-60">Shop</span></span>}
    </span>
  )
}
