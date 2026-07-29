'use client'

import { useEffect, useState } from 'react'
import { EditorTopbar } from './topbar'
import { SectionTree } from './tree/section-tree'
import { PreviewIframe } from './preview/preview-iframe'
import { SettingsPanel } from './settings/settings-panel'
import { AddSectionModal } from './modals/add-section-modal'
import { ThemePanel } from './theme-panel'
import { useEditorStore } from '@/lib/editor/store'
import { useAutosave } from '@/lib/editor/autosave'

interface Props {
  siteId: string
}

export function EditorShell({ siteId }: Props) {
  const init = useEditorStore((s) => s.init)
  const [leftWidth, setLeftWidth] = useState(280)
  const [rightWidth, setRightWidth] = useState(320)

  useEffect(() => {
    init(siteId, 'home')
  }, [siteId, init])

  useAutosave()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key === 's') {
        e.preventDefault()
        useEditorStore.getState().save()
      }
      if (meta && !e.shiftKey && e.key === 'z') {
        e.preventDefault()
        useEditorStore.getState().undo()
      }
      if (meta && ((e.shiftKey && e.key === 'z') || e.key === 'y')) {
        e.preventDefault()
        useEditorStore.getState().redo()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col bg-neutral-100 text-neutral-900">
      <EditorTopbar />
      <div className="flex flex-1 overflow-hidden">
        <aside
          style={{ width: leftWidth }}
          className="shrink-0 overflow-y-auto border-r border-neutral-200 bg-white"
        >
          <SectionTree />
        </aside>
        <Divider
          onResize={(dx) =>
            setLeftWidth((w) => Math.min(420, Math.max(220, w + dx)))
          }
        />
        <main className="flex flex-1 items-center justify-center bg-neutral-200">
          <PreviewIframe />
        </main>
        <Divider
          onResize={(dx) =>
            setRightWidth((w) => Math.min(420, Math.max(260, w - dx)))
          }
        />
        <aside
          style={{ width: rightWidth }}
          className="shrink-0 overflow-y-auto border-l border-neutral-200 bg-white"
        >
          <SettingsPanel />
        </aside>
      </div>
      <AddSectionModal />
      <ThemePanel />
    </div>
  )
}

function Divider({ onResize }: { onResize: (dx: number) => void }) {
  return (
    <div
      role="separator"
      className="w-px cursor-col-resize bg-neutral-200 transition-colors hover:bg-neutral-400"
      onMouseDown={(e) => {
        e.preventDefault()
        const startX = e.clientX
        let lastX = startX
        const onMove = (ev: MouseEvent) => {
          onResize(ev.clientX - lastX)
          lastX = ev.clientX
        }
        const onUp = () => {
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('mouseup', onUp)
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
      }}
    />
  )
}
