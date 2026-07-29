import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasCartSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'The bag.' },
  { type: 'textarea', key: 'subheading', label: 'Subheading', default: 'Objects awaiting acquisition.', rows: 2 },
  { type: 'text', key: 'continue_label', label: 'Continue link label', default: 'Return to index' },
  { type: 'link', key: 'continue_url', label: 'Continue link URL', default: '/collections/all' },
  { type: 'text', key: 'checkout_label', label: 'Checkout button label', default: 'Acquire all' },
  { type: 'text', key: 'note_left', label: 'Footer note · label', default: 'Lead time' },
  { type: 'textarea', key: 'note_right', label: 'Footer note · body', default: 'Fabrication begins on confirmation. Allow 10–14 days.', rows: 2 },
  { type: 'color', key: 'background_color', label: 'Background', default: '#211b17' },
]

export const atlasCartBlocks: BlockTypeSchema[] = []

export const atlasCartDefaults = {
  settings: {
    heading: 'The bag.',
    subheading: 'Objects awaiting acquisition.',
    continue_label: 'Return to index',
    continue_url: '/collections/all',
    checkout_label: 'Acquire all',
    note_left: 'Lead time',
    note_right: 'Fabrication begins on confirmation. Allow 10–14 days.',
    background_color: '#211b17',
  },
  blocks: [],
}
