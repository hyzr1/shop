import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { WIDTH_OPTIONS } from '@/sections/lib/layout'

export const pulseCollectionGridSettings: FieldSchema[] = [
  {
    type: 'select', key: 'columns', label: 'Columns', default: '4',
    options: [
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
  },
  {
    type: 'select', key: 'card_style', label: 'Card style', default: 'soft',
    options: [
      { value: 'soft', label: 'Minimal (no card)' },
      { value: 'card', label: 'Bordered card' },
    ],
  },
  { type: 'checkbox', key: 'show_filters', label: 'Show filters', default: true },
  { type: 'checkbox', key: 'show_count', label: 'Show result count', default: true },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const pulseCollectionGridBlocks: BlockTypeSchema[] = []

export const pulseCollectionGridDefaults = {
  settings: {
    columns: '4',
    card_style: 'soft',
    show_filters: true,
    show_count: true,
    color_scheme: 'scheme_1',
    container_width: 'normal',
  },
  blocks: [],
}
