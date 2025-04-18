"use client"

import { useState,use,useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ShoppingCart,
  Truck,
  Award,
  ArrowLeft,
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
  Leaf,
  Store,
  Calendar,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getProductById, getProductsByCategory } from "@/lib/data"
import type { Product } from "@/lib/types"
import ProductCard from "@/components/product-card"
import { useAuth } from "@/contexts/UserContext"
import ChatbotButton from "@/components/chatbot"

interface ProductPageProps {
    params: Promise<{ id: string }> 
  }

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const { id } = use(params)

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const {user} = useAuth()

  // Fetch product data
  useEffect(() => {
    async function fetchData() {
      async function getProductById(id: string): Promise<Product | null> {
        try {
          const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "GET",
            credentials: "include", // remove this if you’re not using cookies
          })
    
          if (!res.ok) {
            console.error("Failed to fetch product:", res.status)
            return null
          }
    
          const data = await res.json()
          return data as Product
        } catch (error) {
          console.error("Error fetching product by ID:", error)
          return null
        }
      }
    
      try {
        const productData = await getProductById(id)
    
        if (!productData) {
          notFound()
          return
        }
    
        setProduct(productData)
    
        if (productData.category) {
          const categoryProducts = await getProductsByCategory(productData.category)
          const filtered = categoryProducts
            .filter(p => p.id !== productData.id)
            .slice(0, 4)
    
          setRelatedProducts(filtered)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [id])

  if (loading || !product) {
    return (
      <div className="container flex h-[70vh] items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="mt-4 text-gray-500">Loading product details...</p>
        </div>
      </div>
    )
  }

  const incrementQuantity = () => {
    if (product.inStock || product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (product.inStock || product.stock) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = async () => {
    if (product.stock <= 0) return
  
    setIsAddingToCart(true)
  
    try {
      const res = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // send cookies if using auth
        body: JSON.stringify({
          productId: product._id,
          clientId: user?.id, // make sure you have this from auth/user context
          status: 'pending',   // optional
          quantity: quantity,
        })
      })
  
      if (!res.ok) throw new Error('Failed to add to cart')
  
      const data = await res.json()
      console.log('Cart item added:', data)
      alert('Request to buy this product has been sent successfully!')
  
      setIsAddingToCart(false)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
  
    } catch (error) {
      setIsAddingToCart(false)
      console.error('Error adding to cart:', error)
    }
  }
  

  // Generate multiple placeholder images for the gallery
  const productImages = [
    product.image || "/placeholder.svg",
    `/placeholder.svg?height=600&width=600&text=${product.title}+1`,
    `/placeholder.svg?height=600&width=600&text=${product.title}+2`,
    `/placeholder.svg?height=600&width=600&text=${product.title}+3`,
  ]

  return (
    <div className="bg-gradient-to-b from-emerald-50/50 to-white min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-emerald-600">
            Products
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-emerald-600">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>

        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-600"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
              <img
                src="https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
                alt={product.title}
                // fill
                className="object-cover transition-all duration-300 hover:scale-105"
              />
              {product.isOrganic && (
                <Badge className="absolute left-4 top-4 bg-emerald-600 px-3 py-1.5 text-sm">Organic</Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    activeImage === index ? "border-emerald-600" : "border-transparent hover:border-emerald-200"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src="https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
                    alt={`${product.title} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0 border-2 border-emerald-600 rounded-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              {product.isOrganic && (
                <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                  <Leaf className="mr-1 h-3 w-3" />
                  Organic
                </Badge>
              )}
            </div>

            <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">{product.title}</h1>

            <div className="mb-4 flex items-center gap-2">
              <Link href={`/farmers/${product.farmerId}`} className="text-sm text-emerald-600 hover:underline">
                <Store className="mr-1 inline-block h-4 w-4" />
                {product.farmerName}
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                <Calendar className="mr-1 inline-block h-4 w-4" />
                Harvested recently
              </span>
            </div>

            <div className="mb-6 flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-lg text-gray-500">/ {product.unit}</span>
            </div>

            <p className="mb-6 text-gray-700">{product.description}</p>

            <Separator className="mb-6" />

            {/* Quantity selector and Add to cart */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-l-lg border-r-0"
                    onClick={decrementQuantity}
                    // disabled={product.inStock || product.stock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex h-10 w-16 items-center justify-center border border-gray-200 text-center">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-lg border-l-0"
                    onClick={incrementQuantity}
                    // disabled={product.inStock || product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  className={`flex-1 h-12 rounded-full ${
                    isAdded
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                  size="lg"
                  disabled={product.stock <= 0 || isAddingToCart}
                  onClick={handleAddToCart}
                >
 
                    <span  className="flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Request to buy 
                    </span>
                  
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-12 w-12 rounded-full border-gray-200 ${
                          isFavorite ? "text-red-500" : "text-gray-500"
                        }`}
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full border-gray-200 text-gray-500"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Stock status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Availability:</span>
                {/* {product.stock > 10 ? ( */}
                  <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                    <Check className="mr-1 h-3 w-3" /> In Stock
                  </Badge>
                {/* // ) : product.stock > 0 ? (
                //   <Badge variant="outline" className="border-amber-200 text-amber-700">
                //     Only {product.stock} left
                //   </Badge>
                // ) : (
                //   <Badge variant="outline" className="border-red-200 text-red-700">
                //     Out of Stock
                //   </Badge>
                // )} */}
              </div>
            </div>

            {/* Product features */}
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-4 text-lg font-medium">Product Features</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start">
                  <Truck className="mr-3 h-5 w-5 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-medium">Fast Delivery</h4>
                    <p className="text-sm text-gray-500">Delivered within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="mr-3 h-5 w-5 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-medium">Quality Guarantee</h4>
                    <p className="text-sm text-gray-500">100% satisfaction or money back</p>
                  </div>
                </div>

                {product.isOrganic && (
                  <div className="flex items-start">
                    <Leaf className="mr-3 h-5 w-5 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-medium">Certified Organic</h4>
                      <p className="text-sm text-gray-500">Grown without synthetic pesticides</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Store className="mr-3 h-5 w-5 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-medium">Direct from Farm</h4>
                    <p className="text-sm text-gray-500">Support local farmers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600"
              >
                Nutrition Facts
              </TabsTrigger>
              <TabsTrigger
                value="farm"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600"
              >
                Farm Information
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">About this product</h3>
              <p className="text-gray-700">
                {product.description}
                {/* Extended description */}
                <br />
{product.description}
                {product.isOrganic && (
                  <>
                    <br />
                    <br />
                    As a certified organic product, our {product.title} is grown without synthetic pesticides or
                    fertilizers, making it better for your health and the environment.
                  </>
                )}
              </p>
            </TabsContent>
            <TabsContent value="nutrition" className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Nutrition Information</h3>
              <p className="mb-4 text-gray-700">Approximate nutritional values per {product.unit}:</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-lg font-bold text-emerald-600">120</span>
                  <p className="text-xs text-gray-500">Calories</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-lg font-bold text-emerald-600">5g</span>
                  <p className="text-xs text-gray-500">Protein</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-lg font-bold text-emerald-600">25g</span>
                  <p className="text-xs text-gray-500">Carbs</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-lg font-bold text-emerald-600">2g</span>
                  <p className="text-xs text-gray-500">Fat</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="farm" className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:w-1/3">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Farm+Image"
                      alt={product.farmerName}
                      width={500}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="mb-2 text-lg font-medium">{product.farmerName}</h3>
                  <p className="mb-4 text-gray-700">
                    {product.farmerName} is a family-owned farm located in the heart of the countryside. They specialize
                    in growing high-quality {product.category} using sustainable farming practices that respect the
                    environment and produce the most flavorful crops.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  >
                    Visit Farm Profile
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      <ChatbotButton/>
    </div>
  )
}
