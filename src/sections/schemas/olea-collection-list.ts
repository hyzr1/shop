import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaCollectionListSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow', label: 'Eyebrow', default: 'Library' },
  { type: 'text', key: 'heading_before', label: 'Heading before italic', default: 'Every' },
  { type: 'text', key: 'heading_italic', label: 'Heading italic', default: 'collection' },
  { type: 'text', key: 'heading_after', label: 'Heading after italic', default: '' },
  {
    type: 'textarea', key: 'lede', label: 'Lede',
    default: 'Curated edits of formulas grown with intent — from morning serums to body oils.',
    rows: 3,
  },
  {
    type: 'select', key: 'card_style', label: 'Card style', default: 'tone',
    options: [
      { value: 'tone', label: 'Tone illustrations' },
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
  { type: 'color', key: 'background_color', label: 'Background', default: '#f4efe5' },
  { type: 'color', key: 'italic_color', label: 'Italic / accent color', default: '#695036' },
]

export const oleaCollectionListBlocks: BlockTypeSchema[] = []

export const oleaCollectionListDefaults = {
  settings: {
    eyebrow: 'Library',
    heading_before: 'Every',
    heading_italic: 'collection',
    heading_after: '',
    lede: 'Curated edits of formulas grown with intent — from morning serums to body oils.',
    card_style: 'tone',
    columns: '3',
    background_color: '#f4efe5',
    italic_color: '#695036',
  },
  blocks: [],
}
