# Node.js REST API with NestJs

![CI - Api](https://github.com/Kesha123/nodejs-rest-api/actions/workflows/ci-api.yaml/badge.svg)
![CI - Datasource](https://github.com/Kesha123/nodejs-rest-api/actions/workflows/ci-datasource.yaml/badge.svg)
![K8S Deployment](https://github.com/Kesha123/nodejs-rest-api/actions/workflows/k8s-deployment.yaml/badge.svg)

# Table of Contents
- [Description](#description)
- [Links](#links)
- [Stack](#stack)


# Description
An REST API allows to perform CRUD operations with a "fiction" company. The company includes departments and employees. The API includes data validation, database migrations, swagger documentation, unit, integration tests.

# Links
https://nodejs-rest-api.innokentii-kozlov.com - API endpoint.

https://nodejs-rest-api.innokentii-kozlov.com/api - API Swagger Documentation.

# Stack
 - [x] TypeScript & NestJs
 - [x] Docker
 - [x] Kubernetes
 - [x] GitHub Actions
 - [x] Postgres & TypeOrm
 - [x] Jest

## Getting Started

These instructions show how to run the database and API locally using Docker. Make sure you have [Docker](https://www.docker.com/) and [Make](https://www.gnu.org/software/make/) installed.

### 1. Generate TLS certificates

```bash
make generate-tls-certificates
```

### 2. Start the database

This command starts a PostgreSQL container and runs the initial migrations.

```bash
make database-start-local
```

### 3. Start the API

```bash
make api-start-local
```

The API will be available at `https://localhost:4430` by default.
