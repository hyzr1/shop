import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaStoryQuoteSettings: FieldSchema[] = [
  {
    type: 'select', key: 'icon', label: 'Icon', default: 'leaf',
    options: [
      { value: 'leaf', label: 'Leaf' },
      { value: 'circle', label: 'Circle' },
      { value: 'sparkles', label: 'Sparkles' },
    ],
  },
  { type: 'textarea', key: 'quote', label: 'Quote', rows: 3, default: '"We make fewer things, with more of what the skin recognizes."' },
  { type: 'textarea', key: 'body', label: 'Body', rows: 4, default: 'OLÉA began between a family olive grove and a formulation studio. We pair inherited plant knowledge with modern skin science, keeping every formula purposeful, traceable, and sensorial.' },
  { type: 'text', key: 'cta_label', label: 'CTA label', default: 'Read our story' },
  { type: 'link', key: 'cta_link', label: 'CTA link', default: '#journal' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#e4dac8' },
]

export const oleaStoryQuoteBlocks: BlockTypeSchema[] = []

export const oleaStoryQuoteDefaults = {
  settings: {
    icon: 'leaf',
    quote: '"We make fewer things, with more of what the skin recognizes."',
    body: 'OLÉA began between a family olive grove and a formulation studio. We pair inherited plant knowledge with modern skin science, keeping every formula purposeful, traceable, and sensorial.',
    cta_label: 'Read our story',
    cta_link: '#journal',
    background_color: '#e4dac8',
  },
  blocks: [],
}
