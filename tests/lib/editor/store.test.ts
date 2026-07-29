import { describe, it, expect, beforeEach } from 'vitest'
import { useEditorStore } from '@/lib/editor/store'

describe('editor store', () => {
  beforeEach(() => {
    useEditorStore.setState({ ...useEditorStore.getInitialState() }, true)
  })

  it('selects a section', () => {
    useEditorStore.getState().selectSection('sec_1')
    expect(useEditorStore.getState().selectedSectionId).toBe('sec_1')
  })

  it('updates a section setting', () => {
    useEditorStore.setState({
      page: {
        id: 'p1',
        slug: 'home',
        page_type: 'home',
        title: 'Home',
        sections: [
          {
            id: 'sec_1',
            type: 'image-banner',
            settings: { heading: 'A' },
            blocks: [],
            disabled: false,
          },
        ],
      },
    })
    useEditorStore.getState().updateSectionSettings('sec_1', { heading: 'B' })
    const sec = useEditorStore.getState().page!.sections.find((s) => s.id === 'sec_1')!
    expect(sec.settings.heading).toBe('B')
  })

  it('reorders sections', () => {
    useEditorStore.setState({
      page: {
        id: 'p1',
        slug: 'home',
        page_type: 'home',
        title: 'Home',
        sections: [
          { id: 'a', type: 'rich-text', settings: {}, blocks: [], disabled: false },
          { id: 'b', type: 'rich-text', settings: {}, blocks: [], disabled: false },
          { id: 'c', type: 'rich-text', settings: {}, blocks: [], disabled: false },
        ],
      },
    })
    useEditorStore.getState().reorderSections(['c', 'a', 'b'])
    expect(useEditorStore.getState().page!.sections.map((s) => s.id)).toEqual(['c', 'a', 'b'])
  })
})
