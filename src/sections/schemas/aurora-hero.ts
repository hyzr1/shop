import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

const TONE_OPTIONS = [
  { value: 'warm', label: 'Warm (lavender)' },
  { value: 'cool', label: 'Cool (sky)' },
  { value: 'neutral', label: 'Neutral (amber)' },
  { value: 'amber', label: 'Amber (meadow)' },
  { value: 'rose', label: 'Rose (blush)' },
  { value: 'olive', label: 'Olive (orchid)' },
]

export const auroraHeroSettings: FieldSchema[] = [
  { type: 'header', key: 'content_section', label: 'Content' },
  { type: 'text', key: 'badge_text', label: 'Badge text', default: 'Autumn / Winter · New collection' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'The new season,' },
  { type: 'text', key: 'heading_italic', label: 'Heading italic word', default: 'defined' },
  { type: 'text', key: 'heading_after', label: 'Heading line 2 (after italic)', default: 'by you.' },
  { type: 'textarea', key: 'lede', label: 'Lede paragraph', default: 'Considered clothing in natural fibers — designed in studio, made to last, and shipped carbon-neutral to your door.', rows: 3 },
  { type: 'header', key: 'cta_section', label: 'Call to action' },
  { type: 'text', key: 'cta1_label', label: 'Primary CTA label', default: 'Shop the collection' },
  { type: 'link', key: 'cta1_url', label: 'Primary CTA URL', default: '#' },
  { type: 'text', key: 'cta2_label', label: 'Secondary CTA label', default: 'Explore lookbook' },
  { type: 'link', key: 'cta2_url', label: 'Secondary CTA URL', default: '#' },
]

export const auroraHeroBlocks: BlockTypeSchema[] = [
  {
    type: 'hero-shot',
    label: 'Hero shot',
    defaultSettings: { tone: 'warm', category: 'Knitwear', price: '$148' },
    settingsSchema: [
      { type: 'select', key: 'tone', label: 'Tone (gradient)', default: 'warm', options: TONE_OPTIONS },
      { type: 'text', key: 'category', label: 'Category', default: 'Knitwear' },
      { type: 'text', key: 'price', label: 'Price', default: '$148' },
    ],
    limit: 3,
  },
]

export const auroraHeroDefaults = {
  settings: {
    badge_text: 'Autumn / Winter · New collection',
    heading_line1: 'The new season,',
    heading_italic: 'defined',
    heading_after: 'by you.',
    lede: 'Considered clothing in natural fibers — designed in studio, made to last, and shipped carbon-neutral to your door.',
    cta1_label: 'Shop the collection',
    cta1_url: '#',
    cta2_label: 'Explore lookbook',
    cta2_url: '#',
  },
  blocks: [
    { type: 'hero-shot', settings: { tone: 'warm', category: 'Knitwear', price: '$148' } },
    { type: 'hero-shot', settings: { tone: 'neutral', category: 'Outerwear', price: '$320' } },
    { type: 'hero-shot', settings: { tone: 'cool', category: 'Shirting', price: '$96' } },
  ],
}
