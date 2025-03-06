import { useProducts } from "../providers/ProductProvider"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function FeaturedProducts() {
  const { products } = useProducts()

  // Get 4 featured products
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Productos Destacados</h2>
          <p className="text-gray-500">Descubre nuestra selección de productos populares</p>
        </div>

        <Link to="/productos">
          <Button variant="outline" className="mt-4 md:mt-0">
            Ver Todos
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
              <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
            </CardContent>

            <CardFooter className="p-4 flex items-center justify-between">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              <Link to={`/productos/${product.id}`}>
                <Button size="sm">Ver Detalles</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

