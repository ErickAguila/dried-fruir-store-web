import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ModernShop</h3>
            <p className="text-gray-600">Tu destino para compras en línea con los mejores productos y precios.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-600 hover:text-primary">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="text-gray-600 hover:text-primary">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="text-gray-600 hover:text-primary">
                  Mi Cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos?category=electronics" className="text-gray-600 hover:text-primary">
                  Electrónica
                </Link>
              </li>
              <li>
                <Link to="/productos?category=clothing" className="text-gray-600 hover:text-primary">
                  Ropa
                </Link>
              </li>
              <li>
                <Link to="/productos?category=home" className="text-gray-600 hover:text-primary">
                  Hogar
                </Link>
              </li>
              <li>
                <Link to="/productos?category=beauty" className="text-gray-600 hover:text-primary">
                  Belleza
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@modernshop.com</li>
              <li>Teléfono: +1 234 567 890</li>
              <li>Dirección: Calle Principal 123, Ciudad</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ModernShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

