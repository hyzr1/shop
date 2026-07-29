'use client'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { Section } from '@/sections/types'
import { SectionRow } from './section-row'
import { useEditorStore } from '@/lib/editor/store'

function SortableRow({ section }: { section: Section }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <SectionRow
        section={section}
        dragHandle={
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-neutral-400 hover:text-neutral-900"
            aria-label="Drag handle"
          >
            <GripVertical className="h-3.5 w-3.5" />
          </button>
        }
      />
    </div>
  )
}

export function DndSectionTree({ sections }: { sections: Section[] }) {
  const reorderSections = useEditorStore((s) => s.reorderSections)
  const page = useEditorStore((s) => s.page)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  )

  function onDragEnd(e: DragEndEvent) {
    if (!e.over || e.active.id === e.over.id || !page) return
    const allIds = page.sections.map((s) => s.id)
    const oldIdx = allIds.indexOf(e.active.id as string)
    const newIdx = allIds.indexOf(e.over.id as string)
    const moved = arrayMove(allIds, oldIdx, newIdx)
    reorderSections(moved)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-0.5">
          {sections.map((s) => (
            <SortableRow key={s.id} section={s} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
