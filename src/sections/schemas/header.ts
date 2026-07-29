import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const headerSettings: FieldSchema[] = [
  { type: 'header', key: 'brand_section', label: 'Brand' },
  { type: 'text', key: 'brand_text', label: 'Brand text', default: 'Pulse' },
  {
    type: 'select', key: 'brand_icon', label: 'Brand icon', default: 'zap',
    options: [
      { value: 'zap', label: 'Lightning bolt' },
      { value: 'sparkles', label: 'Sparkles' },
      { value: 'circle', label: 'Circle' },
    ],
  },
  { type: 'header', key: 'logo_section', label: 'Logo (overrides brand mark)' },
  { type: 'image', key: 'logo', label: 'Logo image' },
  { type: 'number', key: 'logo_width', label: 'Logo width (px)', default: 120, min: 40, max: 400 },
  { type: 'header', key: 'behavior_section', label: 'Behavior' },
  { type: 'checkbox', key: 'sticky', label: 'Sticky header', default: true },
  { type: 'checkbox', key: 'show_search', label: 'Show search icon', default: false },
  { type: 'checkbox', key: 'show_cart', label: 'Show cart icon', default: false },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const headerBlocks: BlockTypeSchema[] = [
  {
    type: 'menu-link',
    label: 'Menu link',
    defaultSettings: { label: 'Link', url: '/' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label', placeholder: 'Product' },
      { type: 'link', key: 'url', label: 'Link' },
    ],
    limit: 8,
  },
  {
    type: 'action-button',
    label: 'Action button',
    defaultSettings: { label: 'Get started', link: '#', style: 'primary' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label', placeholder: 'Get started' },
      { type: 'link', key: 'link', label: 'Link' },
      {
        type: 'select', key: 'style', label: 'Style', default: 'primary',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'ghost', label: 'Ghost' },
        ],
      },
    ],
    limit: 4,
  },
]

export const headerDefaults = {
  settings: {
    brand_text: 'Pulse',
    brand_icon: 'zap',
    sticky: true,
    show_search: false,
    show_cart: false,
    color_scheme: 'scheme_1',
    logo_width: 120,
  },
  blocks: [
    { type: 'menu-link', settings: { label: 'Product', url: '#' } },
    { type: 'menu-link', settings: { label: 'Features', url: '#features' } },
    { type: 'menu-link', settings: { label: 'Pricing', url: '#pricing' } },
    { type: 'menu-link', settings: { label: 'Customers', url: '#testimonials' } },
    { type: 'menu-link', settings: { label: 'Docs', url: '#' } },
    { type: 'action-button', settings: { label: 'Sign in', link: '#', style: 'ghost' } },
    { type: 'action-button', settings: { label: 'Get started', link: '#', style: 'primary' } },
  ],
}
