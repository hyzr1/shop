import { describe, it, expect } from 'vitest'
import { sectionSchema, pageSchema } from '@/sections/schema'

describe('sectionSchema', () => {
  it('accepts a minimal valid section', () => {
    const result = sectionSchema.safeParse({
      id: 'sec_abc',
      type: 'image-banner',
      settings: {},
      blocks: [],
      disabled: false,
    })
    expect(result.success).toBe(true)
  })

  it('rejects a section missing required fields', () => {
    const result = sectionSchema.safeParse({ id: 'sec_abc' })
    expect(result.success).toBe(false)
  })

  it('defaults blocks to empty array and disabled to false', () => {
    const parsed = sectionSchema.parse({ id: 's1', type: 'rich-text', settings: {} })
    expect(parsed.blocks).toEqual([])
    expect(parsed.disabled).toBe(false)
  })
})

describe('pageSchema', () => {
  it('accepts a valid page', () => {
    const result = pageSchema.safeParse({
      id: 'pg_1',
      slug: 'home',
      page_type: 'home',
      title: 'Home',
      sections: [{ id: 's1', type: 'header', settings: {} }],
    })
    expect(result.success).toBe(true)
  })

  it('rejects an invalid page_type', () => {
    const result = pageSchema.safeParse({
      id: 'pg_1', slug: 'home', page_type: 'bogus', title: '', sections: [],
    })
    expect(result.success).toBe(false)
  })
})
