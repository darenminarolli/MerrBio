"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
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
} from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/UserContext"

// Helper function to get user from local storage
function getUserFromLocalStorage() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

interface FarmerProduct {
  id: string
  title: string
  name: string
  category: string
  inStock: boolean
  unit: string
  price: number
  status: string
  image: string
}

interface ClientRequest {
  id: string
  clientName: string
  clientEmail: string
  // if you later have clientImage, products, or total, add them here
  clientImage?: string
  status: string
  date: string
  products: any[]
  total: number
}

export default function FarmerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [farmerProducts, setFarmerProducts] = useState<FarmerProduct[]>([])
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([])
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  // Track if we're editing an existing product; null means creating new.
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    organic: false,
    inStock: true,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<any>(null)

  // Load user data from local storage once
  useEffect(() => {
    const storedUser = getUserFromLocalStorage()
    setUser(storedUser)
  }, [])

  // When user.id becomes available, fetch products and requests
  useEffect(() => {
    if (!user?.id) return
    getFarmerProducts()
    getFarmerRequests()
  }, [user?.id])

  // Fetch farmer products from endpoint /api/products/farmer/:id
  const getFarmerProducts = () => {
    fetch(`http://localhost:5000/api/products/farmer/${user.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        return response.json()
      })
      .then((data) => {
        // Map API response to local product interface.
        // Assumes each product has _id, title, category, inStock, price, image, etc.
        const mappedProducts: FarmerProduct[] = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          name: item.title, // assuming title is used as product name
          category: item.category,
          inStock: item.inStock,
          unit: item.unit || "",
          price: item.price,
          status: item.inStock ? "In Stock" : "Out of Stock",
          image: item.image || "/placeholder.svg",
        }))
        setFarmerProducts(mappedProducts)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
  }

  // Fetch client requests for the logged-in farmer.
  // Assumes API endpoint /api/requests/farmer/:id returns an array of request objects.
  const getFarmerRequests = () => {
    fetch(`http://localhost:5000/api/requests/${user.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch requests")
        return response.json()
      })
      .then((data) => {
        // Map the requests; note: adjust mapping if your API returns more detail.
        const mappedRequests: ClientRequest[] = data.map((req: any) => ({
          id: req._id,
          clientName: req.clientId?.name || "Unknown",
          clientEmail: req.clientId?.email || "",
          clientImage: req.clientId?.image, // if available
          status: req.status,
          date: new Date(req.createdAt).toLocaleDateString(),
          products: req.products || [], // if your request includes products array
          total: req.total || 0,         // if your request includes a total field
        }))
        setClientRequests(mappedRequests)
      })
      .catch((error) => {
        console.error("Error fetching requests:", error)
      })
  }

  // Handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  // Submit handler: if editingProductId exists, send PUT; otherwise, POST.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let url = "http://localhost:5000/api/products"
      let method = "POST"
      if (editingProductId !== null) {
        url = `http://localhost:5000/api/products/${editingProductId}`
        method = "PUT"
      }
      const res = await fetch(url, {
        method,
        body: JSON.stringify({
          ...newProduct,
          farmer: user?.id,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!res.ok) throw new Error("Failed to save product")

      const result = await res.json()
      console.log(editingProductId ? "Product updated:" : "Product added:", result)

      // Refresh product list and client requests
      getFarmerProducts()
      getFarmerRequests()

      // Reset form
      setNewProduct({
        title: "",
        category: "",
        price: "",
        description: "",
        organic: false,
        inStock: true,
      })
      setEditingProductId(null)
      setIsAddProductOpen(false)
    } catch (err) {
      console.error("Error submitting product:", err)
    }
  }

  // Handle editing: given a product id, find the product, populate the form, and open the modal.
  const handleEdit = (productId: string) => {
    const productToEdit = farmerProducts.find((p) => p.id === productId)
    if (!productToEdit) {
      console.error("Product not found")
      return
    }
    setNewProduct({
      title: productToEdit.title,
      category: productToEdit.category,
      price: productToEdit.price.toString(),
      description: "", // update if you have description data in productToEdit
      organic: false,  // update as needed if productToEdit contains this data
      inStock: productToEdit.inStock,
    })
    setEditingProductId(productId)
    setIsAddProductOpen(true)
  }

  // Handle delete: given a product id, confirm and send DELETE request.
  const handleDelete = async (productId: string): Promise<void> => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error("Failed to delete product")
      }
      console.log("Product deleted successfully")
      setFarmerProducts((prev) => prev.filter((p) => p.id !== productId))
    } catch (err) {
      console.error("Error deleting product:", err)
      alert("Failed to delete product. Please try again.")
    }
  }

  // Toggle expansion for client requests
  const toggleRequestExpansion = (id: string) => {
    setExpandedRequest(expandedRequest === id ? null : id)
  }

  const handleLogout = async () => {
    localStorage.removeItem("user")
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) {
        // Handle error if necessary
      } else {
        console.log("User logged out:", data)
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location.href = "/"
      }
    } catch (err) {
      alert("Error during logout")
    }
    window.location.href = "/auth/signin"
  }

  // Filter products based on search term
  const filteredProducts = farmerProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tractor className="h-7 w-7 text-teal-500" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Farmer Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === "farmer" ? (
              <button className="bg-red-300 p-2 rounded-2xl text-teal-600 hover:bg-teal-50" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <ShoppingCart className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-teal-500 rounded-full"></span>
                <span className="bg-red-300 p-2 rounded-2xl text-teal-600 hover:bg-teal-50" onClick={handleLogout}>
                  Logout
                </span>
              </button>
            )}
            <Avatar className="h-9 w-9 border-2 border-teal-500">
              <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                {user?.name.split(" ").map((n: string) => n[0]).join("")}
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
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
              <p className="text-teal-50">Manage your farm products and client requests all in one place.</p>
            </div>
            <Button className="bg-white text-teal-600 hover:bg-teal-50" onClick={() => { setEditingProductId(null); setIsAddProductOpen(true); }}>
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
                        src='https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1'
                        alt={product.title}
                        className="w-full h-40 object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${product.inStock ? "bg-emerald-500" : "bg-amber-500"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="text-lg">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <Leaf className="h-4 w-4 text-teal-500" />
                        <span>{product.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Price:</span>
                        <span className="font-bold text-teal-600 dark:text-teal-500">${product.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 p-2 flex justify-between space-y-2">
                      <Button onClick={() => handleEdit(product.id)} className="w-fit bg-teal-300 hover:bg-teal-400 text-white">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(product.id)} className="w-fit bg-red-300 hover:bg-red-400 text-white">
                        Delete
                      </Button>
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
                    <Card className={`overflow-hidden border-slate-200 dark:border-slate-700 hover:shadow-md transition-all ${expandedRequest === request.id ? "ring-2 ring-teal-500" : ""}`}>
                      <div className="p-4 cursor-pointer" onClick={() => toggleRequestExpansion(request.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1" alt={request.clientName} />
                              <AvatarFallback className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                                {request.clientName.split(" ").map((n) => n[0]).join("")}
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
                            <Badge className={`${
                              request.status === "pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                            }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                            {/* You can show additional details such as total if needed */}
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
                            {/* If your request data has more details, render them here */}
                            <p className="text-sm text-slate-600 dark:text-slate-400">Details about the request...</p>
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

      {/* Add/Edit Product Modal */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingProductId !== null ? "Edit Product" : "Add New Product"}
            </DialogTitle>
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
              <Button type="button" variant="outline" onClick={() => { setIsAddProductOpen(false); setEditingProductId(null); }}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> {editingProductId !== null ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
