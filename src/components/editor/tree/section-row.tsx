'use client'
import { useEditorStore } from '@/lib/editor/store'
import { getSection } from '@/sections/registry'
import { ChevronRight, GripVertical, EyeOff, MoreHorizontal } from 'lucide-react'
import type { Section } from '@/sections/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { SectionMenu } from './section-menu'

export function SectionRow({
  section,
  dragHandle,
}: {
  section: Section
  dragHandle?: React.ReactNode
}) {
  const { selectedSectionId, selectSection, selectedBlockId, selectBlock } =
    useEditorStore()
  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const def = getSection(section.type)

  const selected = selectedSectionId === section.id

  return (
    <div>
      <div
        onClick={() => selectSection(section.id)}
        className={cn(
          'group flex items-center gap-1 rounded px-2 py-1.5 text-sm transition-colors',
          selected
            ? 'bg-neutral-100 text-neutral-900'
            : 'text-neutral-700 hover:bg-neutral-50',
          section.disabled && 'opacity-50'
        )}
      >
        {dragHandle ?? (
          <GripVertical className="h-3.5 w-3.5 text-neutral-300 opacity-0 group-hover:opacity-100" />
        )}
        {section.blocks.length > 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((v) => !v)
            }}
            className="p-0.5"
          >
            <ChevronRight
              className={cn(
                'h-3 w-3 transition-transform',
                expanded && 'rotate-90'
              )}
            />
          </button>
        ) : (
          <span className="w-4" />
        )}
        <span className="flex-1 truncate">{def?.label ?? section.type}</span>
        {section.disabled && <EyeOff className="h-3 w-3 text-neutral-400" />}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((v) => !v)
            }}
            className="rounded p-1 opacity-0 hover:bg-neutral-200 group-hover:opacity-100"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
          {menuOpen && (
            <SectionMenu
              sectionId={section.id}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
      {expanded && (
        <div className="ml-6 border-l border-neutral-200 pl-2">
          {section.blocks.map((b) => (
            <div
              key={b.id}
              onClick={() => {
                selectSection(section.id)
                selectBlock(b.id)
              }}
              className={cn(
                'cursor-pointer rounded px-2 py-1 text-xs',
                selectedBlockId === b.id
                  ? 'bg-neutral-100'
                  : 'hover:bg-neutral-50'
              )}
            >
              {b.type}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
