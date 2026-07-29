'use client'

import { cn } from '@/lib/utils'

function initials(name?: string | null) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

interface AvatarProps {
  src?: string | null
  name?: string | null
  className?: string
}

export function Avatar({ src, name, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-xs font-semibold text-background',
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name ?? 'avatar'} className="h-full w-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  )
}
