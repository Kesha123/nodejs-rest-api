FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS migrations
WORKDIR /migrations
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/src ./src
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/.env ./
CMD ["npx", "typeorm-ts-node-commonjs", "-d", "src/datasource.ts", "migration:run"]
