import { describe, it, expect } from 'vitest'
import { registerSection, getSection, listSections, hasSection } from '@/sections/registry'

describe('section registry', () => {
  it('registers and retrieves a section', () => {
    registerSection({
      type: 'rich-text',
      label: 'Rich text',
      category: 'marketing',
      Component: () => null,
      settingsSchema: [],
      blockTypes: [],
      defaultSettings: { heading: 'Hello' },
    })
    const s = getSection('rich-text')
    expect(s?.label).toBe('Rich text')
    expect(s?.defaultSettings.heading).toBe('Hello')
  })

  it('hasSection returns false for unknown type', () => {
    expect(hasSection('does-not-exist' as never)).toBe(false)
  })

  it('listSections returns all registered', () => {
    const all = listSections()
    expect(all.length).toBeGreaterThan(0)
    expect(all.find((s) => s.type === 'rich-text')).toBeTruthy()
  })
})
