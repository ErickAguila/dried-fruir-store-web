"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useProducts } from "../providers/ProductProvider"
import { useCart } from "../providers/CartProvider"
import { Button } from "../components/ui/button"
import { Star } from "lucide-react"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find((p) => p.id === id)

      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found, redirect to products page
        navigate("/productos")
      }
    }
  }, [id, products, navigate])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews} reseñas)</span>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b py-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                addToCart(product, quantity)
                navigate("/carrito")
              }}
            >
              Añadir al Carrito
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                addToCart(product, quantity)
                navigate("/carrito")
              }}
            >
              Comprar Ahora
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Vendedor: {product.seller}</p>
            <p>Disponible: {product.stock} unidades</p>
            <p>Categoría: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

