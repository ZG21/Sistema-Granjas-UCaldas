# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: Servir la app
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

# Instalar servidor estático
RUN npm install -g serve

# Render expone el puerto en la variable PORT
EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l $PORT"]
