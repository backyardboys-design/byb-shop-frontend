'use client'

import { createContext, useContext, useState } from 'react'

type CartDrawerContextType = {
  opened: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const CartDrawerContext = createContext<CartDrawerContextType | null>(null)

export function CartDrawerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [opened, setOpened] = useState(false)

  return (
    <CartDrawerContext.Provider
      value={{
        opened,
        open: () => setOpened(true),
        close: () => setOpened(false),
        toggle: () => setOpened((v) => !v),
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  )
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext)
  if (!ctx) throw new Error('useCartDrawer must be used within CartDrawerProvider')
  return ctx
}