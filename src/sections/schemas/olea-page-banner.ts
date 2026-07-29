import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaPageBannerSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow', label: 'Eyebrow', default: 'Botanical apothecary' },
  { type: 'text', key: 'heading_before', label: 'Heading (before italic)', default: 'The' },
  { type: 'text', key: 'heading_italic', label: 'Heading italic accent', default: 'collection.' },
  { type: 'text', key: 'heading_after', label: 'Heading (after italic)', default: '' },
  { type: 'textarea', key: 'lede', label: 'Lede', default: '', rows: 3 },
  { type: 'text', key: 'note_index', label: 'Side note index', default: '01 / 03' },
  { type: 'textarea', key: 'note_text', label: 'Side note text (italic serif)', default: '', rows: 3 },
  { type: 'color', key: 'background_color', label: 'Background', default: '#e8dfce' },
  { type: 'color', key: 'italic_color', label: 'Italic accent color', default: '#695036' },
]

export const oleaPageBannerBlocks: BlockTypeSchema[] = []

export const oleaPageBannerDefaults = {
  settings: {
    eyebrow: 'Botanical apothecary',
    heading_before: 'The',
    heading_italic: 'collection.',
    heading_after: '',
    lede: '',
    note_index: '01 / 03',
    note_text: '',
    background_color: '#e8dfce',
    italic_color: '#695036',
  },
  blocks: [],
}
