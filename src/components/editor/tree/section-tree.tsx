'use client'
import { useEditorStore } from '@/lib/editor/store'
import { SectionRow } from './section-row'
import { AddSectionButton } from './add-section-button'
import { DndSectionTree } from './dnd-context'

export function SectionTree() {
  const { page } = useEditorStore()
  if (!page)
    return (
      <div className="p-4 text-xs text-neutral-400">
        No pages found for this site. The DB migration may not be applied yet.
      </div>
    )

  const header = page.sections.find((s) => s.type === 'header')
  const footer = page.sections.find((s) => s.type === 'footer')
  const middle = page.sections.filter(
    (s) => s.type !== 'header' && s.type !== 'footer'
  )

  return (
    <div className="space-y-3 p-3 text-sm">
      <Group label="Header">
        {header ? (
          <SectionRow section={header} />
        ) : (
          <p className="px-2 text-xs text-neutral-400">No header section.</p>
        )}
      </Group>

      <Group label="Template">
        <DndSectionTree sections={middle} />
        <AddSectionButton
          atIndex={page.sections.length - (footer ? 1 : 0)}
        />
      </Group>

      <Group label="Footer">
        {footer ? (
          <SectionRow section={footer} />
        ) : (
          <p className="px-2 text-xs text-neutral-400">No footer section.</p>
        )}
      </Group>
    </div>
  )
}

function Group({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      {children}
    </div>
  )
}
