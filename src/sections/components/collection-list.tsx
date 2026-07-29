'use client'
import { getCollections } from '@/lib/stub-commerce'
import type { Section } from '@/sections/types'

export function CollectionListSection({ section }: { section: Section }) {
  return (
    <section
      data-section-id={section.id}
      data-section-type="collection-list"
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold">
          {(section.settings.heading as string) ?? 'Collections'}
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {getCollections().map((c) => (
            <a key={c.id} href={`/collections/${c.handle}`}>
              {c.image && (
                <img
                  src={c.image}
                  alt=""
                  className="aspect-[4/3] w-full rounded object-cover"
                />
              )}
              <p className="mt-2 text-base font-medium">{c.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
