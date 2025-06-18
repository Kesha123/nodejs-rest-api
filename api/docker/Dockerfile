ARG GITHUB_TOKEN

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN echo "registry=https://registry.npmjs.org/" > .npmrc && \
    echo "@kesha123:registry=https://npm.pkg.github.com/" >> .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc && \
    npm install
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json  ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/main"]
