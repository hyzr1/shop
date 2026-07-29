import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const ICON_OPTIONS = [
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'zap', label: 'Zap' },
  { value: 'workflow', label: 'Workflow' },
  { value: 'bar-chart', label: 'Bar chart' },
  { value: 'shield', label: 'Shield' },
  { value: 'sun', label: 'Sun' },
  { value: 'bell', label: 'Bell' },
  { value: 'boxes', label: 'Boxes' },
  { value: 'git-branch', label: 'Git branch' },
]

export const iconFeaturesGridSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Everything you need' },
  { type: 'select', key: 'eyebrow_icon', label: 'Eyebrow icon', default: 'sparkles', options: ICON_OPTIONS },
  { type: 'text', key: 'heading', label: 'Heading', default: 'One platform. Every workflow.' },
  { type: 'textarea', key: 'lede', label: 'Lede', default: 'Replace a dozen disconnected tools with a single source of truth your whole team will love.', rows: 2 },
  { type: 'number', key: 'columns', label: 'Columns', default: 3, min: 2, max: 4 },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const iconFeaturesGridBlocks: BlockTypeSchema[] = [
  {
    type: 'feature',
    label: 'Feature',
    defaultSettings: { icon: 'sparkles', heading: 'Feature', body: 'Describe a key capability.' },
    settingsSchema: [
      { type: 'select', key: 'icon', label: 'Icon', default: 'sparkles', options: ICON_OPTIONS },
      { type: 'text', key: 'heading', label: 'Heading' },
      { type: 'textarea', key: 'body', label: 'Body', rows: 3 },
    ],
  },
]

export const iconFeaturesGridDefaults = {
  settings: {
    eyebrow_text: 'Everything you need',
    eyebrow_icon: 'sparkles',
    heading: 'One platform. Every workflow.',
    lede: 'Replace a dozen disconnected tools with a single source of truth your whole team will love.',
    columns: 3,
    color_scheme: 'scheme_1',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    { type: 'feature', settings: { icon: 'workflow', heading: 'Visual workflows', body: 'Design and automate any process with a drag-and-drop builder — no code required.' } },
    { type: 'feature', settings: { icon: 'bar-chart', heading: 'Live analytics', body: 'Real-time dashboards that turn raw activity into decisions your team can act on.' } },
    { type: 'feature', settings: { icon: 'git-branch', heading: 'Native integrations', body: 'Connect the 100+ tools you already use in a click. Two-way sync, always on.' } },
    { type: 'feature', settings: { icon: 'shield', heading: 'Enterprise security', body: 'SOC 2 Type II, SSO/SAML, and granular roles — secure by default.' } },
    { type: 'feature', settings: { icon: 'boxes', heading: 'Unlimited workspaces', body: 'Spin up a space for every team, client, or project with shared context.' } },
    { type: 'feature', settings: { icon: 'bell', heading: 'Smart alerts', body: 'Get notified the moment something needs you — never a second sooner.' } },
  ],
}
