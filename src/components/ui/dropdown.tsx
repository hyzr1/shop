'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export const Dropdown = DropdownMenu.Root
export const DropdownTrigger = DropdownMenu.Trigger

export function DropdownContent({ className, align = 'end', sideOffset = 8, ...props }: ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-elevated',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className
        )}
        {...props}
      />
    </DropdownMenu.Portal>
  )
}

export function DropdownItem({ className, ...props }: ComponentProps<typeof DropdownMenu.Item>) {
  return (
    <DropdownMenu.Item
      className={cn(
        'flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground/80 outline-none transition-colors',
        'focus:bg-muted focus:text-foreground data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        '[&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

export function DropdownLabel({ className, ...props }: ComponentProps<typeof DropdownMenu.Label>) {
  return <DropdownMenu.Label className={cn('px-2.5 py-1.5 text-xs font-medium text-muted-foreground', className)} {...props} />
}

export function DropdownSeparator({ className }: { className?: string }) {
  return <DropdownMenu.Separator className={cn('my-1 h-px bg-border', className)} />
}
