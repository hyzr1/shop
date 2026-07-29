import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const collageSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Collage' },
  { type: 'image', key: 'image_1', label: 'Image 1' },
  { type: 'image', key: 'image_2', label: 'Image 2' },
  { type: 'image', key: 'image_3', label: 'Image 3' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const collageBlocks: BlockTypeSchema[] = []

export const collageDefaults = {
  settings: { heading: 'Collage', color_scheme: 'scheme_1' },
  blocks: [],
}
