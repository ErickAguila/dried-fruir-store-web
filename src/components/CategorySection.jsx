import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const categories = [
  {
    id: "electronics",
    name: "Electrónica",
    description: "Smartphones, laptops, gadgets y más",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "clothing",
    name: "Ropa",
    description: "Moda para hombres, mujeres y niños",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "home",
    name: "Hogar",
    description: "Muebles, decoración y artículos para el hogar",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "beauty",
    name: "Belleza",
    description: "Cosméticos, perfumes y cuidado personal",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Explora por Categoría</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Navega a través de nuestras categorías para encontrar exactamente lo que estás buscando
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} to={`/productos?category=${category.id}`} className="group">
            <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <div className="h-48 bg-center bg-cover" style={{ backgroundImage: `url(${category.image})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button variant="outline" className="w-full">
                  Explorar
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

