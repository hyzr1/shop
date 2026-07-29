import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasPageBannerSettings: FieldSchema[] = [
  { type: 'text', key: 'numbered_label', label: 'Numbered label (monospace)', default: '04 / Index' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'The catalogue,' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'in full.' },
  { type: 'textarea', key: 'lede', label: 'Lede', default: '', rows: 3 },
  { type: 'text', key: 'meta_left', label: 'Top meta · left', default: 'Updated · seasonally' },
  { type: 'text', key: 'meta_right', label: 'Top meta · right', default: '24 objects · 4 categories' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#211b17' },
  {
    type: 'select', key: 'scheme', label: 'Scheme', default: 'dark',
    options: [
      { value: 'dark', label: 'Dark (paper on ink)' },
      { value: 'light', label: 'Light (ink on paper)' },
    ],
  },
]

export const atlasPageBannerBlocks: BlockTypeSchema[] = []

export const atlasPageBannerDefaults = {
  settings: {
    numbered_label: '04 / Index',
    heading_line1: 'The catalogue,',
    heading_line2: 'in full.',
    lede: '',
    meta_left: 'Updated · seasonally',
    meta_right: '24 objects · 4 categories',
    background_color: '#211b17',
    scheme: 'dark',
  },
  blocks: [],
}
