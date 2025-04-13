"use client"

import { useState, useEffect } from "react";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import type { Product } from "@/lib/types";
import ChatbotButton from "@/components/chatbot";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000 },
    organic: false,
    inStock: false,
  });

  // Fetch products from the API endpoint
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    // Apply search query based on title, description, and category
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filter by category (exact match)
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }

    // Filter by price range
    result = result.filter(
      (product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );

    // Filter by organic status
    if (filters.organic) {
      result = result.filter((product) => product.isOrganic === true);
    }

    // Filter by in-stock status
    if (filters.inStock) {
      result = result.filter((product) => product.inStock === true);
    }

    setFilteredProducts(result);
  }, [filters, products, searchQuery]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: { min: 0, max: 1000 },
      organic: false,
      inStock: false,
    });
    setSearchQuery("");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Hero section */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-emerald-800">Fresh Products</h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover farm-fresh produce directly from local farmers. Filter by category, price, and more to find exactly what you need.
          </p>
        </div>

        {/* Search and filter bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products, farmers, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 rounded-full border-emerald-200 sm:w-auto md:hidden">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] md:hidden">
              <div className="py-4">
                <h2 className="mb-6 text-lg font-semibold">Filters</h2>
                <ProductFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
              </div>
            </SheetContent>
          </Sheet>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="h-12 rounded-full border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Desktop Filters */}
          <div className="hidden md:block">
            <div className="sticky top-20 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
              <ProductFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
            </div>
          </div>

          {/* Products grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="rounded-md border-gray-200 text-sm focus:border-emerald-500 focus:ring-emerald-500">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product._id} variants={item}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-white p-8 text-center">
                <div className="mb-4 rounded-full bg-emerald-100 p-3">
                  <Search className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">No products found</h3>
                <p className="mb-4 text-sm text-gray-500">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters} className="bg-emerald-600 hover:bg-emerald-700">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatbotButton />
    </div>
  );
}
