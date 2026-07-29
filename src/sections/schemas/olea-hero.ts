import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaHeroSettings: FieldSchema[] = [
  { type: 'header', key: 'eyebrow_section', label: 'Eyebrow' },
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow text', default: 'Botanical skin rituals' },
  { type: 'header', key: 'heading_section', label: 'Heading' },
  { type: 'text', key: 'heading_before', label: 'Heading (before italic)', default: 'Skin, returned to' },
  { type: 'text', key: 'heading_italic', label: 'Heading (italic accent)', default: 'rhythm.' },
  { type: 'text', key: 'heading_after', label: 'Heading (after italic)', default: '' },
  { type: 'color', key: 'italic_color', label: 'Italic color', default: '#695036' },
  { type: 'header', key: 'body_section', label: 'Body' },
  { type: 'textarea', key: 'lede', label: 'Lede', rows: 3, default: 'High-performance formulas rooted in Mediterranean botanicals, made slowly for skin that wants less noise.' },
  { type: 'text', key: 'cta_label', label: 'CTA label', default: 'Discover the collection' },
  { type: 'link', key: 'cta_link', label: 'CTA link', default: '#shop' },
  { type: 'header', key: 'media_section', label: 'Media' },
  { type: 'image', key: 'image', label: 'Hero image' },
  { type: 'text', key: 'image_caption', label: 'Image caption', default: 'The Daily Restoration Ritual' },
  { type: 'header', key: 'note_section', label: 'Note' },
  { type: 'text', key: 'note_index', label: 'Note index', default: '01 / 03' },
  { type: 'textarea', key: 'note_text', label: 'Note text', rows: 2, default: 'Cold-pressed olive leaf, fermented fig, and mineral-rich spring water.' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'left_background', label: 'Left background', default: '#e8dfce' },
]

export const oleaHeroBlocks: BlockTypeSchema[] = []

export const oleaHeroDefaults = {
  settings: {
    eyebrow_text: 'Botanical skin rituals',
    heading_before: 'Skin, returned to',
    heading_italic: 'rhythm.',
    heading_after: '',
    italic_color: '#695036',
    lede: 'High-performance formulas rooted in Mediterranean botanicals, made slowly for skin that wants less noise.',
    cta_label: 'Discover the collection',
    cta_link: '#shop',
    image: { url: '/templates/olea-hero.webp' },
    image_caption: 'The Daily Restoration Ritual',
    note_index: '01 / 03',
    note_text: 'Cold-pressed olive leaf, fermented fig, and mineral-rich spring water.',
    left_background: '#e8dfce',
  },
  blocks: [],
}
