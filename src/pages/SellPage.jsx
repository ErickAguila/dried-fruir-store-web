"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { useProducts } from "../providers/ProductProvider"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useNavigate } from "react-router-dom"
import { useToast } from "../components/ui/use-toast"

export default function SellPage() {
  const { user } = useAuth()
  const { addProduct } = useProducts()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [stock, setStock] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=/vender")
      return
    }

    if (user.type !== "seller") {
      navigate("/perfil")
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: "Solo los vendedores pueden acceder a esta página",
      })
    }
  }, [user, navigate, toast])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newProduct = {
      id: `prod-${Date.now()}`,
      name,
      description,
      price: Number.parseFloat(price),
      category,
      image: image || "/placeholder.svg?height=400&width=400",
      stock: Number.parseInt(stock),
      seller: user?.name || "Unknown Seller",
      rating: 0,
      reviews: 0,
    }

    addProduct(newProduct)

    toast({
      title: "Producto publicado",
      description: "Tu producto ha sido publicado exitosamente",
    })

    setIsLoading(false)
    navigate("/perfil?tab=seller")
  }

  if (!user || user.type !== "seller") {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Publicar Nuevo Producto</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ej: Smartphone Samsung Galaxy S21"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe tu producto en detalle"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Disponible</Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                min="1"
                placeholder="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electrónica</SelectItem>
                <SelectItem value="clothing">Ropa</SelectItem>
                <SelectItem value="home">Hogar</SelectItem>
                <SelectItem value="beauty">Belleza</SelectItem>
                <SelectItem value="sports">Deportes</SelectItem>
                <SelectItem value="toys">Juguetes</SelectItem>
                <SelectItem value="books">Libros</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de la Imagen</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <p className="text-xs text-gray-500">Deja en blanco para usar una imagen predeterminada</p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Publicando..." : "Publicar Producto"}
          </Button>
        </form>
      </div>
    </div>
  )
}

