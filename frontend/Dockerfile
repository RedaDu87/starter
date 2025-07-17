# Étape 1 : builder Angular Universal (SSR)
FROM node:20-alpine AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build:ssr

# Étape 2 : serveur Node.js Express pour le rendu SSR
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 4000

CMD ["node", "dist/securecapitaapp/server/main.js"]

