import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const newsletterSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Subscribe to our newsletter' },
  { type: 'textarea', key: 'subhead', label: 'Subheading', default: '', rows: 2 },
  { type: 'text', key: 'placeholder', label: 'Input placeholder', default: 'your@email.com' },
  { type: 'text', key: 'button_label', label: 'Button label', default: 'Subscribe' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const newsletterBlocks: BlockTypeSchema[] = []

export const newsletterDefaults = {
  settings: {
    heading: 'Subscribe',
    subhead: 'News & releases.',
    placeholder: 'your@email.com',
    button_label: 'Subscribe',
    color_scheme: 'scheme_1',
  },
  blocks: [],
}
