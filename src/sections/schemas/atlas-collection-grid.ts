import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasCollectionGridSettings: FieldSchema[] = [
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
      { value: 'tone', label: 'Tone fills' },
      { value: 'photo', label: 'Photography' },
    ],
  },
  { type: 'checkbox', key: 'show_filters', label: 'Show filters', default: true },
  { type: 'color', key: 'background_color', label: 'Background', default: '#211b17' },
]

export const atlasCollectionGridBlocks: BlockTypeSchema[] = []

export const atlasCollectionGridDefaults = {
  settings: {
    columns: '3',
    card_style: 'tone',
    show_filters: true,
    background_color: '#211b17',
  },
  blocks: [],
}
