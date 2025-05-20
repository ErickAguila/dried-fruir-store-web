# Tienda Online

Una aplicación web moderna para la gestión y venta de productos de frutas deshidratadas construida con Vite, React y Firebase.

## 🚀 Características

- Interfaz de usuario moderna con Tailwind CSS
- Construcción y desarrollo rápido con Vite
- Integración con Firebase para servicios backend
- Soporte Docker para despliegue consistente
- ESLint para calidad del código

## 🛠️ Stack Tecnológico

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Firebase (Autenticación, Firestore, Storage)
- **Construcción**: Docker
- **Calidad de Código**: ESLint

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Docker (para despliegue en producción)

## 🚀 Empezando

### Instalación

1. Clonar el repositorio:
```bash
git clone [repository-url]
cd tienda-frutas-deshidratadas
```

2. Instalar dependencias:
```bash
npm install
```

### Desarrollo

1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

2. Abrir [http://localhost:5173](http://localhost:5173) en tu navegador

### Construcción en Producción

1. Construir para producción:
```bash
npm run build
```

2. Previsualizar la construcción en producción:
```bash
npm run preview
```

## 📦 Despliegue con Docker

El proyecto incluye un Dockerfile para despliegue en contenedor. Construir y ejecutar el contenedor:

```bash
npm run docker:build
npm run docker:run
```

## 🔐 Variables de Entorno

La aplicación utiliza variables de entorno para la configuración. Crea un archivo `.env` con las siguientes variables:

```env
VITE_API_URL=your-api-url
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
```

## 📝 Estructura del Proyecto

```
tienda-frutas-deshidratadas/
├── public/           # Recursos estáticos
├── src/              # Código fuente
│   ├── components/   # Componentes React
│   ├── pages/       # Componentes de páginas
│   ├── services/    # Servicios API y Firebase
│   └── styles/      # Estilos globales
├── .env             # Variables de entorno
├── Dockerfile       # Configuración Docker
└── package.json     # Dependencias y scripts
```

## 🛠️ Herramientas de Desarrollo

- **Formateo de Código**: ESLint con plugins React y TypeScript
- **CSS**: Tailwind CSS para estilos
- **Construcción**: Vite para desarrollo y construcciones en producción rápidas
- **Pruebas**: Jest (configurado en package.json)

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## 🤝 Contribuyendo

1. Fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Añadir alguna AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre una Pull Request

## 👥 Autores

- Erick Aguila - Trabajo inicial

## 📚 Documentación

- [Documentación de Vite](https://vitejs.dev/guide/)
- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Documentación de Firebase](https://firebase.google.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## 🔍 Estado del Proyecto

[![GitHub issues](https://img.shields.io/github/issues/yourusername/tienda-frutas-deshidratadas)](https://github.com/yourusername/tienda-frutas-deshidratadas/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/tienda-frutas-deshidratadas)](https://github.com/yourusername/tienda-frutas-deshidratadas/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/tienda-frutas-deshidratadas)](https://github.com/yourusername/tienda-frutas-deshidratadas/stargazers)

---

Hecho con ❤️ por Erick Aguila