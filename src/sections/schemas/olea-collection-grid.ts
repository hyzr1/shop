import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaCollectionGridSettings: FieldSchema[] = [
  {
    type: 'select', key: 'columns', label: 'Columns', default: '3',
    options: [
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
  },
  {
    type: 'select', key: 'card_style', label: 'Card style', default: 'tone',
    options: [
      { value: 'tone', label: 'Tone illustrations' },
      { value: 'photo', label: 'Photography' },
    ],
  },
  { type: 'checkbox', key: 'show_filters', label: 'Show filters', default: true },
  { type: 'text', key: 'brand_label', label: 'Brand label on bottles', default: 'OLÉA' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#f4efe5' },
]

export const oleaCollectionGridBlocks: BlockTypeSchema[] = []

export const oleaCollectionGridDefaults = {
  settings: {
    columns: '3',
    card_style: 'tone',
    show_filters: true,
    brand_label: 'OLÉA',
    background_color: '#f4efe5',
  },
  blocks: [],
}
