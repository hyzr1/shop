import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaIngredientsSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow', label: 'Eyebrow', default: 'Ingredient index' },
  { type: 'text', key: 'heading', label: 'Heading', default: 'Grown with a reason.' },
  { type: 'textarea', key: 'lede', label: 'Lede', rows: 2, default: 'Every ingredient earns its place through efficacy, origin, and how it feels on the skin.' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#f5f0e7' },
]

export const oleaIngredientsBlocks: BlockTypeSchema[] = [
  {
    type: 'ingredient',
    label: 'Ingredient',
    defaultSettings: { number: '01', name: 'Olive leaf', use: 'Antioxidant support', origin: 'Puglia', art_style: 'leaf' },
    settingsSchema: [
      { type: 'text', key: 'number', label: 'Number', default: '01' },
      { type: 'text', key: 'name', label: 'Name', default: 'Olive leaf' },
      { type: 'text', key: 'use', label: 'Use', default: 'Antioxidant support' },
      { type: 'text', key: 'origin', label: 'Origin', default: 'Puglia' },
      {
        type: 'select', key: 'art_style', label: 'Art style', default: 'leaf',
        options: [
          { value: 'leaf', label: 'Leaf (olive-green)' },
          { value: 'circle', label: 'Circle (warm brown)' },
          { value: 'seed', label: 'Seed (burgundy)' },
          { value: 'water', label: 'Water (mineral)' },
        ],
      },
    ],
    limit: 8,
  },
]

export const oleaIngredientsDefaults = {
  settings: {
    eyebrow: 'Ingredient index',
    heading: 'Grown with a reason.',
    lede: 'Every ingredient earns its place through efficacy, origin, and how it feels on the skin.',
    background_color: '#f5f0e7',
  },
  blocks: [
    { type: 'ingredient', settings: { number: '01', name: 'Olive leaf', use: 'Antioxidant support', origin: 'Puglia', art_style: 'leaf' } },
    { type: 'ingredient', settings: { number: '02', name: 'Fermented fig', use: 'Gentle renewal', origin: 'Aegean coast', art_style: 'circle' } },
    { type: 'ingredient', settings: { number: '03', name: 'Rosehip seed', use: 'Barrier repair', origin: 'Atlas foothills', art_style: 'seed' } },
    { type: 'ingredient', settings: { number: '04', name: 'Mineral water', use: 'Deep hydration', origin: 'Italian Alps', art_style: 'water' } },
  ],
}
