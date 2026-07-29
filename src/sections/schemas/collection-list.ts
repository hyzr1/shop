import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const collectionListSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Collections' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const collectionListBlocks: BlockTypeSchema[] = []

export const collectionListDefaults = {
  settings: { heading: 'Collections', color_scheme: 'scheme_1' },
  blocks: [],
}
