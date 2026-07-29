import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const footerSettings: FieldSchema[] = [
  { type: 'text', key: 'copyright', label: 'Copyright text', default: '© 2026 Pulse, Inc. · Built on Hyzr' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const footerBlocks: BlockTypeSchema[] = [
  {
    type: 'brand',
    label: 'Brand block',
    defaultSettings: {
      brand_text: 'Pulse',
      brand_icon: 'zap',
      tagline: 'The all-in-one platform for modern teams to plan, build, and ship — faster than ever.',
    },
    settingsSchema: [
      { type: 'text', key: 'brand_text', label: 'Brand text', default: 'Pulse' },
      {
        type: 'select', key: 'brand_icon', label: 'Brand icon', default: 'zap',
        options: [
          { value: 'zap', label: 'Zap' },
          { value: 'sparkles', label: 'Sparkles' },
          { value: 'circle', label: 'Circle' },
        ],
      },
      { type: 'textarea', key: 'tagline', label: 'Tagline', rows: 3 },
    ],
  },
  {
    type: 'link-list',
    label: 'Link list',
    defaultSettings: { heading: 'Shop', links_text: '' },
    settingsSchema: [
      { type: 'text', key: 'heading', label: 'Heading', default: 'Shop' },
      { type: 'textarea', key: 'links_text', label: 'Links (one per line: Label | /path)', rows: 4 },
    ],
  },
  {
    type: 'text',
    label: 'Text',
    defaultSettings: { heading: 'About', body: '' },
    settingsSchema: [
      { type: 'text', key: 'heading', label: 'Heading' },
      { type: 'textarea', key: 'body', label: 'Body', rows: 4 },
    ],
  },
  {
    type: 'social-icons',
    label: 'Social icons',
    defaultSettings: { twitter: '', instagram: '', facebook: '' },
    settingsSchema: [
      { type: 'text', key: 'twitter', label: 'Twitter URL' },
      { type: 'text', key: 'instagram', label: 'Instagram URL' },
      { type: 'text', key: 'facebook', label: 'Facebook URL' },
    ],
  },
  {
    type: 'bottom-links',
    label: 'Bottom-bar links',
    defaultSettings: {
      links_text: 'Privacy | /privacy\nTerms | /terms\nSecurity | /security',
    },
    settingsSchema: [
      { type: 'textarea', key: 'links_text', label: 'Links (one per line: Label | /path)', rows: 4 },
    ],
  },
]

export const footerDefaults = {
  settings: { copyright: '© 2026 Pulse, Inc. · Built on Hyzr', color_scheme: 'scheme_1' },
  blocks: [
    {
      type: 'brand',
      settings: {
        brand_text: 'Pulse',
        brand_icon: 'zap',
        tagline: 'The all-in-one platform for modern teams to plan, build, and ship — faster than ever.',
      },
    },
    {
      type: 'link-list',
      settings: {
        heading: 'Product',
        links_text: 'Features | #features\nIntegrations | #\nPricing | #pricing\nChangelog | /pages/changelog',
      },
    },
    {
      type: 'link-list',
      settings: {
        heading: 'Company',
        links_text: 'About | /pages/about\nBlog | /pages/blog\nCareers | /pages/careers\nContact | /pages/contact',
      },
    },
    {
      type: 'link-list',
      settings: {
        heading: 'Resources',
        links_text: 'Docs | /pages/docs\nAPI | /pages/api\nStatus | /pages/status\nCommunity | /pages/community',
      },
    },
    { type: 'social-icons', settings: { twitter: 'https://twitter.com', instagram: 'https://instagram.com', facebook: 'https://facebook.com' } },
    {
      type: 'bottom-links',
      settings: { links_text: 'Privacy | /privacy\nTerms | /terms\nSecurity | /security' },
    },
  ],
}
