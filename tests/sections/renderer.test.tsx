import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionsRenderer } from '@/sections/renderer'
import '@/sections/registry'  // ensure registrations run

describe('SectionsRenderer', () => {
  it('renders sections in order', () => {
    const { container } = render(
      <SectionsRenderer sections={[
        { id: 'h', type: 'header', settings: {}, blocks: [{ id: 'b', type: 'menu-link', settings: { label: 'X', url: '/' } }], disabled: false },
        { id: 'b', type: 'image-banner', settings: {}, blocks: [{ id: 'h1', type: 'heading', settings: { text: 'Hello', size: 'xl' } }], disabled: false },
      ]} />
    )
    expect(screen.getByText('X')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
    const headerEl = container.querySelector('[data-section-type="header"]')
    const bannerEl = container.querySelector('[data-section-type="image-banner"]')
    expect(headerEl).not.toBeNull()
    expect(bannerEl).not.toBeNull()
    const positionMask = headerEl!.compareDocumentPosition(bannerEl!) & Node.DOCUMENT_POSITION_FOLLOWING
    expect(positionMask).toBeTruthy()
  })

  it('skips disabled sections', () => {
    render(
      <SectionsRenderer sections={[
        { id: 'h', type: 'header', settings: {}, blocks: [{ id: 'b', type: 'menu-link', settings: { label: 'Hidden', url: '/' } }], disabled: true },
      ]} />
    )
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('renders a fallback for unknown section type', () => {
    render(
      <SectionsRenderer sections={[
        { id: 'x', type: 'not-a-type' as never, settings: {}, blocks: [], disabled: false },
      ]} />
    )
    expect(screen.getByText(/Unknown section/)).toBeInTheDocument()
  })
})
