import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaFooterMinimalSettings: FieldSchema[] = [
  { type: 'text', key: 'brand_text', label: 'Brand text', default: 'OLÉA' },
  { type: 'text', key: 'tagline', label: 'Tagline', default: 'Botanical skin rituals made between land and laboratory.' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#1e241c' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#969d8e' },
  { type: 'color', key: 'brand_color', label: 'Brand color', default: '#ece8dc' },
]

export const oleaFooterMinimalBlocks: BlockTypeSchema[] = [
  {
    type: 'footer-link',
    label: 'Footer link',
    defaultSettings: { label: 'Shop', url: '#shop' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label', default: 'Shop' },
      { type: 'link', key: 'url', label: 'URL', default: '#' },
    ],
    limit: 6,
  },
]

export const oleaFooterMinimalDefaults = {
  settings: {
    brand_text: 'OLÉA',
    tagline: 'Botanical skin rituals made between land and laboratory.',
    background_color: '#1e241c',
    text_color: '#969d8e',
    brand_color: '#ece8dc',
  },
  blocks: [
    { type: 'footer-link', settings: { label: 'Shop', url: '#shop' } },
    { type: 'footer-link', settings: { label: 'Story', url: '#story' } },
    { type: 'footer-link', settings: { label: 'Instagram', url: '#stockists' } },
  ],
}
