'use client'
import { useEffect, useState } from 'react'
import type { Section } from '@/sections/types'

export function AnnouncementBarSection({ section }: { section: Section }) {
  const [i, setI] = useState(0)
  const speed = ((section.settings.rotation_speed as number) ?? 5) * 1000
  const blocks = section.blocks

  useEffect(() => {
    if (blocks.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % blocks.length), speed)
    return () => clearInterval(t)
  }, [blocks.length, speed])

  const current = blocks[i]
  if (!current) return null

  return (
    <div
      data-section-id={section.id}
      data-section-type="announcement-bar"
      className="bg-neutral-900 px-4 py-2 text-center text-xs text-white"
    >
      {current.settings.link ? (
        <a href={current.settings.link as string}>{current.settings.text as string}</a>
      ) : (
        (current.settings.text as string)
      )}
    </div>
  )
}
