'use client'
import type { Section } from '@/sections/types'

export function CollageSection({ section }: { section: Section }) {
  const imgs = [1, 2, 3].map(
    (i) => (section.settings[`image_${i}`] as { url?: string } | undefined)?.url,
  )

  return (
    <section
      data-section-id={section.id}
      data-section-type="collage"
      className="px-6 py-16"
    >
      <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight">
        {(section.settings.heading as string) ?? ''}
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {imgs.map((u, i) =>
          u ? (
            <img
              key={i}
              src={u}
              alt=""
              className="aspect-square w-full rounded object-cover"
            />
          ) : (
            <div key={i} className="aspect-square rounded bg-neutral-200" />
          ),
        )}
      </div>
    </section>
  )
}
