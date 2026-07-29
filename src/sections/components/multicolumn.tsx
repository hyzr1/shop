'use client'
import type { Section } from '@/sections/types'

const COLS_CLASS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
}

export function MulticolumnSection({ section }: { section: Section }) {
  const cols = (section.settings.columns_per_row as number) ?? 3

  return (
    <section
      data-section-id={section.id}
      data-section-type="multicolumn"
      className="px-6 py-16"
    >
      <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight">
        {(section.settings.heading as string) ?? ''}
      </h2>
      <div className={`mx-auto grid max-w-7xl gap-8 grid-cols-1 ${COLS_CLASS[cols] ?? COLS_CLASS[3]}`}>
        {section.blocks.map((b) => {
          const img = (b.settings.image as { url?: string } | undefined)?.url
          return (
            <article key={b.id}>
              {img && (
                <img src={img} alt="" className="aspect-square w-full rounded object-cover" />
              )}
              <h3 className="mt-4 text-lg font-medium">{(b.settings.heading as string) ?? ''}</h3>
              <p className="mt-2 text-sm text-neutral-600">{(b.settings.body as string) ?? ''}</p>
              {b.settings.link && (
                <a href={b.settings.link as string} className="mt-3 inline-block text-sm underline">
                  Learn more →
                </a>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
