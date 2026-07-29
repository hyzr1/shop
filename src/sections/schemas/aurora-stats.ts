import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const auroraStatsSettings: FieldSchema[] = []

export const auroraStatsBlocks: BlockTypeSchema[] = [
  {
    type: 'stat',
    label: 'Stat',
    defaultSettings: { number: '12', suffix: 'k+', label: 'Happy customers' },
    settingsSchema: [
      { type: 'text', key: 'number', label: 'Number', default: '12' },
      { type: 'text', key: 'suffix', label: 'Suffix (e.g. k+, %, ★)', default: 'k+' },
      { type: 'text', key: 'label', label: 'Label', default: 'Happy customers' },
    ],
    limit: 6,
  },
]

export const auroraStatsDefaults = {
  settings: {},
  blocks: [
    { type: 'stat', settings: { number: '12', suffix: 'k+', label: 'Happy customers' } },
    { type: 'stat', settings: { number: '98', suffix: '%', label: 'Would buy again' } },
    { type: 'stat', settings: { number: '40', suffix: '+', label: 'Countries shipped' } },
    { type: 'stat', settings: { number: '4.9', suffix: '★', label: 'Average rating' } },
  ],
}
