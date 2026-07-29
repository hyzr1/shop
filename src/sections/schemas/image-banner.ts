import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const imageBannerSettings: FieldSchema[] = [
  { type: 'image', key: 'image', label: 'Banner image' },
  { type: 'range', key: 'overlay_opacity', label: 'Overlay opacity (%)', default: 40, min: 0, max: 90, step: 5 },
  {
    type: 'select', key: 'height', label: 'Banner height', default: 'large',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
  {
    type: 'select', key: 'content_alignment', label: 'Content alignment', default: 'bottom-center',
    options: [
      { value: 'top-left', label: 'Top left' },
      { value: 'top-center', label: 'Top center' },
      { value: 'middle-center', label: 'Middle center' },
      { value: 'bottom-left', label: 'Bottom left' },
      { value: 'bottom-center', label: 'Bottom center' },
    ],
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_2' },
]

export const imageBannerBlocks: BlockTypeSchema[] = [
  {
    type: 'heading', label: 'Heading',
    defaultSettings: { text: 'Browse our latest products', size: 'xl' },
    settingsSchema: [
      { type: 'text', key: 'text', label: 'Text' },
      {
        type: 'select', key: 'size', label: 'Size', default: 'xl',
        options: [{ value: 'lg', label: 'Large' }, { value: 'xl', label: 'Extra large' }, { value: '2xl', label: '2X large' }],
      },
    ],
  },
  {
    type: 'subheading', label: 'Subheading',
    defaultSettings: { text: '' },
    settingsSchema: [{ type: 'textarea', key: 'text', label: 'Text', rows: 2 }],
  },
  {
    type: 'button', label: 'Button',
    defaultSettings: { label: 'Shop all', link: '/products', style: 'primary' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label' },
      { type: 'link', key: 'link', label: 'Link' },
      {
        type: 'select', key: 'style', label: 'Style', default: 'primary',
        options: [{ value: 'primary', label: 'Primary' }, { value: 'secondary', label: 'Secondary' }, { value: 'outline', label: 'Outline' }],
      },
    ],
  },
]

export const imageBannerDefaults = {
  settings: { overlay_opacity: 40, height: 'large', content_alignment: 'bottom-center', color_scheme: 'scheme_2' },
  blocks: [
    { type: 'heading', settings: { text: 'Browse our latest products', size: 'xl' } },
    { type: 'button', settings: { label: 'Shop all', link: '/products', style: 'primary' } },
  ],
}
