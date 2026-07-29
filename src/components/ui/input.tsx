import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: ReactNode
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, suffix, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-muted-foreground pointer-events-none [&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent',
            icon && 'pl-9',
            suffix && 'pr-10',
            error && 'border-red-500 focus:ring-red-500/30 focus:border-red-500',
            className
          )}
          {...props}
        />
        {suffix && <span className="absolute right-3 text-muted-foreground">{suffix}</span>}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
)
Input.displayName = 'Input'
