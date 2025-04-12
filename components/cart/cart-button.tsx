"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { CartModal } from "./cart-modal"

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Use try/catch to handle the case when CartProvider is not available
  let totalItems = 0
  let cart
  try {
    cart = useCart()
    totalItems = cart.totalItems
  } catch (error) {
    console.error("Cart context not available:", error)
    // Continue with totalItems as 0
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Shopping Cart</span>
      </Button>

      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
