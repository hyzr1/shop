import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasRailNavSettings: FieldSchema[] = [
  { type: 'header', key: 'brand_section', label: 'Brand' },
  { type: 'text', key: 'brand_text', label: 'Brand text', default: 'ATLAS' },
  { type: 'header', key: 'bottom_section', label: 'Bottom counter' },
  { type: 'text', key: 'bottom_label', label: 'Bottom label', default: 'Selected works / 18' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'range', key: 'background_opacity', label: 'Background opacity', default: 0.78, min: 0, max: 1, step: 0.01 },
  { type: 'color', key: 'border_color', label: 'Border color', default: 'rgba(232,223,210,.18)' },
  { type: 'color', key: 'background_color', label: 'Ink color', default: '#171411' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#e8dfd2' },
]

export const atlasRailNavBlocks: BlockTypeSchema[] = [
  {
    type: 'rail-link',
    label: 'Rail link',
    defaultSettings: { label: 'Link', url: '#' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label', default: 'Link' },
      { type: 'link', key: 'url', label: 'URL', default: '#' },
    ],
    limit: 6,
  },
]

export const atlasRailNavDefaults = {
  settings: {
    brand_text: 'ATLAS',
    bottom_label: 'Selected works / 18',
    background_opacity: 0.78,
    border_color: 'rgba(232,223,210,.18)',
    background_color: '#171411',
    text_color: '#e8dfd2',
  },
  blocks: [
    { type: 'rail-link', settings: { label: 'Work', url: '#work' } },
    { type: 'rail-link', settings: { label: 'Method', url: '#method' } },
    { type: 'rail-link', settings: { label: 'Studio', url: '#studio' } },
    { type: 'rail-link', settings: { label: 'Contact', url: '#contact' } },
  ],
}
