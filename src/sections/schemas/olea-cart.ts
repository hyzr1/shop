import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaCartSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading (two words, second goes italic)', default: 'Your apothecary' },
  { type: 'text', key: 'continue_label', label: 'Continue link label', default: 'Continue browsing' },
  { type: 'link', key: 'continue_url', label: 'Continue link URL', default: '/collections/all' },
  { type: 'text', key: 'checkout_label', label: 'Checkout button label', default: 'Proceed to checkout' },
  { type: 'text', key: 'note_index', label: 'Side note index', default: 'A note' },
  { type: 'textarea', key: 'note_text', label: 'Side note text (italic serif)', default: 'Each order is hand-wrapped in linen-blend paper and tied with a sprig of dried olive.', rows: 3 },
  { type: 'color', key: 'background_color', label: 'Background', default: '#f4efe5' },
  { type: 'color', key: 'italic_color', label: 'Italic accent color', default: '#695036' },
]

export const oleaCartBlocks: BlockTypeSchema[] = []

export const oleaCartDefaults = {
  settings: {
    heading: 'Your apothecary',
    continue_label: 'Continue browsing',
    continue_url: '/collections/all',
    checkout_label: 'Proceed to checkout',
    note_index: 'A note',
    note_text: 'Each order is hand-wrapped in linen-blend paper and tied with a sprig of dried olive.',
    background_color: '#f4efe5',
    italic_color: '#695036',
  },
  blocks: [],
}
