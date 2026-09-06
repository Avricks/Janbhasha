# Data & Pedagogical Content Layer (`data/`)

This directory houses the foundational curriculum datasets, bilingual glossaries, translation memory stores, database seed packages, and test fixtures that power Janbhasha.

---

## Directory & Capability Breakdown

```
data/
├── curriculum/          # Structured course modules and competency units (.json, .md)
├── glossary/            # Comprehensive bilingual dictionaries for indigenous scripts (.json)
├── seed/                # Seed data for initial database population (.json)
├── translation-memory/  # Verified translation memory cache pairs (.json)
└── fixtures/            # Mock dataset fixtures for automated CI/CD unit and e2e tests (.json)
```

---

### Detailed Capabilities

| Directory | Key File Types | Capability & Responsibilities | How It Works |
| :--- | :--- | :--- | :--- |
| **`data/curriculum/`** | `.json` | **Pedagogical Lessons & Outcomes:** Maps JCERT/DIKSHA competencies to vernacular literacy milestones. | Ingested by `services/content` to serve lessons and worksheets to Android tablets and Teacher Web. |
| **`data/glossary/`** | `.json` | **Bilingual Script Glossaries:** Verified word-level glossaries translating Santhali (Ol Chiki), Mundari, and Ho to English and Hindi. | Provides instant $O(1)$ dictionary lookups in the translation engine before invoking heavier neural translation models. |
| **`data/seed/`** | `.json` | **Database Initialization:** Production and staging baseline records for roles, demo school nodes, and foundational phoneme quizzes. | Run during container startup (`scripts/setup/seed-db.ts`) to populate PostgreSQL with valid initial state. |
| **`data/translation-memory/`** | `.json` | **High-Confidence Translation Memory:** Curated human-verified parallel sentences for educational and civic domains. | Enables exact-match translation caching, drastically reducing inference latency and compute cost. |
| **`data/fixtures/`** | `.json` | **Testing & CI/CD Fixtures:** Deterministic student profiles, quiz items, and vector clock histories for test execution. | Loaded by Vitest and Jest suites to verify offline sync, IRT scoring, and authentication pipelines without external dependencies. |
