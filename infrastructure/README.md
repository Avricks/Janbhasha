# Infrastructure & Deployment Layer (`infrastructure/`)

This directory contains container definitions, database initialization scripts, orchestration configurations, and observability setups for running Janbhasha locally or in cloud cluster environments.

---

## Directory & Capability Breakdown

```
infrastructure/
├── docker/       # Multi-stage Dockerfiles and local compose clusters (.yml, Dockerfile)
├── database/     # PostgreSQL relational database initialization schemas (.sql)
└── monitoring/   # Observability and metrics collection configurations (.yml)
```

---

### Detailed Capabilities

| Directory | Key File Types | Capability & Responsibilities | How It Works |
| :--- | :--- | :--- | :--- |
| **`infrastructure/docker/`** | `Dockerfile.*`, `.yml` | **Containerization & Orchestration:** Builds lightweight, secure production images for Node.js microservices and Python ML engines; orchestrates multi-service local stack via `docker-compose.yml`. | Defines multi-stage alpine builds that minimize image sizes and expose standard service ports (`3000`–`3005`, `5432`, `6379`). |
| **`infrastructure/database/`** | `.sql` | **Database Schema Initialization:** SQL migration and seed scripts (`init.sql`) enabling required extensions (`uuid-ossp`, `pg_trgm`). | Mounted to `/docker-entrypoint-initdb.d` in the PostgreSQL container to prepare tables and indexes on first startup. |
| **`infrastructure/monitoring/`** | `.yml` | **Telemetry & Metrics Scrapers:** Prometheus configuration (`prometheus.yml`) scraping health metrics and latency histograms across services. | Ingests `/health` and Prometheus metrics endpoints every 15 seconds to monitor microservice availability and memory consumption. |
