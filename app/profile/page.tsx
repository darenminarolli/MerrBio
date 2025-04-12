"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Leaf,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  ThumbsUp,
  Tractor,
  X,
  ImageIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/UserContext"

export default function FarmerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const {user} = useAuth()
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    organic: false,
    inStock: true,
  })
    const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Handle input and text area changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: checked }))
  }
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }
  
  
  // Trigger file input
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }
  
  // 🟢 Submit to /api/new-product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
  
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...newProduct,
          farmer: user?.id,
        }),
        headers: {'Content-Type': 'application/json' },
        credentials: "include", // 👈 crucial for cookies
      })
  
      if (!res.ok) throw new Error("Failed to add product")
  
      const result = await res.json()
      console.log("Product added:", result)
  
      // Reset form
      setNewProduct({
        title: "",
        category: "",
        price: "",
        description: "",
        organic: false,
        inStock: true,
      })
      setIsAddProductOpen(false)
    } catch (err) {
      console.error("Error submitting product:", err)
      // optionally show toast or error UI
    }
  }
  
  // Mock data for farmer products
  const farmerProducts = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      stock: 250,
      unit: "kg",
      price: 3.99,
      status: "In Stock",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      category: "Fruits",
      stock: 20,
      unit: "kg",
      price: 6.99,
      status: "Low Stock",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Organic Lettuce",
      category: "Vegetables",
      stock: 180,
      unit: "kg",
      price: 2.49,
      status: "In Stock",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Free-Range Eggs",
      category: "Dairy & Eggs",
      stock: 300,
      unit: "dozen",
      price: 4.99,
      status: "In Stock",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Mock data for client requests
  const clientRequests = [
    {
      id: 101,
      clientName: "Green Grocers Co.",
      clientImage: "/placeholder.svg?height=40&width=40",
      products: [
        { name: "Organic Tomatoes", quantity: 50, unit: "kg" },
        { name: "Fresh Strawberries", quantity: 30, unit: "kg" },
      ],
      status: "Pending",
      date: "April 15, 2025",
      total: 349.5,
    },
    {
      id: 102,
      clientName: "Farm to Table Restaurant",
      clientImage: "/placeholder.svg?height=40&width=40",
      products: [
        { name: "Organic Lettuce", quantity: 25, unit: "kg" },
        { name: "Free-Range Eggs", quantity: 20, unit: "dozen" },
      ],
      status: "Confirmed",
      date: "April 18, 2025",
      total: 162.05,
    },
    {
      id: 103,
      clientName: "Wellness Market",
      clientImage: "/placeholder.svg?height=40&width=40",
      products: [
        { name: "Fresh Strawberries", quantity: 15, unit: "kg" },
        { name: "Organic Tomatoes", quantity: 40, unit: "kg" },
      ],
      status: "Pending",
      date: "April 20, 2025",
      total: 294.75,
    },
  ]

  // Filter products based on search term
  const filteredProducts = farmerProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Toggle request expansion
  const toggleRequestExpansion = (id: number) => {
    if (expandedRequest === id) {
      setExpandedRequest(null)
    } else {
      setExpandedRequest(id)
    }
  }
 const handleLogout = async() => {
    // Clear user data from local storage
    localStorage.removeItem("user")
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 crucial for cookies
      })

      const data = await res.json()

      if (!res.ok) {
        // setError(data.message || "Something went wrong")
      } else {
        console.log("User logged in:", data)
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location.href = "/" // 👈 redirect to home page
      }
    } catch (err) {
    alert('error')
    }
    // Redirect to login page
    window.location.href = "/auth/signin"
 }
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Simple Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tractor className="h-7 w-7 text-teal-500" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Farmer Dashboard</h1>
          </div>
 <button onClick={handleLogout}>logout</button>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <ShoppingCart className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-teal-500 rounded-full"></span>
            </button>

            <Avatar className="h-9 w-9 border-2 border-teal-500">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Farmer profile" />
              <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 mb-8 text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
              <p className="text-teal-50">Manage your farm products and client requests all in one place.</p>
            </div>
            <Button className="bg-white text-teal-600 hover:bg-teal-50" onClick={() => setIsAddProductOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="products" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Package className="mr-2 h-4 w-4" />
              My Products
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Client Requests
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Available Products</h3>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 w-full sm:w-64 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          product.status === "In Stock" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      >
                        {product.status}
                      </Badge>
                    </div>

                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="pb-2">
                      <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <Leaf className="h-4 w-4 text-teal-500" />
                        <span>{product.category}</span>
                      </div>

                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-600 dark:text-slate-400">Stock:</span>
                        <span className="font-medium">
                          {product.stock} {product.unit}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Price:</span>
                        <span className="font-bold text-teal-600 dark:text-teal-500">${product.price.toFixed(2)}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-2">
                      <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Manage Stock</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Client Requests</h3>

            {clientRequests.length === 0 ? (
              <div className="text-center py-12">
                <RefreshCw className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No requests yet</h4>
                <p className="text-slate-500 dark:text-slate-400">Client requests will appear here when received.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {clientRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`overflow-hidden border-slate-200 dark:border-slate-700 hover:shadow-md transition-all ${
                        expandedRequest === request.id ? "ring-2 ring-teal-500" : ""
                      }`}
                    >
                      <div className="p-4 cursor-pointer" onClick={() => toggleRequestExpansion(request.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={request.clientImage || "/placeholder.svg"} alt={request.clientName} />
                              <AvatarFallback className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                                {request.clientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">{request.clientName}</h4>
                              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Clock className="h-3 w-3" />
                                <span>{request.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${
                                request.status === "Pending"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                              }`}
                            >
                              {request.status}
                            </Badge>
                            <span className="font-bold text-teal-600 dark:text-teal-500">
                              ${request.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {expandedRequest === request.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <h5 className="font-medium text-slate-900 dark:text-white mb-3">Requested Products:</h5>
                            <ul className="space-y-2 mb-4">
                              {request.products.map((product, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                  <CheckCircle className="h-4 w-4 text-teal-500" />
                                  <span>
                                    {product.quantity} {product.unit} of {product.name}
                                  </span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                              {request.status === "Pending" ? (
                                <>
                                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                                    <ThumbsUp className="mr-2 h-4 w-4" /> Accept
                                  </Button>
                                  <Button variant="outline" className="border-slate-300 dark:border-slate-700">
                                    <X className="mr-2 h-4 w-4" /> Decline
                                  </Button>
                                </>
                              ) : (
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                  <CheckCircle className="mr-2 h-4 w-4" /> Prepare Order
                                </Button>
                              )}
                              <Button variant="ghost" className="ml-auto">
                                Details <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Product Modal */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
  <div className="grid grid-cols-1 gap-6">
    {/* Product Title */}
    <div className="space-y-2">
      <Label htmlFor="title">Product Title</Label>
      <Input
        id="title"
        name="title"
        value={newProduct.title}
        onChange={handleInputChange}
        placeholder="e.g., Organic Tomatoes"
        required
      />
    </div>

    {/* Category */}
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select value={newProduct.category} onValueChange={(value) => handleSelectChange("category", value)}>
        <SelectTrigger id="category">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Vegetables">Vegetables</SelectItem>
          <SelectItem value="Fruits">Fruits</SelectItem>
          <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
          <SelectItem value="Meat">Meat</SelectItem>
          <SelectItem value="Grains">Grains</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Price */}
    <div className="space-y-2">
      <Label htmlFor="price">Price</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={newProduct.price}
          onChange={handleInputChange}
          className="pl-8"
          placeholder="0.00"
          required
        />
      </div>
    </div>


    {/* Organic Checkbox */}
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="organic"
        name="organic"
        checked={newProduct.organic}
        onChange={handleCheckboxChange}
      />
      <Label htmlFor="organic">Organic</Label>
    </div>

    {/* In Stock Checkbox */}
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="inStock"
        name="inStock"
        checked={newProduct.inStock}
        onChange={handleCheckboxChange}
      />
      <Label htmlFor="inStock">In Stock</Label>
    </div>

    {/* Description */}
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={newProduct.description}
        onChange={handleInputChange}
        placeholder="Describe your product..."
        rows={3}
      />
    </div>
  </div>

  <DialogFooter className="pt-4">
    <Button type="button" variant="outline" onClick={() => setIsAddProductOpen(false)}>
      Cancel
    </Button>
    <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
      <Plus className="mr-2 h-4 w-4" /> Add Product
    </Button>
  </DialogFooter>
</form>

        </DialogContent>
      </Dialog>
    </div>
  )
}
