'use client'

import { useEditorStore } from '@/lib/editor/store'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DEFAULT_THEME_SETTINGS } from '@/lib/templates/defaults'
import type { ThemeSettings } from '@/sections/types'

export function ThemePanel() {
  const { themePanelOpen, closeThemePanel, siteId } = useEditorStore()
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME_SETTINGS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!themePanelOpen) return
    fetch(`/api/sites/${siteId}/theme`)
      .then((r) => r.json())
      .then((row) => {
        setTheme(row.settings)
        setLoaded(true)
      })
  }, [themePanelOpen, siteId])

  async function save() {
    await fetch(`/api/sites/${siteId}/theme`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: theme }),
    })
    closeThemePanel()
  }

  if (!themePanelOpen) return null
  if (!loaded) return null

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-96 overflow-y-auto border-l border-neutral-200 bg-white shadow-2xl">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-semibold">Theme settings</h3>
        <button
          onClick={closeThemePanel}
          className="rounded p-1 hover:bg-neutral-100"
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      <div className="space-y-6 p-4">
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Color scheme 1 (Light)
          </p>
          {(['background', 'text', 'accent', 'button', 'button_text'] as const).map((k) => (
            <div key={k} className="mt-2 flex items-center justify-between">
              <label className="text-xs capitalize">{k.replace('_', ' ')}</label>
              <input
                type="color"
                value={theme.colors.schemes.scheme_1[k]}
                onChange={(e) =>
                  setTheme({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      schemes: {
                        ...theme.colors.schemes,
                        scheme_1: {
                          ...theme.colors.schemes.scheme_1,
                          [k]: e.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </div>
          ))}
        </section>
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Color scheme 2 (Dark)
          </p>
          {(['background', 'text', 'accent', 'button', 'button_text'] as const).map((k) => (
            <div key={k} className="mt-2 flex items-center justify-between">
              <label className="text-xs capitalize">{k.replace('_', ' ')}</label>
              <input
                type="color"
                value={theme.colors.schemes.scheme_2[k]}
                onChange={(e) =>
                  setTheme({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      schemes: {
                        ...theme.colors.schemes,
                        scheme_2: {
                          ...theme.colors.schemes.scheme_2,
                          [k]: e.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </div>
          ))}
        </section>
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Typography
          </p>
          {(['heading_font', 'body_font'] as const).map((k) => (
            <div key={k} className="mt-2">
              <label className="text-xs capitalize">{k.replace('_', ' ')}</label>
              <input
                value={theme.typography[k].family}
                onChange={(e) =>
                  setTheme({
                    ...theme,
                    typography: {
                      ...theme.typography,
                      [k]: { ...theme.typography[k], family: e.target.value },
                    },
                  })
                }
                className="mt-1 w-full rounded border border-neutral-200 px-2 py-1 text-sm"
              />
            </div>
          ))}
        </section>
        <button
          onClick={save}
          className="w-full rounded bg-neutral-900 py-2 text-sm text-white"
        >
          Save theme
        </button>
      </div>
    </div>
  )
}
