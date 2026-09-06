# Test Suites & Quality Assurance (`tests/`)

This directory contains automated unit, integration, offline synchronization, and end-to-end test suites verifying system resilience and correctness.

---

## Directory & Capability Breakdown

```
tests/
├── offline/      # Distributed offline synchronization and CRDT conflict resolution tests (.ts)
├── unit/         # Component and microservice unit tests (.ts, .tsx)
│   ├── api/      # Gateway route validation, JWT authentication, and error handling
│   └── ui/       # Accessible UI component rendering, theme switching, and keyboard navigation
```

---

### Detailed Capabilities

| Directory | Key File Types | Capability & Responsibilities | How It Works |
| :--- | :--- | :--- | :--- |
| **`tests/offline/`** | `.ts` | **Edge Synchronization Verification:** Simulates multi-tablet classroom scenarios with intermittent 2G disconnections, vector clock inversions, and simultaneous lesson submissions. | Verifies that the CRDT reconciliation logic deterministically merges conflicting offline ledger logs without data loss. |
| **`tests/unit/api/`** | `.ts` | **Backend Gateway Correctness:** Tests route handlers, Zod schema validation edge cases, password hashing, and token expiration. | Executes via Vitest with mocked database clients to ensure microservices handle malformed requests gracefully. |
| **`tests/unit/ui/`** | `.tsx`, `.ts` | **Accessibility & Component Quality:** Tests React design system components (`Button`, `Input`, `Modal`) for WCAG 2.1 AA compliance. | Mounts components with `@testing-library/react` and audits color contrast ratios, ARIA attributes, and keyboard focus traps. |
