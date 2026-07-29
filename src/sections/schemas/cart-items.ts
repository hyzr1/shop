import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const cartItemsSettings: FieldSchema[] = [
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const cartItemsBlocks: BlockTypeSchema[] = []

export const cartItemsDefaults = {
  settings: { color_scheme: 'scheme_1' },
  blocks: [],
}
