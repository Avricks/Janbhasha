# Backend Microservices Layer (`services/`)

This directory contains the independent, domain-driven microservices that power the Janbhasha platform. Each service runs on an assigned port, exposes RESTful endpoints, and implements a uniform 3-tier architectural separation.

---

## Architecture Pattern in Each Service

Every microservice follows the exact same folder structure:

```
services/<service-name>/src/
├── controllers/    # HTTP Request extraction, Zod validation, status codes, response formatting (.ts)
├── routes/         # Express Router bindings connecting endpoints to controllers (.ts)
├── services/       # Core business logic, domain algorithms, mathematical models (.ts)
└── index.ts        # Service entry point, middleware registration, health checks (.ts)
```

---

## Directory & Capability Breakdown

| Service Directory | Port | Primary Capability | Key File Types | How It Works |
| :--- | :--- | :--- | :--- | :--- |
| **`services/api/`** | `3000` | **Central API Gateway & Auth:** User authentication, JWT issuance, RBAC middleware, lessons routing. | `.ts`, `.prisma`, `.json` | Accepts incoming HTTPS requests from clients, verifies JWT bearer tokens, enforces rate limits, queries PostgreSQL via Prisma, and proxies to domain services. |
| **`services/assessment/`** | `3004` | **Item Response Theory (IRT 3PL) Engine:** Dynamic ability estimation ($\theta$), quiz grading, and adaptive item routing. | `.ts`, `.json` | Receives student quiz submissions, estimates cognitive ability using Maximum A Posteriori (MAP) 3PL math, updates mastery scores, and selects optimal questions. |
| **`services/content/`** | `3003` | **Curriculum & Worksheet Studio:** Course structure management and DIKSHA-aligned dual-script printable worksheet synthesis. | `.ts`, `.json` | Queries curriculum modules, formats parallel native-script exercises (Ol Chiki/Mundari), and compiles print-ready exercise packages. |
| **`services/speech/`** | `3002` | **Acoustic ASR & TTS Processing:** Pronunciation evaluation, reading fluency metrics (WPM), and speech synthesis. | `.ts`, `.json` | Ingests base64 audio buffers, runs Conformer acoustic inference, calculates phonetic time alignment, and purges raw audio post-scoring (DPDP compliance). |
| **`services/sync/`** | `3005` | **Offline Delta Sync & Conflict Resolution:** Edge transaction ledger ingestion, vector clock verification, and CRDT merging. | `.ts`, `.json` | Ingests batch delta logs from offline Android tablets, verifies Lamport causality, resolves concurrent state conflicts, and returns server change-sets. |
| **`services/translation/`** | `3001` | **Neural Translation & Script Parsing:** Bidirectional translation for Santhali, Mundari, Ho, Hindi, and English. | `.ts`, `.json` | Checks local translation memory cache for existing lemmas; falls back to fine-tuned NMT pipeline for agglutinative stem translation. |

---

## Common Dependencies
* `express` & `helmet`: Lightweight HTTP server with secure headers.
* `@janbhasha/domain`: Shared TypeScript entities and types.
* `@janbhasha/schemas`: Shared Zod validation schemas.
* `@janbhasha/shared`: Shared encryption and utility helpers.
