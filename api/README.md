# Api Service

This service exposes the REST API built with [NestJS](https://nestjs.com/).

## Running locally

Install dependencies and start the development server:

```bash
npm install
npm run start:dev
```

The API listens on the port defined in `infrastructure/docker/.env` (default `3000`).

You can also run the API using Docker:

```bash
make api-start-local
```

This will start the prebuilt container defined in `infrastructure/docker/docker-compose.yaml`.
