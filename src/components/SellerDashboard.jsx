"use client"

import { useAuth } from "../providers/AuthProvider"
import { useProducts } from "../providers/ProductProvider"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useToast } from "./ui/use-toast"

// Mock data for sales
const mockSales = [
  {
    id: "SALE-001",
    date: "2023-10-20",
    product: "Smartphone XYZ",
    customer: "Juan Pérez",
    amount: 99.99,
    status: "Completado",
  },
  {
    id: "SALE-002",
    date: "2023-11-05",
    product: "Auriculares Bluetooth",
    customer: "María López",
    amount: 199.99,
    status: "Completado",
  },
  {
    id: "SALE-003",
    date: "2023-11-12",
    product: "Camiseta Deportiva",
    customer: "Carlos Rodríguez",
    amount: 22.75,
    status: "Procesando",
  },
]

export default function SellerDashboard() {
  const { user } = useAuth()
  const { products, removeProduct } = useProducts()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("products")

  // Filter products by current seller
  const sellerProducts = products.filter((product) => product.seller === user?.name)

  const handleRemoveProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      removeProduct(productId)
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <h2 className="text-2xl font-bold">Panel de Vendedor</h2>
        <Link to="/vender">
          <Button className="mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
          <CardDescription>Estadísticas de tus ventas y productos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Productos</h3>
              <p className="text-3xl font-bold">{sellerProducts.length}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Ventas</h3>
              <p className="text-3xl font-bold">{mockSales.length}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Ingresos</h3>
              <p className="text-3xl font-bold">${mockSales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="products">Mis Productos</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {sellerProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-4">No tienes productos publicados</h3>
              <p className="text-gray-500 mb-8">Comienza a vender publicando tu primer producto</p>
              <Link to="/vender">
                <Button>Publicar Producto</Button>
              </Link>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sellerProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(product.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sales">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${sale.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={sale.status === "Completado" ? "default" : "outline"}>{sale.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

