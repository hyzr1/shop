'use client'
import { useEditorStore } from '@/lib/editor/store'
import { getSection } from '@/sections/registry'
import { FieldDispatcher } from './fields/dispatcher'
import { BlocksList } from './blocks-list'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function SettingsPanel() {
  const { page, selectedSectionId, selectedBlockId, updateSectionSettings, updateBlockSettings } = useEditorStore()
  const [customCssOpen, setCustomCssOpen] = useState(false)

  if (!page) return null
  if (!selectedSectionId) {
    return <div className="p-4 text-sm text-neutral-400">Select a section to edit its settings.</div>
  }
  const section = page.sections.find((s) => s.id === selectedSectionId)
  if (!section) return null
  const def = getSection(section.type)
  if (!def) return null

  // Editing a block?
  if (selectedBlockId) {
    const block = section.blocks.find((b) => b.id === selectedBlockId)
    const blockDef = def.blockTypes.find((bt) => bt.type === block?.type)
    if (block && blockDef) {
      return (
        <div className="space-y-4 p-4">
          <h3 className="text-sm font-semibold">{blockDef.label}</h3>
          {blockDef.settingsSchema.map((f) => (
            <FieldDispatcher key={f.key} field={f} value={block.settings[f.key]}
              onChange={(v) => updateBlockSettings(section.id, block.id, { [f.key]: v as never })} />
          ))}
        </div>
      )
    }
  }

  // Editing the section itself
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-semibold">{def.label}</h3>
      {def.blockTypes.length > 0 && <BlocksList sectionId={section.id} />}
      {def.settingsSchema.map((f) => (
        <FieldDispatcher key={f.key} field={f} value={section.settings[f.key]}
          onChange={(v) => updateSectionSettings(section.id, { [f.key]: v as never })} />
      ))}
      <div className="border-t pt-3">
        <button onClick={() => setCustomCssOpen((v) => !v)} className="flex w-full items-center justify-between text-xs font-medium text-neutral-500">
          Custom CSS <ChevronDown className={`h-3 w-3 transition-transform ${customCssOpen ? 'rotate-180' : ''}`} />
        </button>
        {customCssOpen && (
          <textarea
            value={(section.settings.custom_css as string) ?? ''}
            onChange={(e) => updateSectionSettings(section.id, { custom_css: e.target.value })}
            rows={6}
            spellCheck={false}
            className="mt-2 w-full rounded border border-neutral-200 p-2 font-mono text-xs"
          />
        )}
      </div>
    </div>
  )
}
