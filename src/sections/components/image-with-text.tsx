'use client'
import type { Section } from '@/sections/types'

export function ImageWithTextSection({ section }: { section: Section }) {
  const pos = (section.settings.image_position as string) ?? 'left'
  const img = (section.settings.image as { url?: string } | undefined)?.url

  return (
    <section
      data-section-id={section.id}
      data-section-type="image-with-text"
      className="px-6 py-16"
    >
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 ${
          pos === 'right' ? 'md:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div>
          {img ? (
            <img src={img} alt="" className="aspect-[4/5] w-full rounded object-cover" />
          ) : (
            <div className="aspect-[4/5] w-full rounded bg-neutral-200" />
          )}
        </div>
        <div>
          {section.blocks.map((b) => {
            if (b.type === 'heading') {
              return (
                <h2 key={b.id} className="mb-4 text-3xl font-semibold">
                  {(b.settings.text as string) ?? ''}
                </h2>
              )
            }
            if (b.type === 'text') {
              return (
                <p key={b.id} className="mb-4 text-base text-neutral-600">
                  {(b.settings.body as string) ?? ''}
                </p>
              )
            }
            if (b.type === 'button') {
              return (
                <a
                  key={b.id}
                  href={(b.settings.link as string) ?? '#'}
                  className="inline-block rounded bg-neutral-900 px-5 py-2 text-sm text-white"
                >
                  {(b.settings.label as string) ?? 'Button'}
                </a>
              )
            }
            return null
          })}
        </div>
      </div>
    </section>
  )
}
