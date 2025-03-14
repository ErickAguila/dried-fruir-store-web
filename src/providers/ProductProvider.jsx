"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"

const ProductContext = createContext(undefined)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Cargar productos de la API
    api.get("/products")
      .then((response) => {
        const productList = [];
        response.data.forEach((product) => {
          productList.push({
            id: product.productId,
            name: product.name,
            description: product.description,
            // price: product.price,
            price: 100,
            category: product.category,
            image: product.urlImg,
            stock: product.stock,
            seller: 'Frutos secos',//Nombre del vendedor
            rating: 3, //Estas son las estrellas
            reviews: 50, //Personas que botaron estrellas
          })
        })
        setProducts(productList)
      })
      .catch((error) => {
        console.error("Error loading products:",
          error.message || error.response.data.message)
      }
    )
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

