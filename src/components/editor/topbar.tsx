'use client'

import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/lib/editor/store'
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PageSelector } from './page-selector'
import { StatusIndicator } from './status-indicator'

export function EditorTopbar() {
  const router = useRouter()
  const { device, setDevice, undo, redo, canUndo, canRedo, save, siteId } =
    useEditorStore()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push(`/dashboard/sites/${siteId}`)}
          className="rounded p-1.5 hover:bg-neutral-100"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium">
          Draft
        </span>
        <PageSelector />
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo()}
          aria-label="Undo"
          className="rounded p-1.5 hover:bg-neutral-100 disabled:opacity-30"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo()}
          aria-label="Redo"
          className="rounded p-1.5 hover:bg-neutral-100 disabled:opacity-30"
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <div className="ml-2 flex rounded bg-neutral-100 p-0.5">
          {(
            [
              ['desktop', Monitor],
              ['tablet', Tablet],
              ['mobile', Smartphone],
            ] as const
          ).map(([d, Icon]) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              aria-label={`Preview ${d}`}
              className={cn('rounded p-1.5', device === d && 'bg-white shadow-sm')}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StatusIndicator />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => useEditorStore.getState().openThemePanel()}
        >
          <Palette className="h-4 w-4" /> Theme
        </Button>
        <Button variant="outline" size="sm" onClick={save}>
          Save
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => window.alert('Publishing ships in the next update')}
        >
          Publish
        </Button>
      </div>
    </header>
  )
}
