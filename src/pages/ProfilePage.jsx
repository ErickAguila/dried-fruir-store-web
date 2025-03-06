"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useNavigate, useLocation } from "react-router-dom"
import OrderHistory from "../components/OrderHistory"
import UserSettings from "../components/UserSettings"
import SellerDashboard from "../components/SellerDashboard"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get active tab from query params if exists
  const searchParams = new URLSearchParams(location.search)
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState(tabParam || "orders")

  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=/perfil")
    }
  }, [user, navigate])

  const handleTabChange = (value) => {
    setActiveTab(value)
    navigate(`/perfil?tab=${value}`, { replace: true })
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className="text-gray-500">Bienvenido, {user.name}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            logout()
            navigate("/")
          }}
        >
          Cerrar Sesión
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-8">
          <TabsTrigger value="orders">Mis Pedidos</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
          {user.type === "seller" && <TabsTrigger value="seller">Panel de Vendedor</TabsTrigger>}
        </TabsList>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="settings">
          <UserSettings />
        </TabsContent>

        {user.type === "seller" && (
          <TabsContent value="seller">
            <SellerDashboard />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

