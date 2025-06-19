# Datasource and Migrations Service

This package contains the TypeORM datasource and database migrations used by the API.

## Running migrations locally

Install dependencies and run the migrations:

```bash
npm install
npm run migrations:run
```

When using Docker the migrations are executed automatically by `make database-start-local`.
