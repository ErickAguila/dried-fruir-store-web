"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ProductContext = createContext(undefined)

const initialProducts = [
  {
    id: "prod-1",
    name: "Smartphone XYZ",
    description: "Un smartphone de última generación con cámara de alta resolución y batería de larga duración.",
    price: 99.99,
    category: "electronics",
    image: "https://clsonyb2c.vtexassets.com/arquivos/ids/465973/00-GENBA-WH-CH520-C-Main-Image-Sony-Store-Online.jpg.jpg?v=638747999319900000",
    stock: 50,
    seller: "Tech Solutions",
    rating: 4,
    reviews: 120,
  },
  {
    id: "prod-2",
    name: "Camiseta Deportiva",
    description: "Camiseta de algodón transpirable ideal para practicar deportes o para uso casual.",
    price: 22.75,
    category: "clothing",
    image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/121673949_01/w=800,h=800,fit=pad",
    stock: 100,
    seller: "Sportswear Inc.",
    rating: 5,
    reviews: 85,
  },
  {
    id: "prod-3",
    name: "Auriculares Bluetooth",
    description: "Auriculares inalámbricos con cancelación de ruido y sonido de alta fidelidad.",
    price: 199.99,
    category: "electronics",
    image: "https://casaroyal.vtexassets.com/arquivos/ids/166295-800-800?v=638626949794330000&width=800&height=800&aspect=true",
    stock: 30,
    seller: "AudioTech",
    rating: 4,
    reviews: 210,
  },
  {
    id: "prod-4",
    name: "Mesa de Comedor",
    description: "Mesa de comedor de madera maciza con diseño moderno y elegante.",
    price: 349.0,
    category: "home",
    image: "https://cdnx.jumpseller.com/gsm-chile/image/59364803/thumb/1500/1500?1739994479",
    stock: 15,
    seller: "Furniture World",
    rating: 3,
    reviews: 50,
  },
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product])
  }

  const removeProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
  }

  return <ProductContext.Provider value={{ products, addProduct, removeProduct }}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

