"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../providers/AuthProvider"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useToast } from "../components/ui/use-toast"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../services/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  // Get redirect path from query string
  const searchParams = new URLSearchParams(location.search)
  const redirect = searchParams.get("redirect") || "/"

  useEffect(() => {
    // If user is already logged in, redirect
    if (user) {
      navigate(redirect)
    }
  }, [user, navigate, redirect])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    await signInWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
      // console.log(response)
      await login(email, password, response.user.accessToken)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente",
      })
      navigate(redirect)
    })
    .catch((error) => {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.")
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.message || "Credenciales inválidas",
      })
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="text-primary font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

