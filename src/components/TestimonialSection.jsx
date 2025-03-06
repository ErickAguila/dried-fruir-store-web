import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María García",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Cliente Frecuente",
    content:
      "He comprado varios productos en esta tienda y siempre he quedado satisfecha. La calidad es excelente y el servicio al cliente es inmejorable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Comprador Nuevo",
    content:
      "Mi primera experiencia comprando aquí fue genial. El proceso de compra es muy sencillo y mi pedido llegó antes de lo esperado.",
    rating: 4,
  },
  {
    id: 3,
    name: "Laura Martínez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Vendedora",
    content:
      "Como vendedora, puedo decir que la plataforma es muy intuitiva y me ha ayudado a aumentar mis ventas considerablemente.",
    rating: 5,
  },
]

export default function TestimonialSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Descubre por qué nuestros clientes confían en nosotros para sus compras en línea
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

