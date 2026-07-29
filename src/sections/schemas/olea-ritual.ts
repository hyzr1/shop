import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaRitualSettings: FieldSchema[] = [
  { type: 'header', key: 'copy_section', label: 'Copy' },
  { type: 'text', key: 'eyebrow', label: 'Eyebrow', default: 'The three-minute ritual' },
  { type: 'text', key: 'heading', label: 'Heading', default: "Care that follows the body's pace." },
  { type: 'textarea', key: 'lede', label: 'Lede', rows: 3, default: 'Warm the serum between your palms. Press, do not rub. Let the formula settle before sealing in moisture.' },
  { type: 'text', key: 'cta_label', label: 'CTA label', default: 'Build your ritual' },
  { type: 'link', key: 'cta_link', label: 'CTA link', default: '#shop' },
  { type: 'header', key: 'image_section', label: 'Image' },
  { type: 'image', key: 'image', label: 'Image' },
  { type: 'text', key: 'image_caption', label: 'Image caption', default: 'Evening light / olive grove, Puglia' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#253025' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#ede9dc' },
  { type: 'color', key: 'eyebrow_color', label: 'Eyebrow color', default: '#afb7a2' },
  { type: 'color', key: 'mute_color', label: 'Mute color', default: '#b7bcaf' },
]

export const oleaRitualBlocks: BlockTypeSchema[] = [
  {
    type: 'ritual-step',
    label: 'Ritual step',
    defaultSettings: { number: '01', heading: 'Prepare', body: "Cleanse without stripping the skin's natural oils." },
    settingsSchema: [
      { type: 'text', key: 'number', label: 'Number', default: '01' },
      { type: 'text', key: 'heading', label: 'Step heading', default: 'Prepare' },
      { type: 'textarea', key: 'body', label: 'Step body', rows: 2 },
    ],
    limit: 8,
  },
]

export const oleaRitualDefaults = {
  settings: {
    eyebrow: 'The three-minute ritual',
    heading: "Care that follows the body's pace.",
    lede: 'Warm the serum between your palms. Press, do not rub. Let the formula settle before sealing in moisture.',
    cta_label: 'Build your ritual',
    cta_link: '#shop',
    image: { url: '/templates/olea-hero.webp' },
    image_caption: 'Evening light / olive grove, Puglia',
    background_color: '#253025',
    text_color: '#ede9dc',
    eyebrow_color: '#afb7a2',
    mute_color: '#b7bcaf',
  },
  blocks: [
    { type: 'ritual-step', settings: { number: '01', heading: 'Prepare', body: "Cleanse without stripping the skin's natural oils." } },
    { type: 'ritual-step', settings: { number: '02', heading: 'Replenish', body: 'Apply serum while the skin is still lightly damp.' } },
    { type: 'ritual-step', settings: { number: '03', heading: 'Protect', body: 'Finish with a thin veil of barrier cream.' } },
  ],
}
