import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaHeaderSettings: FieldSchema[] = [
  { type: 'header', key: 'brand_section', label: 'Brand' },
  { type: 'text', key: 'brand_text', label: 'Brand text', default: 'OLÉA' },
  { type: 'text', key: 'brand_subtitle', label: 'Brand subtitle', default: 'Botanical skin laboratory' },
  { type: 'header', key: 'nav_section', label: 'Navigation' },
  { type: 'text', key: 'eyebrow_text', label: 'Nav eyebrow', default: 'Daily rituals / Made in small batches' },
  { type: 'header', key: 'cta_section', label: 'CTA' },
  { type: 'text', key: 'cta_label', label: 'CTA label', default: 'Find your ritual' },
  { type: 'link', key: 'cta_link', label: 'CTA link', default: '#ritual' },
  { type: 'header', key: 'tools_section', label: 'Tools' },
  { type: 'checkbox', key: 'show_search', label: 'Show search', default: true },
  { type: 'checkbox', key: 'show_bag', label: 'Show bag', default: true },
  { type: 'number', key: 'bag_count', label: 'Bag count (preview)', default: 0, min: 0, max: 99 },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background', default: 'rgba(244,239,229,.94)' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#1c2019' },
]

export const oleaHeaderBlocks: BlockTypeSchema[] = [
  {
    type: 'menu-link',
    label: 'Menu link',
    defaultSettings: { label: 'Link', url: '#' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label', placeholder: 'Formulas' },
      { type: 'link', key: 'url', label: 'Link' },
    ],
    limit: 8,
  },
]

export const oleaHeaderDefaults = {
  settings: {
    brand_text: 'OLÉA',
    brand_subtitle: 'Botanical skin laboratory',
    eyebrow_text: 'Daily rituals / Made in small batches',
    cta_label: 'Find your ritual',
    cta_link: '#ritual',
    show_search: true,
    show_bag: true,
    bag_count: 0,
    background_color: 'rgba(244,239,229,.94)',
    text_color: '#1c2019',
  },
  blocks: [
    { type: 'menu-link', settings: { label: 'Formulas', url: '#shop' } },
    { type: 'menu-link', settings: { label: 'Ritual finder', url: '#ritual' } },
    { type: 'menu-link', settings: { label: 'Ingredients', url: '#story' } },
    { type: 'menu-link', settings: { label: 'Journal', url: '#journal' } },
  ],
}
