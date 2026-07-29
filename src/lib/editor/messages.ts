import type { Page } from '@/sections/types'

export type HostToFrame =
  | { type: 'sync'; page: Page }
  | { type: 'select'; sectionId: string | null }

export type FrameToHost =
  | { type: 'ready' }
  | { type: 'select'; sectionId: string }
  | { type: 'hover'; sectionId: string | null }

export const FRAME_ORIGIN = 'self'
