"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

interface ProductFiltersProps {
  filters: {
    category: string
    priceRange: { min: number; max: number }
    organic: boolean
    inStock: boolean
  }
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
}

export default function ProductFilters({ filters, onFilterChange, onClearFilters }: ProductFiltersProps) {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  const handleCategoryChange = (value: string) => {
    onFilterChange({ category: value })
  }

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ priceRange: { min: value[0], max: value[1] || 1000 } })
  }

  const handleOrganicChange = (checked: boolean) => {
    onFilterChange({ organic: checked })
  }

  const handleInStockChange = (checked: boolean) => {
    onFilterChange({ inStock: checked })
  }

  const activeFilterCount = [
    filters.category !== "",
    filters.organic,
    filters.inStock,
    filters.priceRange.min > 0 || filters.priceRange.max < 1000,
  ].filter(Boolean).length

  const filtersContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        {activeFilterCount > 0 && (
          <Badge variant="outline" className="flex items-center gap-1 border-emerald-200 text-emerald-700">
            {activeFilterCount} active
          </Badge>
        )}
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={onClearFilters} className="mb-4 w-full gap-2">
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}

      <Accordion type="single" collapsible defaultValue="category" className="w-full">
        <AccordionItem value="category" className="border-b border-emerald-100">
          <AccordionTrigger className="py-4 text-base hover:text-emerald-600 hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Select value={filters.category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b border-emerald-100">
          <AccordionTrigger className="py-4 text-base hover:text-emerald-600 hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-700">${filters.priceRange.min}</span>
                <span className="text-sm font-medium text-emerald-700">${filters.priceRange.max}</span>
              </div>
              <Slider
                defaultValue={[filters.priceRange.min, filters.priceRange.max]}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
                className="py-4"
              />
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Min: $0</span>
                <span className="text-xs text-gray-500">Max: $1000</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="options" className="border-b border-emerald-100">
          <AccordionTrigger className="py-4 text-base hover:text-emerald-600 hover:no-underline">
            Options
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="organic" className="text-sm font-medium">
                    Organic Only
                  </Label>
                  <p className="text-xs text-gray-500">Show only organic certified products</p>
                </div>
                <Switch
                  id="organic"
                  checked={filters.organic}
                  onCheckedChange={handleOrganicChange}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="inStock" className="text-sm font-medium">
                    In Stock Only
                  </Label>
                  <p className="text-xs text-gray-500">Hide products that are out of stock</p>
                </div>
                <Switch
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={handleInStockChange}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {isMobile ? (
        <div className="mb-6">
          <Button onClick={toggleFilters} variant="outline" className="w-full gap-2">
            <Filter className="h-4 w-4" />
            {isOpen ? "Hide Filters" : "Show Filters"}
            {activeFilterCount > 0 && <Badge className="ml-2 bg-emerald-600 text-white">{activeFilterCount}</Badge>}
          </Button>

          {isOpen && <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">{filtersContent}</div>}
        </div>
      ) : (
        <div>{filtersContent}</div>
      )}
    </>
  )
}
