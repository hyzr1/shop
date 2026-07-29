'use client'
import type { Section } from '@/sections/types'

export function CustomHtmlSection({ section }: { section: Section }) {
  const html = (section.settings.html as string) ?? ''
  const css = (section.settings.css as string) ?? ''

  return (
    <section data-section-id={section.id} data-section-type="custom-html">
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  )
}
