"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useCart, type CartItem } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { formatPrice } from "@/lib/utils"
import { useEffect, useState } from "react"

type CartModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartState, setCartState] = useState({
    items: [] as CartItem[],
    updateQuantity: (_id: string, _quantity: number) => {},
    removeItem: (_id: string) => {},
    totalPrice: 0,
    clearCart: () => {},
  })

  useEffect(() => {
    try {
      const cart = useCart()
      setCartState(cart)
    } catch (error) {
      console.error("Cart context not available:", error)
      // Continue with default empty cart state
    }
  }, [])

  const { items, updateQuantity, removeItem, totalPrice, clearCart } = cartState

  const handleSubmitOrder = async () => {
    // Here you would typically send the order to your backend
    alert("Order submitted successfully!")
    clearCart()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">Your cart is empty</div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="flex justify-between border-t pt-4 font-medium">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => clearCart()}>
                Clear Cart
              </Button>
              <Button onClick={handleSubmitOrder}>Submit Order</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function CartItemRow({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      {item.image && (
        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <p className="text-muted-foreground text-sm">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease</span>
        </Button>

        <span className="w-8 text-center">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => removeItem(item.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  )
}
