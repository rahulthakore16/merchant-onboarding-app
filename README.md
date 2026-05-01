# Merchant Onboarding App

A full-stack merchant registration application with a multi-step form and merchant listing.

## Tech Stack

### Backend
- **Python 3.12** + **FastAPI** — async web framework
- **PostgreSQL 16** — relational database
- **SQLAlchemy 2.0** (async) — ORM with type-annotated models
- **Alembic** — database migrations
- **Pydantic v2** — request/response validation
- **structlog** — structured logging

### Frontend
- React + TypeScript + Vite 

## Prerequisites

- Python 3.12+
- Node.js 20+
- Docker & Docker Compose (for PostgreSQL)

## Quick Start

### Option A: Full-stack with Docker (recommended)

```bash
docker-compose up --build
```

This starts PostgreSQL, the backend (port 8000), and the frontend (port 80) in one command. Visit [http://localhost](http://localhost) once all containers are ready.

### Option B: Manual setup

#### 1. Start PostgreSQL

```bash
docker-compose up -d postgres
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
```

### 4. Run database migrations

```bash
alembic upgrade head
```

### 5. Start the server

```bash
uvicorn app.main:app --reload --port 8000
```

### 6. Set up the frontend

```bash
cd frontend
npm install
```

### 7. Start the frontend

```bash
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

### 8. Open API docs

Visit [http://localhost:8000/docs](http://localhost:8000/docs) for interactive Swagger UI.

## API Endpoints

| Method | Path | Status | Description |
|--------|------|--------|-------------|
| `POST` | `/api/v1/merchants` | 201 | Register a new merchant |
| `GET` | `/api/v1/merchants` | 200 | List merchants (paginated) |
| `GET` | `/api/v1/merchants/{id}` | 200 | Get merchant by ID |
| `GET` | `/health` | 200 | Health check |

### Query Parameters (GET /api/v1/merchants)

| Param | Default | Range | Description |
|-------|---------|-------|-------------|
| `limit` | 20 | 1-100 | Items per page |
| `offset` | 0 | 0+ | Items to skip |

### Error Response Format

All errors follow a consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {"field": "body.email", "message": "value is not a valid email address"}
    ]
  }
}
```

## Seed Sample Data

```bash
cd backend
python -m seed
```

Inserts 5 sample merchants (coffee shop, online store, restaurant, boutique, gym) so the list page isn't empty on first load. Skips if data already exists.

## Running Tests

```bash
# Backend — ensure PostgreSQL is running, then create the test database:
docker exec -it merchant_db psql -U postgres -c "CREATE DATABASE merchant_test_db;"
cd backend
pytest -v

# Frontend — unit tests for validation schemas and components:
cd frontend
npm test
```

## Design Decisions

1. **PostgreSQL + asyncpg** — Production-grade async database access with connection pooling.
2. **Router / Service / Repository** — Clean layered architecture separating HTTP concerns, business logic, and data access.
3. **Alembic migrations** — Schema changes are versioned and reproducible.
4. **Structured error responses** — Consistent `{"error": {...}}` format across all error types (validation, conflict, not found).
5. **API versioning (`/api/v1/`)** — Forward-compatible API design.
6. **Pagination** — Production APIs should never return unbounded result sets.
7. **UUID primary keys** — Non-enumerable, distributed-friendly identifiers.
8. **Merchant status field** — Domain-aware modeling (`pending`, `active`, `rejected`) beyond minimum requirements.
9. **Pydantic settings** — Environment-based configuration with `.env` file support.
10. **Docker Compose** — One-command database setup for reviewers.

## Next Steps

If this were a production system, the following enhancements would be prioritized:

1. **Authentication & Authorization** — JWT-based auth with role-based access control for merchant management.
2. **Rate Limiting** — Per-IP and per-endpoint rate limits to prevent abuse.
3. **E2E Tests** — Playwright tests covering the full onboarding flow and merchant list.
4. **Deployment** — Automated deployment to a cloud provider with staging and production environments.
5. **Monitoring & Alerting** — Application performance monitoring with structured log aggregation.
6. **Merchant Status Workflow** — Admin interface to review, approve, or reject pending merchants.

## Project Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI app, CORS, lifespan
│   ├── core/
│   │   ├── config.py              # Environment settings
│   │   ├── database.py            # Async engine & session
│   │   ├── exceptions.py          # Custom exception classes
│   │   └── exception_handlers.py  # Global error handlers
│   ├── models/
│   │   └── merchant.py            # SQLAlchemy ORM model
│   ├── schemas/
│   │   ├── common.py              # Shared response schemas
│   │   └── merchant.py            # Merchant validation schemas
│   ├── services/
│   │   └── merchant_service.py    # Business logic
│   ├── repositories/
│   │   └── merchant_repository.py # Data access layer
│   └── api/v1/
│       ├── router.py              # V1 router aggregator
│       └── merchants.py           # Merchant endpoints
├── alembic/                       # Database migrations
├── tests/                         # Integration tests
├── requirements.txt
└── Dockerfile
```
