import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const collectionGridSettings: FieldSchema[] = [
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const collectionGridBlocks: BlockTypeSchema[] = []

export const collectionGridDefaults = {
  settings: { color_scheme: 'scheme_1' },
  blocks: [],
}
