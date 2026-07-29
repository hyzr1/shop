import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasCollectionListSettings: FieldSchema[] = [
  { type: 'text', key: 'numbered_label', label: 'Numbered label', default: '06 / Sets' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Every site,' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'every study.' },
  {
    type: 'textarea', key: 'lede', label: 'Lede',
    default: 'The working directory of our collections — residential, cultural, hospitality, and furniture.',
    rows: 3,
  },
  {
    type: 'select', key: 'card_style', label: 'Card style', default: 'tone',
    options: [
      { value: 'tone', label: 'Tone fills' },
      { value: 'photo', label: 'Photography' },
    ],
  },
  {
    type: 'select', key: 'columns', label: 'Columns', default: '3',
    options: [
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
  },
  { type: 'color', key: 'background_color', label: 'Background', default: '#211b17' },
]

export const atlasCollectionListBlocks: BlockTypeSchema[] = []

export const atlasCollectionListDefaults = {
  settings: {
    numbered_label: '06 / Sets',
    heading_line1: 'Every site,',
    heading_line2: 'every study.',
    lede: 'The working directory of our collections — residential, cultural, hospitality, and furniture.',
    card_style: 'tone',
    columns: '3',
    background_color: '#211b17',
  },
  blocks: [],
}
