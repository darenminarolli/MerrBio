"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useCart } from "./cart-provider"

type Product = {
  id: string
  name: string
  price: number
  image?: string
}

type AddToCartButtonProps = ButtonProps & {
  product: Product
  quantity?: number
}

export function AddToCartButton({ product, quantity = 1, ...props }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const cart = useCart()

  const addItem = (item: any) => {
    try {
      cart.addItem(item)
    } catch (error) {
      console.error("Cart context not available:", error)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <Button onClick={handleAddToCart} {...props}>
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
