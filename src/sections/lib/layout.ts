/**
 * Shared layout helpers for marketing sections.
 *
 * `section_padding` controls top/bottom padding.
 * `container_width` constrains the inner column's max-width.
 *
 * Defaults are conservative — 'large' matches the original
 * `.p-section` clamp(72px, 9vw, 130px) and 'normal' matches `.p-container` 1200px.
 */

export type PaddingSize = 'small' | 'medium' | 'large' | 'xlarge'
export type ContainerWidth = 'narrow' | 'normal' | 'wide' | 'full'

export const PADDING_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'Extra large' },
]

export const WIDTH_OPTIONS = [
  { value: 'narrow', label: 'Narrow (900px)' },
  { value: 'normal', label: 'Normal (1200px)' },
  { value: 'wide', label: 'Wide (1400px)' },
  { value: 'full', label: 'Full width' },
]

export function paddingValue(name: unknown): string {
  switch (name) {
    case 'small':
      return '48px'
    case 'medium':
      return '72px'
    case 'xlarge':
      return 'clamp(96px, 12vw, 170px)'
    case 'large':
    default:
      return 'clamp(72px, 9vw, 130px)'
  }
}

export function containerMaxWidth(name: unknown): string {
  switch (name) {
    case 'narrow':
      return '900px'
    case 'wide':
      return '1400px'
    case 'full':
      return '100%'
    case 'normal':
    default:
      return '1200px'
  }
}
