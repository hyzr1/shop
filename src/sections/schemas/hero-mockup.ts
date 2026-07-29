import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const heroMockupSettings: FieldSchema[] = [
  { type: 'text', key: 'pill_tag', label: 'Pill tag', default: 'NEW' },
  { type: 'text', key: 'pill_text', label: 'Pill text', default: 'Pulse v2 is here — see what’s new' },
  { type: 'text', key: 'note', label: 'Note', default: 'No credit card required · Free 30-day trial · Cancel anytime' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const heroMockupBlocks: BlockTypeSchema[] = [
  {
    type: 'heading',
    label: 'Heading',
    defaultSettings: { text_before: 'Ship', highlight: 'faster', text_after: 'than ever.' },
    settingsSchema: [
      { type: 'text', key: 'text_before', label: 'Text before highlight' },
      { type: 'text', key: 'highlight', label: 'Highlighted word (gradient)' },
      { type: 'text', key: 'text_after', label: 'Text after highlight' },
    ],
  },
  {
    type: 'subheading',
    label: 'Subheading',
    defaultSettings: { text: 'The all-in-one platform for modern teams to plan, build, and launch — with the speed your roadmap deserves.' },
    settingsSchema: [
      { type: 'textarea', key: 'text', label: 'Text', rows: 3 },
    ],
  },
  {
    type: 'button',
    label: 'Button',
    defaultSettings: { label: 'Start for free', link: '#', style: 'primary' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label' },
      { type: 'link', key: 'link', label: 'Link' },
      {
        type: 'select', key: 'style', label: 'Style', default: 'primary',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'ghost', label: 'Ghost' },
        ],
      },
    ],
  },
]

export const heroMockupDefaults = {
  settings: {
    pill_tag: 'NEW',
    pill_text: 'Pulse v2 is here — see what’s new',
    note: 'No credit card required · Free 30-day trial · Cancel anytime',
    color_scheme: 'scheme_1',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    { type: 'heading', settings: { text_before: 'Ship', highlight: 'faster', text_after: 'than ever.' } },
    { type: 'subheading', settings: { text: 'The all-in-one platform for modern teams to plan, build, and launch — with the speed your roadmap deserves.' } },
    { type: 'button', settings: { label: 'Start for free', link: '#', style: 'primary' } },
    { type: 'button', settings: { label: 'Book a demo', link: '#', style: 'ghost' } },
  ],
}
