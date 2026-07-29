'use client'
import type { Section } from '@/sections/types'

const HEIGHT_CLASSES: Record<string, string> = {
  small: 'min-h-[320px]',
  medium: 'min-h-[480px]',
  large: 'min-h-[640px]',
}

const ALIGN_CLASSES: Record<string, string> = {
  'top-left':       'items-start justify-start text-left',
  'top-center':     'items-start justify-center text-center',
  'middle-center':  'items-center justify-center text-center',
  'bottom-left':    'items-end justify-start text-left',
  'bottom-center':  'items-end justify-center text-center',
}

const HEADING_SIZES: Record<string, string> = {
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-6xl',
  '2xl': 'text-5xl md:text-7xl',
}

export function ImageBannerSection({ section }: { section: Section }) {
  const s = section.settings
  const image = s.image as { url?: string } | undefined
  const height = (s.height as string) ?? 'large'
  const alignment = (s.content_alignment as string) ?? 'bottom-center'
  const overlay = ((s.overlay_opacity as number) ?? 40) / 100

  return (
    <section data-section-id={section.id} data-section-type="image-banner" className={`relative flex flex-col overflow-hidden ${HEIGHT_CLASSES[height] ?? HEIGHT_CLASSES.large} ${ALIGN_CLASSES[alignment] ?? ALIGN_CLASSES['bottom-center']}`}>
      {image?.url ? (
        <img src={image.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
      )}
      <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-4 p-10 text-white">
        {section.blocks.map((b) => {
          if (b.type === 'heading') {
            const size = (b.settings.size as string) ?? 'xl'
            return (<h1 key={b.id} className={`font-semibold tracking-tight ${HEADING_SIZES[size] ?? HEADING_SIZES.xl}`}>{(b.settings.text as string) ?? ''}</h1>)
          }
          if (b.type === 'subheading') {
            return (<p key={b.id} className="text-lg md:text-xl">{(b.settings.text as string) ?? ''}</p>)
          }
          if (b.type === 'button') {
            const style = (b.settings.style as string) ?? 'primary'
            const cls = style === 'primary'
              ? 'bg-white text-black hover:bg-neutral-200'
              : style === 'secondary'
              ? 'bg-black/60 text-white hover:bg-black/80'
              : 'border border-white text-white hover:bg-white/10'
            return (
              <a key={b.id} href={(b.settings.link as string) ?? '#'} className={`inline-flex w-fit items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium transition ${cls}`}>
                {(b.settings.label as string) ?? 'Button'}
              </a>
            )
          }
          return null
        })}
      </div>
    </section>
  )
}
