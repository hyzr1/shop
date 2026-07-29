import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasSearchSettings: FieldSchema[] = [
  { type: 'text', key: 'placeholder', label: 'Input placeholder', default: 'Search the index…' },
  { type: 'text', key: 'initial_query', label: 'Initial query (for preview)', default: 'mesa' },
  { type: 'text', key: 'popular_searches', label: 'Recent queries (· separated)', default: 'mesa · courtyard · low archive · plate' },
  { type: 'text', key: 'empty_heading', label: 'Empty state heading', default: '/ Nothing indexed.' },
  { type: 'textarea', key: 'empty_body', label: 'Empty state body', default: 'Try another keyword. The index is filed by site, season, and material.', rows: 2 },
  {
    type: 'select', key: 'columns', label: 'Result columns', default: '3',
    options: [
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
  },
  { type: 'color', key: 'background_color', label: 'Background', default: '#211b17' },
]

export const atlasSearchBlocks: BlockTypeSchema[] = []

export const atlasSearchDefaults = {
  settings: {
    placeholder: 'Search the index…',
    initial_query: 'mesa',
    popular_searches: 'mesa · courtyard · low archive · plate',
    empty_heading: '/ Nothing indexed.',
    empty_body: 'Try another keyword. The index is filed by site, season, and material.',
    columns: '3',
    background_color: '#211b17',
  },
  blocks: [],
}
