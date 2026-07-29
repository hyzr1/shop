import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeaderSection } from '@/sections/components/header'

describe('HeaderSection', () => {
  it('renders blocks as menu links', () => {
    render(
      <HeaderSection
        section={{
          id: 's1', type: 'header', settings: {}, disabled: false,
          blocks: [
            { id: 'b1', type: 'menu-link', settings: { label: 'Shop', url: '/shop' } },
          ],
        }}
      />
    )
    const link = screen.getByText('Shop')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/shop')
  })
})
