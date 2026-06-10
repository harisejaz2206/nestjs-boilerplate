# NestJS Backend Template

Reusable NestJS starter for production-oriented SaaS and client backends.

## Included

- NestJS application structure with module boundaries
- PostgreSQL and TypeORM configuration
- TypeORM CLI DataSource and migration script
- Global validation pipe, exception filter, and response interceptor
- Swagger bootstrap
- Generic users module
- Auth module boundary for future auth strategies
- Health module for deployment and smoke checks
- Optional OpenAI config hook without any enabled AI workflow

## Removed Domain Logic

This template intentionally contains no product-specific modules, entities,
seed data, workflows, scheduled jobs, or client-specific integrations.

## Setup

```bash
npm install
cp .env.example .env
npm run build
```

## Run

```bash
npm run start:dev
```

Health check:

```bash
curl http://localhost:8080/api/health
```

Swagger is available at `/docs` when `ENABLE_SWAGGER=true`.

## Migrations

```bash
npm run migration:generate -- create_example_table
npm run migration:run
npm run migration:revert
```

Schema changes should be made through migrations. Runtime synchronization is
disabled by design.
