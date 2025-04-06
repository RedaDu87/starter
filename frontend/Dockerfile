# Étape 1 : builder Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npx ng build securecapitaapp --configuration=production


# Étape 2 : serveur NGINX pour servir l'app Angular
FROM nginx:alpine
COPY --from=build /app/dist/securecapitaapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
