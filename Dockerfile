# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Inyectamos la variable de entorno en tiempo de build
ARG VITE_URL_BFF_WEB
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

ENV VITE_URL_BFF_WEB=$VITE_URL_BFF_WEB
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo 'server { \
  listen ${PORT}; \
  location / { \
    root /usr/share/nginx/html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf.template

CMD ["sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
EXPOSE 8080