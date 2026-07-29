'use client'
import { createContext, useContext } from 'react'
import type { StubProduct, StubCollection, StubCart } from '@/lib/stub-commerce'

interface PageCtx {
  product?: StubProduct
  collection?: StubCollection
  cart?: StubCart
}

const Ctx = createContext<PageCtx>({})

export function PageContextProvider({
  value,
  children,
}: {
  value: PageCtx
  children: React.ReactNode
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePageContext() {
  return useContext(Ctx)
}
