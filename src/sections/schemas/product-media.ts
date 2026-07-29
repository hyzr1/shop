import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const productMediaSettings: FieldSchema[] = [
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const productMediaBlocks: BlockTypeSchema[] = []

export const productMediaDefaults = {
  settings: { color_scheme: 'scheme_1' },
  blocks: [],
}
