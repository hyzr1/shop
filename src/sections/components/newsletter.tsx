'use client'
import { useState } from 'react'
import type { Section } from '@/sections/types'

export function NewsletterSection({ section }: { section: Section }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      data-section-id={section.id}
      data-section-type="newsletter"
      className="px-6 py-20 text-center"
    >
      <h2 className="text-3xl font-semibold tracking-tight">
        {(section.settings.heading as string) ?? ''}
      </h2>
      {section.settings.subhead ? (
        <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
          {section.settings.subhead as string}
        </p>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        className="mx-auto mt-6 flex max-w-md gap-2"
      >
        <input
          required
          type="email"
          placeholder={(section.settings.placeholder as string) ?? ''}
          className="flex-1 rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        <button className="rounded bg-neutral-900 px-4 py-2 text-sm text-white">
          {(section.settings.button_label as string) ?? 'Subscribe'}
        </button>
      </form>
      {submitted ? (
        <p className="mt-3 text-xs text-emerald-700">Thanks — you&apos;re subscribed.</p>
      ) : null}
    </section>
  )
}
