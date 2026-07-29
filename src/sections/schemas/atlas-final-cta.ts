import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasFinalCtaSettings: FieldSchema[] = [
  { type: 'header', key: 'icon_section', label: 'Icon' },
  {
    type: 'select', key: 'icon', label: 'Icon', default: 'circle',
    options: [
      { value: 'circle', label: 'Circle (filled)' },
      { value: 'compass', label: 'Compass' },
      { value: 'grid', label: 'Grid' },
    ],
  },
  { type: 'header', key: 'content_section', label: 'Content' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Bring us the site.' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'We will find the architecture.' },
  { type: 'text', key: 'cta_label', label: 'CTA label', default: 'Begin a conversation' },
  { type: 'link', key: 'cta_url', label: 'CTA URL', default: '#top' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#a65e40' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#171411' },
  { type: 'color', key: 'button_color', label: 'Button background', default: '#171411' },
  { type: 'color', key: 'button_text_color', label: 'Button text', default: '#e8dfd2' },
]

export const atlasFinalCtaBlocks: BlockTypeSchema[] = []

export const atlasFinalCtaDefaults = {
  settings: {
    icon: 'circle',
    heading_line1: 'Bring us the site.',
    heading_line2: 'We will find the architecture.',
    cta_label: 'Begin a conversation',
    cta_url: '#top',
    background_color: '#a65e40',
    text_color: '#171411',
    button_color: '#171411',
    button_text_color: '#e8dfd2',
  },
  blocks: [],
}
