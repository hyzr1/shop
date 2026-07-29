'use client'
import { useEffect, useRef } from 'react'
import { useEditorStore } from '@/lib/editor/store'
import { Copy, Trash2, Eye, EyeOff } from 'lucide-react'

export function SectionMenu({
  sectionId,
  onClose,
}: {
  sectionId: string
  onClose: () => void
}) {
  const { duplicateSection, removeSection, toggleSectionDisabled, page } =
    useEditorStore()
  const ref = useRef<HTMLDivElement>(null)
  const section = page?.sections.find((s) => s.id === sectionId)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  if (!section) return null
  const isUniversal = section.type === 'header' || section.type === 'footer'

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-1 w-44 rounded-md border border-neutral-200 bg-white py-1 shadow-lg"
    >
      {!isUniversal && (
        <MenuItem
          icon={<Copy className="h-3.5 w-3.5" />}
          label="Duplicate"
          onClick={() => {
            duplicateSection(sectionId)
            onClose()
          }}
        />
      )}
      <MenuItem
        icon={
          section.disabled ? (
            <Eye className="h-3.5 w-3.5" />
          ) : (
            <EyeOff className="h-3.5 w-3.5" />
          )
        }
        label={section.disabled ? 'Show' : 'Hide'}
        onClick={() => {
          toggleSectionDisabled(sectionId)
          onClose()
        }}
      />
      {!isUniversal && (
        <MenuItem
          icon={<Trash2 className="h-3.5 w-3.5" />}
          label="Delete"
          danger
          onClick={() => {
            removeSection(sectionId)
            onClose()
          }}
        />
      )}
    </div>
  )
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-neutral-100 ${danger ? 'text-red-600 hover:bg-red-50' : ''}`}
    >
      {icon} {label}
    </button>
  )
}
