"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-10-15",
    total: 125.99,
    status: "Entregado",
    items: [
      { id: 1, name: "Smartphone XYZ", quantity: 1, price: 99.99 },
      { id: 2, name: "Funda Protectora", quantity: 1, price: 15.99 },
      { id: 3, name: "Cargador Rápido", quantity: 1, price: 10.01 },
    ],
  },
  {
    id: "ORD-002",
    date: "2023-11-02",
    total: 45.5,
    status: "En camino",
    items: [{ id: 4, name: "Camiseta Deportiva", quantity: 2, price: 22.75 }],
  },
  {
    id: "ORD-003",
    date: "2023-11-10",
    total: 199.99,
    status: "Procesando",
    items: [{ id: 5, name: "Auriculares Bluetooth", quantity: 1, price: 199.99 }],
  },
]

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch orders from an API
    // For now, we'll use mock data
    setOrders(mockOrders)
  }, [])

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-medium mb-4">No tienes pedidos aún</h2>
        <p className="text-gray-500 mb-8">Cuando realices compras, aparecerán aquí</p>
        <Button>Explorar Productos</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Historial de Pedidos</h2>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                <p className="text-sm text-gray-500">Fecha: {order.date}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <Badge
                  variant={
                    order.status === "Entregado" ? "default" : order.status === "En camino" ? "secondary" : "outline"
                  }
                >
                  {order.status}
                </Badge>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Button variant="ghost" onClick={() => toggleOrderDetails(order.id)} className="w-full justify-between">
              {expandedOrder === order.id ? "Ocultar Detalles" : "Ver Detalles"}
              <span>{expandedOrder === order.id ? "▲" : "▼"}</span>
            </Button>

            {expandedOrder === order.id && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Productos</h3>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

