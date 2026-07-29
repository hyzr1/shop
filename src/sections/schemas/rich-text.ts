import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const richTextSettings: FieldSchema[] = [
  {
    type: 'select', key: 'width', label: 'Width', default: 'medium',
    options: [
      { value: 'narrow', label: 'Narrow' },
      { value: 'medium', label: 'Medium' },
      { value: 'full', label: 'Full' },
    ],
  },
  {
    type: 'select', key: 'align', label: 'Text alignment', default: 'left',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
    ],
  },
  {
    type: 'select', key: 'heading_size', label: 'Heading size', default: 'medium',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'xlarge', label: 'Extra large' },
    ],
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'medium', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const richTextBlocks: BlockTypeSchema[] = [
  {
    type: 'heading', label: 'Heading',
    defaultSettings: { text: 'Hello world' },
    settingsSchema: [{ type: 'text', key: 'text', label: 'Text' }],
  },
  {
    type: 'text', label: 'Text',
    defaultSettings: { body: '' },
    settingsSchema: [{ type: 'textarea', key: 'body', label: 'Body', rows: 4 }],
  },
  {
    type: 'button', label: 'Button',
    defaultSettings: { label: 'Learn more', link: '#' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label' },
      { type: 'link', key: 'link', label: 'Link' },
    ],
  },
]

export const richTextDefaults = {
  settings: {
    width: 'medium',
    align: 'left',
    heading_size: 'medium',
    color_scheme: 'scheme_1',
    section_padding: 'medium',
    container_width: 'normal',
  },
  blocks: [
    { type: 'heading', settings: { text: 'Talk about your brand' } },
    { type: 'text', settings: { body: 'Share information about your brand with your customers.' } },
  ],
}
