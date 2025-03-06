"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email, password) => {
    // In a real app, you would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate login validation
        if (email && password) {
          // Check if user exists in localStorage (for demo)
          const users = JSON.parse(localStorage.getItem("users") || "[]")
          const foundUser = users.find((u) => u.email === email)

          if (foundUser) {
            setUser(foundUser)
            localStorage.setItem("user", JSON.stringify(foundUser))
            resolve()
          } else {
            reject(new Error("Usuario no encontrado"))
          }
        } else {
          reject(new Error("Credenciales inválidas"))
        }
      }, 1000)
    })
  }

  const register = async (name, email, password, type) => {
    // In a real app, you would make an API call to register
    // For demo purposes, we'll simulate a successful registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Create a new user
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          type,
        }

        // Store in localStorage (for demo)
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))

        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update in users array too (for demo)
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  return <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

