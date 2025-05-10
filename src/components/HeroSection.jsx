import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-40"
        style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg")' }}
      ></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cambios de diseño para activar workflow</h1>
          <p className="text-lg md:text-xl mb-8">
            Explora nuestra colección de productos de alta calidad seleccionados para ti. Desde electrónica hasta moda,
            tenemos todo lo que necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/productos">
              <Button size="lg" className="w-full sm:w-auto">
                Explorar Productos
              </Button>
            </Link>
            <Link to="/registro">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-black">
                Crear Cuenta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

