import type { Product } from "./types"

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes, perfect for salads and cooking.",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "vegetables",
    farmerName: "Green Valley Farm",
    farmerId: "farmer-1",
    unit: "per lb",
    stock: 50,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "2",
    title: "Grass-Fed Beef",
    description: "Premium grass-fed beef from free-range cattle.",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "meat",
    farmerName: "Meadow Ranch",
    farmerId: "farmer-2",
    unit: "per lb",
    stock: 20,
    isOrganic: false,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "3",
    title: "Fresh Strawberries",
    description: "Sweet and juicy strawberries picked at peak ripeness.",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "fruits",
    farmerName: "Berry Good Farms",
    farmerId: "farmer-3",
    unit: "per pint",
    stock: 30,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "4",
    title: "Organic Whole Milk",
    description: "Creamy whole milk from pasture-raised cows.",
    price: 5.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "dairy",
    farmerName: "Happy Cow Dairy",
    farmerId: "farmer-4",
    unit: "per gallon",
    stock: 15,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "5",
    title: "Fresh Spinach",
    description: "Nutrient-rich spinach leaves, perfect for salads and cooking.",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "vegetables",
    farmerName: "Green Valley Farm",
    farmerId: "farmer-1",
    unit: "per bunch",
    stock: 40,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "6",
    title: "Organic Brown Eggs",
    description: "Farm-fresh brown eggs from free-range chickens.",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "dairy",
    farmerName: "Sunny Side Farm",
    farmerId: "farmer-5",
    unit: "dozen",
    stock: 25,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "7",
    title: "Artisanal Goat Cheese",
    description: "Creamy, tangy goat cheese made in small batches.",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "dairy",
    farmerName: "Mountain Goat Creamery",
    farmerId: "farmer-6",
    unit: "8 oz",
    stock: 10,
    isOrganic: false,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "8",
    title: "Heirloom Carrots",
    description: "Colorful, sweet heirloom carrots, perfect for roasting.",
    price: 3.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "vegetables",
    farmerName: "Rainbow Roots Farm",
    farmerId: "farmer-7",
    unit: "per bunch",
    stock: 35,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "9",
    title: "Organic Honey",
    description: "Raw, unfiltered honey from local wildflowers.",
    price: 9.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "other",
    farmerName: "Busy Bee Apiary",
    farmerId: "farmer-8",
    unit: "16 oz jar",
    stock: 0,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "10",
    title: "Fresh Baked Sourdough",
    description: "Artisanal sourdough bread baked fresh daily.",
    price: 7.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "grains",
    farmerName: "Hearth & Home Bakery",
    farmerId: "farmer-9",
    unit: "per loaf",
    stock: 12,
    isOrganic: false,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "11",
    title: "Organic Avocados",
    description: "Perfectly ripe avocados, ready to eat.",
    price: 2.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "fruits",
    farmerName: "Tropical Treasures Farm",
    farmerId: "farmer-10",
    unit: "each",
    stock: 45,
    isOrganic: true,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
  {
    id: "12",
    title: "Pasture-Raised Chicken",
    description: "Whole chicken raised on open pasture with natural diet.",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "meat",
    farmerName: "Freedom Range Farms",
    farmerId: "farmer-11",
    unit: "per lb",
    stock: 8,
    isOrganic: false,
    createdAt: new Date().toISOString(),
    _id: "",
    name: "",
    inStock: false
  },
]

// Function to simulate fetching products from an API
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockProducts
}

// Function to get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts.find((product) => product.id === id)
}

// Function to get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockProducts.filter((product) => product.category === category)
}
