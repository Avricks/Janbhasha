# Shared Packages Layer (`packages/`)

This directory contains shared internal libraries utilized across client applications (`apps/*`) and backend microservices (`services/*`). Building shared logic in monorepo packages guarantees 100% type safety, single-source-of-truth validation, and zero duplicated code.

---

## Package Directory & Capability Breakdown

```
packages/
├── domain/       # Core enterprise domain models, interfaces, and TypeScript enums
├── schemas/      # Zod validation schemas enforcing runtime data integrity
├── api-client/   # Strongly-typed HTTP client SDK for interacting with all microservices
├── shared/       # Cross-cutting cryptographic, compression, date, and string utilities
└── ui/           # Accessible WCAG 2.1 AA design system UI component library
```

---

### Detailed Capabilities

| Package | Key File Types | Capability & Responsibilities | How It Works |
| :--- | :--- | :--- | :--- |
| **`packages/domain/`** | `.ts`, `.json` | **Domain Entities & Types:** Defines domain models for Users, Lessons, Quizzes, Progress, Languages (Santhali, Mundari, Ho), and Sync batches. | Exported TypeScript interfaces and enums imported by both frontend apps and backend microservices to ensure data contracts match exactly. |
| **`packages/schemas/`** | `.ts`, `.json` | **Runtime Contract Validation:** Zod schemas for validating incoming HTTP request bodies, query params, and JSON payloads. | Validates untrusted client data in Express middleware (`services/api/src/middleware/validation.ts`) before passing to controllers; strips malicious payloads. |
| **`packages/api-client/`** | `.ts`, `.json` | **Unified Client SDK:** Type-safe API client exposing structured methods for Auth, Lessons, Assessments, Sync, and Translation. | Wraps `fetch` requests with automatic JWT bearer token injection, retry backoff, and strongly-typed promise responses. |
| **`packages/shared/`** | `.ts`, `.json` | **Universal Utilities & Constants:** AES-256 encryption, Brotli/Gzip compression, date parsing, and language codes. | Provides high-performance cryptographic routines for offline database encryption and vector clock delta packing. |
| **`packages/ui/`** | `.tsx`, `.ts`, `.md` | **Design System UI Library:** Accessible React components (`Button`, `Input`, `Modal`, `Navigation`, `OfflineIndicator`) and design tokens. | Enforces WCAG 2.1 AA compliance (48px+ touch targets, 4.5:1 contrast, screen-reader labels) across Teacher Web, Admin Web, and React Native Android. |
