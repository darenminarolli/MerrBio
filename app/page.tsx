"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MapPin, ShoppingCart, Star, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Portland, OR",
      text: "MerrBio has completely changed how I shop for produce. The quality is exceptional, and I love knowing exactly where my food comes from.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=SJ",
    },
    {
      name: "Michael Chen",
      location: "Austin, TX",
      text: "As someone who values sustainability, MerrBio aligns perfectly with my values. Fresh produce delivered straight from local farms - what could be better?",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=MC",
    },
    {
      name: "Emma Rodriguez",
      location: "Denver, CO",
      text: "The variety of seasonal produce available is amazing. I've discovered so many new fruits and vegetables that I now incorporate into my cooking regularly.",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80&text=ER",
    },
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-50 to-white">
        <div className="container px-4 md:px-6 py-16 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1 text-sm rounded-full">
                  Farm to Table
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Fresh From Farm <br />
                  <span className="text-emerald-600">To Your Table</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect directly with local farmers and enjoy the freshest produce delivered to your doorstep.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    className="h-12 w-full rounded-full border-emerald-200 bg-white pl-10 pr-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <MapPin className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                </div>
                <Button className="h-12 rounded-full bg-emerald-600 px-8 hover:bg-emerald-700 text-white">
                  Shop Now
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${i}`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">2,000+</span> happy customers
                </p>
              </div>
            </div>
            <div className="relative mx-auto lg:ml-auto">
              <div className="relative h-[300px] w-[300px] xs:h-[350px] xs:w-[350px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px] mx-auto rounded-full bg-emerald-100/50 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Fresh+Produce"
                    alt="Fresh produce"
                    width={400}
                    height={400}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full bg-white p-2 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-amber-100">
                    <div className="text-center">
                      <p className="text-xs font-medium text-amber-800">ORGANIC</p>
                      <p className="text-2xl font-bold text-amber-600">100%</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-white p-2 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100">
                    <div className="text-center">
                      <p className="text-xs font-medium text-emerald-800">LOCAL</p>
                      <p className="text-xl font-bold text-emerald-600">FARMS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1 text-sm rounded-full">
              Our Promise
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Why Choose MerrBio?</h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl">
              We're revolutionizing how you access fresh, local produce by connecting you directly with the farmers who
              grow it.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-emerald-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold">Quality Guaranteed</h3>
                <p className="text-gray-500">
                  All produce is carefully selected and quality-checked to ensure you receive only the best.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-amber-50 to-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-amber-600"
                  >
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <path d="M9 9h.01" />
                    <path d="M15 9h.01" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold">Support Local Farmers</h3>
                <p className="text-gray-500">
                  Your purchases directly support local farmers and sustainable agricultural practices.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-green-50 to-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-green-600"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="M16 6h-4l-2 6h6l-2 6h-4" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold">Farm Fresh</h3>
                <p className="text-gray-500">
                  From harvest to your home in record time, ensuring maximum freshness and nutritional value.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100 px-3 py-1 text-sm rounded-full">
              Fresh Picks
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Seasonal Favorites</h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl">
              Discover what's fresh and in season right now from our network of local farms.
            </p>
          </div>
          <Tabs defaultValue="vegetables" className="mb-8">
            <TabsList className="mx-auto bg-white border h-12 p-1 rounded-full flex-wrap gap-2">
              <TabsTrigger
                value="vegetables"
                className="rounded-full px-3 sm:px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Vegetables
              </TabsTrigger>
              <TabsTrigger
                value="fruits"
                className="rounded-full px-3 sm:px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Fruits
              </TabsTrigger>
              <TabsTrigger
                value="dairy"
                className="rounded-full px-3 sm:px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Dairy & Eggs
              </TabsTrigger>
              <TabsTrigger
                value="meats"
                className="rounded-full px-3 sm:px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Meats
              </TabsTrigger>
            </TabsList>
            <TabsContent value="vegetables" className="mt-10">
              <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    name: "Organic Kale",
                    farm: "Green Valley Farm",
                    price: "$3.99",
                    unit: "bunch",
                    image: "/placeholder.svg?height=300&width=300&text=Kale",
                    badge: "Organic",
                  },
                  {
                    name: "Heirloom Tomatoes",
                    farm: "Sunshine Acres",
                    price: "$4.50",
                    unit: "lb",
                    image: "/placeholder.svg?height=300&width=300&text=Tomatoes",
                    badge: "Heirloom",
                  },
                  {
                    name: "Rainbow Carrots",
                    farm: "Harmony Fields",
                    price: "$3.25",
                    unit: "bunch",
                    image: "/placeholder.svg?height=300&width=300&text=Carrots",
                    badge: "Colorful",
                  },
                  {
                    name: "Fresh Spinach",
                    farm: "River Bend Farm",
                    price: "$2.99",
                    unit: "bag",
                    image: "/placeholder.svg?height=300&width=300&text=Spinach",
                    badge: "Fresh",
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Badge className="absolute left-3 top-3 z-10 bg-white/80 backdrop-blur-sm text-emerald-800">
                        {product.badge}
                      </Badge>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="font-medium text-emerald-600">
                          {product.price}/{product.unit}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-gray-500">{product.farm}</p>
                      <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="fruits" className="mt-10">
              <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    name: "Organic Strawberries",
                    farm: "Berry Patch Farm",
                    price: "$5.99",
                    unit: "pint",
                    image: "/placeholder.svg?height=300&width=300&text=Strawberries",
                    badge: "Organic",
                  },
                  {
                    name: "Honeycrisp Apples",
                    farm: "Orchard Hills",
                    price: "$3.50",
                    unit: "lb",
                    image: "/placeholder.svg?height=300&width=300&text=Apples",
                    badge: "Crisp",
                  },
                  {
                    name: "Fresh Blueberries",
                    farm: "Blue Sky Farms",
                    price: "$4.99",
                    unit: "pint",
                    image: "/placeholder.svg?height=300&width=300&text=Blueberries",
                    badge: "Fresh",
                  },
                  {
                    name: "Ripe Avocados",
                    farm: "Green Grove",
                    price: "$2.25",
                    unit: "each",
                    image: "/placeholder.svg?height=300&width=300&text=Avocados",
                    badge: "Ripe",
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Badge className="absolute left-3 top-3 z-10 bg-white/80 backdrop-blur-sm text-emerald-800">
                        {product.badge}
                      </Badge>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="font-medium text-emerald-600">
                          {product.price}/{product.unit}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-gray-500">{product.farm}</p>
                      <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="dairy" className="mt-10">
              {/* Similar product grid for dairy products */}
              <div className="text-center text-gray-500">Select this tab to see dairy & egg products</div>
            </TabsContent>
            <TabsContent value="meats" className="mt-10">
              {/* Similar product grid for meat products */}
              <div className="text-center text-gray-500">Select this tab to see meat products</div>
            </TabsContent>
          </Tabs>
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="rounded-full px-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Farmer Spotlight */}
      <section  id="contact-section" className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100 px-3 py-1 text-sm rounded-full">
              The Growers
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Meet Our Farmers</h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl">
              Get to know the passionate people behind your food and their sustainable farming practices.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "John & Maria Rodriguez",
                farm: "Sunshine Acres",
                location: "Sonoma County, CA",
                specialty: "Organic Vegetables & Herbs",
                years: 15,
                image: "/placeholder.svg?height=400&width=400&text=Farmer+1",
              },
              {
                name: "David Chen",
                farm: "Green Valley Farm",
                location: "Napa Valley, CA",
                specialty: "Heirloom Tomatoes & Peppers",
                years: 8,
                image: "/placeholder.svg?height=400&width=400&text=Farmer+2",
              },
              {
                name: "Sarah Williams",
                farm: "Blue Sky Farms",
                location: "Willamette Valley, OR",
                specialty: "Berries & Stone Fruits",
                years: 12,
                image: "/placeholder.svg?height=400&width=400&text=Farmer+3",
              },
            ].map((farmer, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={farmer.image || "/placeholder.svg"}
                    alt={farmer.name}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold">{farmer.name}</h3>
                    <p className="text-emerald-300">{farmer.farm}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{farmer.location}</span>
                  </div>
                  <p className="mb-2 text-sm">
                    <span className="font-medium">Specialty:</span> {farmer.specialty}
                  </p>
                  <p className="mb-4 text-sm">
                    <span className="font-medium">Farming for:</span> {farmer.years} years
                  </p>
                  <Button variant="outline" className="w-full border-amber-600 text-amber-600 hover:bg-amber-50">
                    Visit Farm Page
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" className="rounded-full px-8 border-amber-600 text-amber-600 hover:bg-amber-50">
              Meet All Farmers
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1 text-sm rounded-full">
              Simple Process
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">How MerrBio Works</h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl">
              Getting farm-fresh produce delivered to your door is simple with our easy 4-step process.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-emerald-200 lg:block"></div>
            <div className="grid gap-y-12 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: 1,
                  title: "Browse & Select",
                  description: "Explore our selection of fresh, seasonal produce from local farms.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-emerald-600"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  ),
                },
                {
                  step: 2,
                  title: "Place Your Order",
                  description: "Add items to your cart and choose your preferred delivery date.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-emerald-600"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                  ),
                },
                {
                  step: 3,
                  title: "Farmers Harvest",
                  description: "Farmers pick your produce at peak freshness specifically for your order.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-emerald-600"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                      <path d="M8.5 8.5v.01" />
                      <path d="M16 15.5v.01" />
                      <path d="M12 12v.01" />
                      <path d="M11 17v.01" />
                      <path d="M7 14v.01" />
                    </svg>
                  ),
                },
                {
                  step: 4,
                  title: "Enjoy Delivery",
                  description: "Receive your farm-fresh produce right at your doorstep.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-emerald-600"
                    >
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <path d="M12 20h.01" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 z-10">
                    {item.icon}
                  </div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button className="rounded-full bg-emerald-600 px-8 hover:bg-emerald-700 text-white">Get Started</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100 px-3 py-1 text-sm rounded-full">
              Customer Stories
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">What Our Customers Say</h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl">
              Hear from people who have transformed their eating habits with MerrBio.
            </p>
          </div>
          <div className="relative mx-auto max-w-4xl">
            <Card className="border-0 bg-white p-8 shadow-lg md:p-10">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="aspect-square w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Image
                        src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <div className="mb-4 flex justify-center md:justify-start">
                      {Array(testimonials[activeTestimonial].rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <p className="mb-4 md:mb-6 text-base md:text-lg italic text-gray-700 leading-relaxed">
                      "{testimonials[activeTestimonial].text}"
                    </p>
                    <div>
                      <p className="font-semibold text-lg">{testimonials[activeTestimonial].name}</p>
                      <p className="text-sm text-gray-500">{testimonials[activeTestimonial].location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`h-3 w-3 rounded-full p-0 ${
                      index === activeTestimonial
                        ? "bg-emerald-600 border-emerald-600"
                        : "bg-gray-200 border-gray-200 hover:border-emerald-600"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20" />
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-3 py-1 text-sm rounded-full">
              Join Us Today
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Ready to Experience Farm-Fresh Goodness?
            </h2>
            <p className="mb-8 text-lg text-emerald-100">
              Join thousands of happy customers who have transformed their eating habits with MerrBio.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center w-full sm:w-auto">
              <Button className="rounded-full bg-white px-8 text-emerald-600 hover:bg-gray-100 w-full sm:w-auto">
                Find a Farmer
              </Button>
              <Button className="rounded-full bg-emerald-700/50 px-8 text-white hover:bg-emerald-700/70 backdrop-blur-sm w-full sm:w-auto">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1 text-sm rounded-full">
              Stay Connected
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Stay Updated</h2>
            <p className="mb-8 text-gray-500 md:text-lg">
              Subscribe to our newsletter for seasonal recipes, farmer stories, and exclusive offers.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center w-full max-w-md mx-auto">
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 rounded-full border-emerald-200 pl-6 pr-24 sm:pr-32 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <Button className="absolute right-1 top-1 h-10 rounded-full bg-emerald-600 px-3 sm:px-6 hover:bg-emerald-700 text-white text-sm sm:text-base">
                  Subscribe
                </Button>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from MerrBio.
            </p>
          </div>
        </div>
      </section>


    </>

  )
}
