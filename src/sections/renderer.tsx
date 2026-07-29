'use client'
import type { Section } from './types'
import { getSection } from './registry'

export function SectionsRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((sec) => {
        if (sec.disabled) return null
        const def = getSection(sec.type)
        if (!def) {
          return (
            <div key={sec.id} className="border border-red-400 bg-red-50 p-4 text-sm text-red-700">
              Unknown section type: <code>{sec.type}</code>
            </div>
          )
        }
        const { Component } = def
        return <Component key={sec.id} section={sec} />
      })}
    </>
  )
}
