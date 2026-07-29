import { create, type StateCreator } from 'zustand'
import { temporal } from 'zundo'
import type { Page, Section, SectionType, SettingValue } from '@/sections/types'
import { getSection } from '@/sections/registry'

type Device = 'desktop' | 'tablet' | 'mobile'

export interface EditorState {
  // Init context
  siteId: string
  currentSlug: string

  // Loaded page
  page: Page | null
  loadedAt: string | null // server's updated_at when we last loaded

  // Selection
  selectedSectionId: string | null
  selectedBlockId: string | null

  // Editor UI
  device: Device
  themePanelOpen: boolean
  addSectionModalOpen: boolean
  addSectionAtIndex: number | null

  // Status
  saving: boolean
  lastSavedAt: number | null
  isDirty: boolean
  saveConflict: boolean

  // Actions
  init: (siteId: string, slug: string) => Promise<void>
  switchPage: (slug: string) => Promise<void>
  selectSection: (id: string | null) => void
  selectBlock: (id: string | null) => void
  setDevice: (d: Device) => void
  openThemePanel: () => void
  closeThemePanel: () => void

  openAddSectionModal: (atIndex: number) => void
  closeAddSectionModal: () => void

  // Page mutations (tracked by zundo)
  updateSectionSettings: (
    sectionId: string,
    partial: Record<string, SettingValue>
  ) => void
  updateBlockSettings: (
    sectionId: string,
    blockId: string,
    partial: Record<string, SettingValue>
  ) => void
  reorderSections: (orderedIds: string[]) => void
  addSection: (type: string, atIndex?: number) => void
  removeSection: (id: string) => void
  duplicateSection: (id: string) => void
  toggleSectionDisabled: (id: string) => void
  addBlock: (sectionId: string, blockType: string) => void
  removeBlock: (sectionId: string, blockId: string) => void
  reorderBlocks: (sectionId: string, orderedIds: string[]) => void

  // Persistence
  save: () => Promise<void>
  hasUnsaved: () => boolean

  // Undo (delegated to zundo via separate hook)
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

function uid(prefix = 'sec'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

// Explicit StateCreator typing keeps the inner `set`/`get` properly typed across
// the zundo temporal middleware (otherwise TS narrows `page: null` and friends).
const editorStateCreator: StateCreator<EditorState, [], [], EditorState> = (
  set,
  get
) => ({
  siteId: '',
  currentSlug: 'home',
  page: null,
  loadedAt: null,
  selectedSectionId: null,
  selectedBlockId: null,
  device: 'desktop',
  themePanelOpen: false,
  addSectionModalOpen: false,
  addSectionAtIndex: null,
  saving: false,
  lastSavedAt: null,
  isDirty: false,
  saveConflict: false,

  init: async (siteId, slug) => {
    set({
      siteId,
      currentSlug: slug,
      page: null,
      selectedSectionId: null,
      selectedBlockId: null,
      isDirty: false,
      lastSavedAt: null,
    })
    await get().switchPage(slug)
    // If the requested slug didn't exist, fall back to the first available page
    if (!get().page) {
      try {
        const res = await fetch(`/api/sites/${siteId}/pages`)
        if (res.ok) {
          const pages = (await res.json()) as Array<{ slug: string }>
          if (pages.length > 0) {
            await get().switchPage(pages[0].slug)
          }
        }
      } catch {
        /* leave page null; the tree will show its empty state */
      }
    }
  },

  switchPage: async (slug) => {
    const { siteId } = get()
    const res = await fetch(`/api/sites/${siteId}/pages/${slug}`)
    if (!res.ok) {
      set({ page: null })
      return
    }
    const row = await res.json()
    const sections: Section[] = row.draft_sections ?? row.sections ?? []
    set({
      currentSlug: slug,
      page: { ...row, sections } as Page,
      loadedAt: row.updated_at,
      selectedSectionId: null,
      selectedBlockId: null,
      isDirty: false,
    })
    useEditorStore.temporal.getState().clear()
  },

  selectSection: (id) => set({ selectedSectionId: id, selectedBlockId: null }),
  selectBlock: (id) => set({ selectedBlockId: id }),
  setDevice: (d) => set({ device: d }),
  openThemePanel: () => set({ themePanelOpen: true }),
  closeThemePanel: () => set({ themePanelOpen: false }),

  openAddSectionModal: (atIndex) =>
    set({ addSectionModalOpen: true, addSectionAtIndex: atIndex }),
  closeAddSectionModal: () =>
    set({ addSectionModalOpen: false, addSectionAtIndex: null }),

  updateSectionSettings: (sectionId, partial) =>
    set((s) => {
      if (!s.page) return s
      return {
        page: {
          ...s.page,
          sections: s.page.sections.map((sec) =>
            sec.id === sectionId
              ? { ...sec, settings: { ...sec.settings, ...partial } }
              : sec
          ),
        },
        isDirty: true,
      }
    }),

  updateBlockSettings: (sectionId, blockId, partial) =>
    set((s) => {
      if (!s.page) return s
      return {
        page: {
          ...s.page,
          sections: s.page.sections.map((sec) =>
            sec.id === sectionId
              ? {
                  ...sec,
                  blocks: sec.blocks.map((b) =>
                    b.id === blockId
                      ? { ...b, settings: { ...b.settings, ...partial } }
                      : b
                  ),
                }
              : sec
          ),
        },
        isDirty: true,
      }
    }),

  reorderSections: (orderedIds) =>
    set((s) => {
      if (!s.page) return s
      const byId = new Map(s.page.sections.map((sec) => [sec.id, sec]))
      const next = orderedIds
        .map((id) => byId.get(id))
        .filter((sec): sec is Section => Boolean(sec))
      return { page: { ...s.page, sections: next }, isDirty: true }
    }),

  addSection: (type, atIndex) =>
    set((s) => {
      if (!s.page) return s
      const def = getSection(type as SectionType)
      if (!def) return s
      const newSec: Section = {
        id: uid('sec'),
        type: def.type,
        settings: { ...def.defaultSettings } as Section['settings'],
        blocks: (def.defaultBlocks ?? []).map((b) => ({
          id: uid('blk'),
          type: b.type,
          settings: { ...b.settings } as Section['settings'],
        })),
        disabled: false,
      }
      const next = [...s.page.sections]
      const idx = atIndex ?? next.length
      next.splice(idx, 0, newSec)
      return {
        page: { ...s.page, sections: next },
        selectedSectionId: newSec.id,
        isDirty: true,
      }
    }),

  removeSection: (id) =>
    set((s) => {
      if (!s.page) return s
      return {
        page: {
          ...s.page,
          sections: s.page.sections.filter((sec) => sec.id !== id),
        },
        selectedSectionId: null,
        isDirty: true,
      }
    }),

  duplicateSection: (id) =>
    set((s) => {
      if (!s.page) return s
      const src = s.page.sections.find((sec) => sec.id === id)
      if (!src) return s
      const copy: Section = {
        ...src,
        id: uid('sec'),
        blocks: src.blocks.map((b) => ({ ...b, id: uid('blk') })),
      }
      const idx = s.page.sections.findIndex((sec) => sec.id === id)
      const next = [...s.page.sections]
      next.splice(idx + 1, 0, copy)
      return { page: { ...s.page, sections: next }, isDirty: true }
    }),

  toggleSectionDisabled: (id) =>
    set((s) => {
      if (!s.page) return s
      return {
        page: {
          ...s.page,
          sections: s.page.sections.map((sec) =>
            sec.id === id ? { ...sec, disabled: !sec.disabled } : sec
          ),
        },
        isDirty: true,
      }
    }),

  addBlock: (sectionId, blockType) =>
    set((s) => {
      if (!s.page) return s
      const section = s.page.sections.find((sec) => sec.id === sectionId)
      if (!section) return s
      const def = getSection(section.type)
      const blockDef = def?.blockTypes.find((bt) => bt.type === blockType)
      if (!blockDef) return s
      const newBlock = {
        id: uid('blk'),
        type: blockType,
        settings: { ...blockDef.defaultSettings } as Section['settings'],
      }
      return {
        page: {
          ...s.page,
          sections: s.page.sections.map((sec) =>
            sec.id === sectionId
              ? { ...sec, blocks: [...sec.blocks, newBlock] }
              : sec
          ),
        },
        selectedBlockId: newBlock.id,
        isDirty: true,
      }
    }),

  removeBlock: (sectionId, blockId) =>
    set((s) => {
      if (!s.page) return s
      return {
        page: {
          ...s.page,
          sections: s.page.sections.map((sec) =>
            sec.id === sectionId
              ? { ...sec, blocks: sec.blocks.filter((b) => b.id !== blockId) }
              : sec
          ),
        },
        isDirty: true,
      }
    }),

  reorderBlocks: (sectionId, orderedIds) =>
    set((s) => {
      if (!s.page) return s
      return {
        page: {
          ...s.page,
          sections: s.page.sections.map((sec) => {
            if (sec.id !== sectionId) return sec
            const byId = new Map(sec.blocks.map((b) => [b.id, b]))
            const blocks = orderedIds
              .map((id) => byId.get(id))
              .filter((b): b is Section['blocks'][number] => Boolean(b))
            return { ...sec, blocks }
          }),
        },
        isDirty: true,
      }
    }),

  save: async () => {
    const { siteId, currentSlug, page, loadedAt, saving } = get()
    if (!page || saving) return
    set({ saving: true })
    const res = await fetch(`/api/sites/${siteId}/pages/${currentSlug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        draft_sections: page.sections,
        expected_updated_at: loadedAt,
      }),
    })
    if (res.ok) {
      const updated = await res.json()
      set({
        saving: false,
        lastSavedAt: Date.now(),
        isDirty: false,
        loadedAt: updated.updated_at,
        saveConflict: false,
      })
    } else if (res.status === 409) {
      set({ saving: false, saveConflict: true })
    } else {
      set({ saving: false })
    }
  },

  hasUnsaved: () => get().isDirty,

  // The temporal middleware provides undo/redo via useEditorStore.temporal — wrap here for ergonomics
  undo: () => useEditorStore.temporal.getState().undo(),
  redo: () => useEditorStore.temporal.getState().redo(),
  canUndo: () => useEditorStore.temporal.getState().pastStates.length > 0,
  canRedo: () => useEditorStore.temporal.getState().futureStates.length > 0,
})

export const useEditorStore = create<EditorState>()(
  temporal(editorStateCreator, {
    limit: 50,
    partialize: (state) => ({ page: state.page }),
    handleSet: (handleSet) => {
      let lastT: ReturnType<typeof setTimeout> | null = null
      return (state) => {
        if (lastT) clearTimeout(lastT)
        lastT = setTimeout(() => handleSet(state), 200)
      }
    },
  })
)
