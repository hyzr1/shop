import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { ICON_OPTIONS } from './icon-features-grid'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const pricingSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Simple pricing' },
  { type: 'select', key: 'eyebrow_icon', label: 'Eyebrow icon', default: 'bar-chart', options: ICON_OPTIONS },
  { type: 'text', key: 'heading', label: 'Heading', default: 'Plans that scale with you.' },
  { type: 'textarea', key: 'lede', label: 'Lede', default: 'Start free. Upgrade when you’re ready. No surprises.', rows: 2 },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const pricingBlocks: BlockTypeSchema[] = [
  {
    type: 'tier',
    label: 'Tier',
    defaultSettings: {
      plan_name: 'Plan',
      price: '$0',
      price_period: '/mo',
      description: 'Describe this plan.',
      features_text: 'Feature one\nFeature two\nFeature three',
      cta_label: 'Get started',
      cta_link: '#',
      featured: false,
    },
    settingsSchema: [
      { type: 'text', key: 'plan_name', label: 'Plan name' },
      { type: 'text', key: 'price', label: 'Price (e.g. $20)' },
      { type: 'text', key: 'price_period', label: 'Period (e.g. /mo)' },
      { type: 'text', key: 'description', label: 'Description' },
      { type: 'textarea', key: 'features_text', label: 'Features (one per line)', rows: 5 },
      { type: 'text', key: 'cta_label', label: 'CTA label' },
      { type: 'link', key: 'cta_link', label: 'CTA link' },
      { type: 'checkbox', key: 'featured', label: 'Featured (Most popular)' },
    ],
  },
]

export const pricingDefaults = {
  settings: {
    eyebrow_text: 'Simple pricing',
    eyebrow_icon: 'bar-chart',
    heading: 'Plans that scale with you.',
    lede: 'Start free. Upgrade when you’re ready. No surprises.',
    color_scheme: 'scheme_1',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    {
      type: 'tier',
      settings: {
        plan_name: 'Starter',
        price: '$0',
        price_period: '/mo',
        description: 'For individuals getting started.',
        features_text: 'Up to 3 projects\nCommunity support\n1 GB storage',
        cta_label: 'Start free',
        cta_link: '#',
        featured: false,
      },
    },
    {
      type: 'tier',
      settings: {
        plan_name: 'Pro',
        price: '$20',
        price_period: '/mo',
        description: 'For growing teams that ship fast.',
        features_text: 'Unlimited projects\nLive analytics\nPriority support\n100 GB storage',
        cta_label: 'Start free trial',
        cta_link: '#',
        featured: true,
      },
    },
    {
      type: 'tier',
      settings: {
        plan_name: 'Scale',
        price: '$60',
        price_period: '/mo',
        description: 'For organizations at scale.',
        features_text: 'Everything in Pro\nSSO & SAML\nAudit logs\nDedicated CSM',
        cta_label: 'Contact sales',
        cta_link: '#',
        featured: false,
      },
    },
  ],
}
