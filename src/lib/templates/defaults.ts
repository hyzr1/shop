import type { ThemeSettings } from '@/sections/types'

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  colors: {
    schemes: {
      scheme_1: {
        background: '#ffffff',
        text: '#111111',
        accent: '#111111',
        button: '#111111',
        button_text: '#ffffff',
      },
      scheme_2: {
        background: '#111111',
        text: '#ffffff',
        accent: '#ffffff',
        button: '#ffffff',
        button_text: '#111111',
      },
    },
  },
  typography: {
    heading_font: { family: 'Inter', weight: 600 },
    body_font: { family: 'Inter', weight: 400 },
    heading_scale: 1.0,
    body_scale: 1.0,
  },
  spacing: { section_padding: 'medium', container_width: 1280 },
  buttons: { radius: 'md', weight: 'medium' },
}
