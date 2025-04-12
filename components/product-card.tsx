"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Eye, Check } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.stock <= 0) return

    setIsAddingToCart(true)
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }, 600)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all hover:shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Product</span>
      </Link>

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.isOrganic && <Badge className="absolute left-3 top-3 z-20 bg-emerald-600 px-2 py-1">Organic</Badge>}

        {product.stock <= 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <Badge className="bg-red-600 px-3 py-1 text-sm">Out of Stock</Badge>
          </div>
        )}

        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick action buttons */}
        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className={`h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:bg-white ${
                    isFavorite ? "text-red-500" : "text-gray-600"
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:bg-white"
                  asChild
                >
                  <Link href={`/shop/${product.id}`}>
                    <Eye className="h-5 w-5 text-gray-600" />
                    <span className="sr-only">Quick view</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Quick view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center gap-1">
          <span className="text-xs font-medium text-emerald-600">{product.category}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{product.farmerName}</span>
        </div>

        <h3 className="mb-1 text-lg font-medium group-hover:text-emerald-600 transition-colors">{product.name}</h3>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>

        <Button
          className={`w-full rounded-full transition-all ${
            isAdded
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
          disabled={product.stock <= 0 || isAddingToCart}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <span className="flex items-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Adding...
            </span>
          ) : isAdded ? (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </span>
          ) : (
            <span className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
