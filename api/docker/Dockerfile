FROM node:20-alpine AS build
ARG GITHUB_TOKEN
WORKDIR /app
COPY package*.json ./
RUN echo "registry=https://registry.npmjs.org/" > .npmrc && \
    echo "@kesha123:registry=https://npm.pkg.github.com/" >> .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
RUN npm install --omit=dev
COPY . .

FROM node:20-alpine
ARG GITHUB_TOKEN
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json  ./
RUN echo "registry=https://registry.npmjs.org/" > .npmrc && \
    echo "@kesha123:registry=https://npm.pkg.github.com/" >> .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
RUN npm install
EXPOSE 3000
CMD ["node", "dist/main"]
