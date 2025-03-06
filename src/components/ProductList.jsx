"use client"

import { useProducts } from "../providers/ProductProvider"
import { useCart } from "../providers/CartProvider"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Star, ShoppingCart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ProductList() {
  const { products } = useProducts()
  const { addToCart } = useCart()
  const location = useLocation()
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search)
  const categoryFilter = searchParams.get("category")
  const searchQuery = searchParams.get("search")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  useEffect(() => {
    let result = [...products]

    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    if (minPrice && !isNaN(Number.parseFloat(minPrice))) {
      result = result.filter((product) => product.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice && !isNaN(Number.parseFloat(maxPrice))) {
      result = result.filter((product) => product.price <= Number.parseFloat(maxPrice))
    }

    setFilteredProducts(result)
  }, [products, categoryFilter, searchQuery, minPrice, maxPrice])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-medium mb-4">No se encontraron productos</h2>
        <p className="text-gray-500">Intenta con otros filtros o términos de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative h-48">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <CardHeader className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
            <Link to={`/productos/${product.id}`}>
              <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
            </Link>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Vendedor: {product.seller}</p>
              <p>Disponible: {product.stock} unidades</p>
            </div>
          </CardContent>

          <CardFooter className="p-4 flex items-center justify-between">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => addToCart(product, 1)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Añadir
              </Button>
              <Link to={`/productos/${product.id}`}>
                <Button size="sm">Ver</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

