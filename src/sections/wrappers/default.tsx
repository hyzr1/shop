import type { Section } from '@/sections/types'
import { SectionsRenderer } from '@/sections/renderer'

export function DefaultPageWrapper({ sections }: { sections: Section[] }) {
  return <main className="min-h-screen">{(<SectionsRenderer sections={sections} />)}</main>
}
