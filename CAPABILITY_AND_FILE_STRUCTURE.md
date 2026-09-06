# Janbhasha Architectural Capability & File Structure Guide

This document provides a comprehensive, function-by-function breakdown of the **Janbhasha** repository. It details what every file type contains, what capability each folder encapsulates, and how the entire platform operates end-to-end.

---

## 1. File Type to Functional Capability Matrix

In the Janbhasha platform, file extensions strictly denote functional capabilities:

| File Extension | Functional Role | Where Used | Capability & Why This File Type Was Chosen |
| :--- | :--- | :--- | :--- |
| **`.ts`** | Core Logic & Contracts | `services/*`, `packages/*` | **Strongly-Typed Business Logic:** Microservices, controllers, domain entities, and Zod validation schemas. Guarantees compile-time safety and prevents runtime type errors across microservice boundaries. |
| **`.tsx`** | Reactive Visual UI | `apps/android/`, `apps/*-web/`, `packages/ui/` | **Accessible Component Interfaces:** React and React Native user interfaces for tribal learners, school teachers, and district administrators with WCAG 2.1 AA compliance. |
| **`.py`** | Machine Learning & NLP | `ai/pipelines/`, `ai/evaluation/` | **Deep Learning & Evaluation:** PyTorch and Hugging Face training pipelines for Conformer speech encoders (ASR/TTS) and neural machine translation (NMT). |
| **`.json`** | Ground Truth & Data Schemas | `ai/language-packs/`, `data/*`, `packages/*` | **Linguistic Dictionaries & Seed Data:** Austroasiatic language packs (Santhali, Mundari, Ho), translation memory pairs, and seed curriculum packages. Fast $O(1)$ dictionary parsing without database overhead. |
| **`.prisma`** | Relational ORM Mapping | `services/api/prisma/` | **Type-Safe Database Schema:** Defines PostgreSQL models (Users, Classes, Lessons, SyncLedger) and generates migration queries automatically. |
| **`.sql`** | Database Initialization | `infrastructure/database/` | **Raw Engine Bootstrap:** PostgreSQL initial scripts enabling required extensions (`uuid-ossp`, `pg_trgm`) and database roles. |
| **`.html`** | Semantic Web Pages | `apps/web/`, `docs/` | **High-Performance Web Showcases:** Dedicated, search-engine-optimized pages for each feature, custom 404 recovery, and legal compliance pages with zero client-side hydration delays. |
| **`.css`** | Vanilla Architectural Styling | `apps/web/assets/css/`, `docs/assets/css/` | **Zero-Dependency Design System:** Clean, high-contrast, WCAG AAA compliant styling adhering strictly to VC rules (zero drop shadows, zero harsh gradients, non-white `#F7F5F0` canvas). |
| **`.js`** | Client Simulators & Telemetry | `apps/web/assets/js/`, `docs/assets/js/` | **Interactive Engines & Telemetry:** Real mathematical IRT 3PL engines, Ol Chiki transliterators, and privacy-preserving zero-cookie telemetry loggers. |
| **`.yaml` / `.yml`** | Declarative Configs & CI/CD | `infrastructure/*`, `.github/*`, `docs/api/` | **Infrastructure as Code:** Docker Compose cluster configurations, GitHub Actions production workflows, and OpenAPI 3.0 API definitions. |
| **`.sh`** | Environment Automation | `scripts/*` | **Deterministic Toolchain Scripts:** Shell scripts automating environment setup, database seeding, and Android release APK signing. |
| **`.md`** | Engineering Documentation | `.ai/*`, `docs/*`, `*/README.md` | **Living Architecture Specifications:** Agent instructions, AI prompt templates, PRDs, and regional feasibility analyses. |

---

## 2. Directory Structure & Functional Capabilities

```
Janbhasha Platform Root
├── apps/               # Client Applications (Learner App, Teacher Web, Admin Web, Public Web)
├── services/           # Domain-Driven Microservices (API Gateway, IRT, Content, Speech, Sync, Translate)
├── packages/           # Shared Monorepo Libraries (Domain, Schemas, API Client, Shared, UI)
├── ai/                 # Machine Learning Subsystem (Language Packs, Models, Training, Prompts)
├── data/               # Static Data & Curriculum (Curriculum, Glossaries, Seed, Translation Memory)
├── docs/               # Public Web Portal & Technical Documentation (GitHub Pages Target)
├── infrastructure/     # DevOps & Containers (Docker, Database SQL, Prometheus Monitoring)
├── scripts/            # Shell Automation & Seeding (Setup, Android Builds)
├── tests/              # Automated Test Suites (Offline Sync Tests, Unit Tests)
└── .ai/                # Autonomous Multi-Agent Configuration (Agents, Rules, Skills)
```

---

### Layer 1: Client Applications (`apps/`)

Every application in `apps/` targets a specific stakeholder:

```
apps/
├── android/            # Native Android Mobile Learner App
│   ├── src/
│   │   ├── screens/    # Lesson player, Ol Chiki calligraphy drills, IRT adaptive quizzes
│   │   ├── types/      # Navigation parameter lists and screen props
│   │   └── App.tsx     # Offline-first state provider and navigation stack
│   └── README.md       # Mobile architecture documentation
│
├── teacher-web/        # Teacher Classroom Portal
│   ├── src/
│   │   ├── pages/      # Assignments, class dashboard, student roster, lesson creator
│   │   ├── stores/     # Zustand state store for teacher authentication and class filters
│   │   └── App.tsx     # Route declarations and role-based access guard
│   └── vite.config.ts  # Vite build configuration (Port 5173)
│
├── admin-web/          # District Governance Console
│   ├── src/
│   │   ├── pages/      # District literacy metrics, user approvals, content review
│   │   ├── stores/     # Administrative session and telemetry state
│   │   └── App.tsx     # Guarded routing for district education officers
│   └── vite.config.ts  # Vite build configuration (Port 5174)
│
└── web/                # VC-Grade Public Web Platform & Interactive Showcases
    ├── features/       # 6 Dedicated feature pages (Offline Sync, Translation, Speech, IRT, Worksheet, Telemetry)
    ├── assets/         # Pure Vanilla CSS design system and interactive JavaScript simulators
    ├── 404.html        # Custom diagnostic error recovery page
    ├── contact.html    # Field pilot intake form with complete inline validation error states
    ├── thank-you.html  # Submission receipt with reference tracking code
    ├── privacy.html    # Statutory DPDP Act 2023 child data protection policy
    ├── terms.html      # Institutional SLA and indigenous IP protection terms
    └── robots.txt      # Production search engine crawler rules & sitemap index
```

---

### Layer 2: Backend Microservices (`services/`)

Each microservice follows a uniform **3-tier architecture** (`controllers/`, `routes/`, `services/`):

```
services/
├── api/                # Port 3000: Central API Gateway
│   ├── src/controllers/# Auth, Lesson, and User HTTP request controllers
│   ├── src/routes/     # Protected route declarations with JWT middleware
│   ├── src/services/   # User password hashing, token creation, lesson querying
│   ├── src/middleware/ # Rate limiting, RBAC, and Zod request validation
│   └── prisma/         # Prisma ORM schema and migrations
│
├── assessment/         # Port 3004: Item Response Theory (IRT 3PL) Engine
│   ├── src/controllers/# AssessmentController (quiz retrieval and submission)
│   ├── src/routes/     # Assessment routes (/api/v1/assessments)
│   └── src/services/   # QuizService & AdaptiveService (3PL math & theta updating)
│
├── content/            # Port 3003: Curriculum & Worksheet Studio
│   ├── src/controllers/# ContentController (course listing and worksheet synthesis)
│   ├── src/routes/     # Content routes (/api/v1/content)
│   └── src/services/   # CurriculumService & WorksheetGenerator (dual-script PDF layout)
│
├── speech/             # Port 3002: Acoustic Recognition (ASR) & Synthesis (TTS)
│   ├── src/controllers/# SpeechController (transcription and synthesis endpoints)
│   ├── src/routes/     # Speech routes (/api/v1/speech)
│   └── src/services/   # TranscriptionService (Wav2Vec/Conformer) & SynthesisService
│
├── sync/               # Port 3005: Offline Delta Sync & Conflict Resolution
│   ├── src/controllers/# SyncController (batch ingestion and change-set queries)
│   ├── src/routes/     # Sync routes (/api/v1/sync)
│   └── src/services/   # SyncEngine & ConflictResolver (Lamport vector clocks & CRDT)
│
└── translation/        # Port 3001: Neural Translation & Script Transliteration
    ├── src/controllers/# TranslateController (text translation requests)
    ├── src/routes/     # Translation routes (/api/v1/translation)
    └── src/services/   # TranslatorService & TranslationMemory ($O(1)$ cache lookup)
```

---

### Layer 3: Shared Monorepo Packages (`packages/`)

```
packages/
├── domain/             # Core TypeScript Interfaces & Enums
│   └── src/models/     # Assessment, Language, Lesson, Progress, Sync, and User models
│
├── schemas/            # Runtime Zod Validation Schemas
│   └── src/            # assessment.schema, language.schema, lesson.schema, sync.schema, user.schema
│
├── api-client/         # Strongly-Typed HTTP SDK for Client Apps
│   ├── src/endpoints/  # auth, lessons, assessments, sync, translation endpoint callers
│   └── src/client.ts   # Unified ApiClient class with JWT bearer injection
│
├── shared/             # Universal Helpers & Constants
│   ├── src/constants/  # Supported languages (santhali, mundari, ho), user roles
│   └── src/utils/      # AES-256 encryption, Brotli compression, date and string sanitizers
│
└── ui/                 # Accessible WCAG 2.1 AA Component Library
    ├── src/components/ # Button/, Input/, Modal/, Navigation/, OfflineIndicator/
    ├── src/hooks/      # Theme hooks, responsive media query listeners, offline detector
    └── src/tokens.ts   # Shared design tokens (colors, font stacks, spacing)
```

---

### Layer 4: AI, Linguistic Resources & Prompts (`ai/`)

```
ai/
├── language-packs/     # Verified Linguistic Ground Truth
│   ├── santhali/       # grammar.json, phonetics.json, vocabulary.json (Ol Chiki)
│   ├── mundari/        # grammar.json, vocabulary.json (Mundari Bani / Devanagari)
│   └── ho/             # grammar.json, vocabulary.json (Warang Citi)
│
├── models/             # Model Architectures & Configurations
│   ├── speech/         # config.yaml (Conformer acoustic encoder parameters)
│   └── translation/    # config.yaml (Transformer sequence-to-sequence hyperparameters)
│
├── pipelines/          # PyTorch Training & Fine-Tuning Scripts
│   ├── speech/         # train_stt.py (Speech-to-Text), train_tts.py (Synthesis)
│   └── translation/    # train.py (IndicTrans fine-tuning), evaluate.py
│
├── evaluation/         # Benchmark Evaluation Scripts
│   ├── speech_eval.py  # Calculates Word Error Rate (WER) on dialect test sets
│   └── translation_eval.py # Measures BLEU and chrF++ scores on vernacular sentences
│
└── prompts/            # Context-Engineered LLM Prompts
    ├── assessment/     # System prompt for formulating IRT 3PL diagnostic questions
    ├── lesson-generation/ # Few-shot prompt for creating vernacular story lessons
    ├── translation/    # Prompt for translating complex idioms into tribal metaphors
    └── worksheet-generation/ # Prompt for dual-script printable worksheet structure
```

---

### Layer 5: Data & Pedagogical Content (`data/`)

```
data/
├── curriculum/         # Course syllabi structured by grade and competency outcomes
├── glossary/           # santhali-english.json, mundari-english.json, ho-english.json
├── seed/               # Initial database records for lessons.json, quizzes.json, users.json
├── translation-memory/ # High-confidence parallel sentence cache (santhali.json)
└── fixtures/           # Deterministic test fixtures for unit and integration testing
```

---

### Layer 6: Infrastructure & DevOps (`infrastructure/`)

```
infrastructure/
├── docker/             # Dockerfile.api, Dockerfile.translation, Dockerfile.web, docker-compose.yml
├── database/           # init.sql (PostgreSQL extensions, schemas, and initial roles)
└── monitoring/         # prometheus.yml (Metrics scraping configuration for all microservices)
```

---

## 3. End-to-End System Working & Data Flows

### Flow A: Offline Student Learning Session (Village Tablet)
1. **Local Initialization:** The Android tablet launches `apps/android/src/App.tsx`. The app checks `Room SQLite` for pre-cached lessons.
2. **Interactive Instruction:** The learner plays an Ol Chiki phonics exercise (`LessonPlayerScreen.tsx`).
3. **Pronunciation Drill:** The child speaks into the tablet microphone. The on-device `Conformer` model transcribes the speech in RAM, evaluates phonemic accuracy, renders immediate oral feedback, and **immediately purges raw audio buffers** (DPDP Act compliance).
4. **Adaptive Assessment:** The student answers quiz questions (`AssessmentScreen.tsx`). The local 3PL IRT calculation updates the child's estimated ability ($\theta$), queuing the next appropriate question.
5. **Local Ledger Commit:** Progress, score, and vector clock (`[NODE_RANCHI_08: 15]`) are committed to local SQLite WAL storage.
6. **Asynchronous Delta Sync:** When the tablet detects an intermittent 2G cellular tower, `services/sync` receives the Brotli-compressed batch (< 4.2 KB), merges records using CRDT logic, and updates master PostgreSQL partitions.

### Flow B: Rural Teacher Worksheet Generation
1. **Curriculum Selection:** The educator accesses `apps/teacher-web/` and selects Grade 2, Santhali, and Numeracy.
2. **Microservice Request:** A request is dispatched to `services/content/src/controllers/content.controller.ts`.
3. **Dual-Script Synthesis:** The service pairs Ol Chiki questions (`data/curriculum/`) with Devanagari/Hindi teacher instructions.
4. **Vector PDF Typesetting:** High-contrast monochrome vector PDF (< 180 KB) is rendered client-side.
5. **Print Execution:** The teacher transmits the PDF via Bluetooth to a low-power classroom USB printer, ensuring lessons continue even during 8-hour grid electricity outages.

### Flow C: District Administrative Telemetry
1. **Anonymized Aggregation:** Every 24 hours, `services/sync` aggregates school-level literacy gains without student PII.
2. **Noise Injection:** Mathematical $\epsilon$-differential privacy noise is applied to student scores.
3. **Dashboard Monitoring:** District Education Officers view cluster heatmaps in `apps/admin-web/src/pages/AnalyticsPage.tsx`, tracking script retention rates across Dumka, East Singhbhum, and Ranchi to allocate targeted educational resources.

---

## 4. Verification & Testing Standards

* **Offline Synchronization Tests:** `tests/offline/sync-conflict.test.ts` simulates concurrent multi-tablet ledger updates.
* **API Gateway Tests:** `tests/unit/api/` validates authentication tokens and Zod schemas.
* **Accessibility Audits:** `tests/unit/ui/` validates that all interactive UI elements meet WCAG 2.1 AA guidelines.
* **Public Web Live Status:** All 19 routes and assets on [https://avricks.github.io/Janbhasha/](https://avricks.github.io/Janbhasha/) are verified returning `HTTP/2 200 OK`.
