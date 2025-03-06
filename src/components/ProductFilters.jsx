"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export default function ProductFilters() {
  const navigate = useNavigate()
  const location = useLocation()

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search)
  const categoryParam = searchParams.get("category")
  const minPriceParam = searchParams.get("minPrice")
  const maxPriceParam = searchParams.get("maxPrice")

  const [priceRange, setPriceRange] = useState([
    minPriceParam ? Number.parseInt(minPriceParam) : 0,
    maxPriceParam ? Number.parseInt(maxPriceParam) : 1000,
  ])

  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? [categoryParam] : [])

  // Update state when URL changes
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")

    if (categoryParam) {
      setSelectedCategories([categoryParam])
    } else {
      setSelectedCategories([])
    }

    setPriceRange([
      minPriceParam ? Number.parseInt(minPriceParam) : 0,
      maxPriceParam ? Number.parseInt(maxPriceParam) : 1000,
    ])
  }, [location.search])

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams(location.search)

    // Clear previous filters
    params.delete("category")
    params.delete("minPrice")
    params.delete("maxPrice")

    // Add new filters
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    }

    if (priceRange[1] < 1000) {
      params.set("maxPrice", priceRange[1].toString())
    }

    // Preserve search query if exists
    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }

    navigate(`/productos?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])

    // Preserve search query if exists
    const search = searchParams.get("search")
    if (search) {
      navigate(`/productos?search=${search}`)
    } else {
      navigate("/productos")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
          Limpiar Filtros
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="electronics"
                  checked={selectedCategories.includes("electronics")}
                  onCheckedChange={() => handleCategoryChange("electronics")}
                />
                <Label htmlFor="electronics">Electrónica</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="clothing"
                  checked={selectedCategories.includes("clothing")}
                  onCheckedChange={() => handleCategoryChange("clothing")}
                />
                <Label htmlFor="clothing">Ropa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="home"
                  checked={selectedCategories.includes("home")}
                  onCheckedChange={() => handleCategoryChange("home")}
                />
                <Label htmlFor="home">Hogar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="beauty"
                  checked={selectedCategories.includes("beauty")}
                  onCheckedChange={() => handleCategoryChange("beauty")}
                />
                <Label htmlFor="beauty">Belleza</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sports"
                  checked={selectedCategories.includes("sports")}
                  onCheckedChange={() => handleCategoryChange("sports")}
                />
                <Label htmlFor="sports">Deportes</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 1000]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />

              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                  className="w-20"
                />
                <span>a</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-20"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full">
        Aplicar Filtros
      </Button>
    </div>
  )
}

