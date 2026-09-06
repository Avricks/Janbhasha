# Janbhasha (ᱡᱚᱱᱵᱷᱟᱥᱟ)

> **AI-Powered Vernacular Pedagogy and Literacy Acceleration Platform for Indigenous Languages**  
> Tailored for Santhali (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ), Mundari (Devanagari / Bani), and Ho (Warang Citi 𑢹𑣉) primary education.

[![Live Web Platform](https://img.shields.io/badge/Live_Portal-GitHub_Pages-1E3A2F?style=for-the-badge&logo=github)](https://avricks.github.io/Janbhasha/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-7A4B27?style=for-the-badge)](https://avricks.github.io/Janbhasha/)
[![Architecture Guide](https://img.shields.io/badge/Capability_Guide-CAPABILITY__MAP-blue?style=for-the-badge)](CAPABILITY_AND_FILE_STRUCTURE.md)

---

## 🌐 Live Platform & Interactive Demonstrations

* **Public Web Platform:** [https://avricks.github.io/Janbhasha/](https://avricks.github.io/Janbhasha/)
* **Offline Delta Sync Engine:** [Launch Simulator](https://avricks.github.io/Janbhasha/features/offline-sync.html)
* **Vernacular Translation Engine:** [Launch Transliterator](https://avricks.github.io/Janbhasha/features/vernacular-translation.html)
* **Speech Recognition AI:** [Launch Speech Synthesizer](https://avricks.github.io/Janbhasha/features/speech-processing.html)
* **Adaptive Pedagogy (IRT 3PL):** [Launch IRT Calculator](https://avricks.github.io/Janbhasha/features/adaptive-pedagogy.html)
* **Educator Studio & Worksheets:** [Launch Worksheet Studio](https://avricks.github.io/Janbhasha/features/worksheet-generator.html)
* **Administrative Telemetry:** [Launch Telemetry Console](https://avricks.github.io/Janbhasha/features/administrative-telemetry.html)

---

## 📂 Monorepo Architecture & Capability Map

The Janbhasha repository is organized as a modular, domain-driven monorepo where every folder and file type encapsulates a clear operational capability. For an in-depth reference, see [CAPABILITY_AND_FILE_STRUCTURE.md](CAPABILITY_AND_FILE_STRUCTURE.md).

```
.
├── apps/               # Client Applications (Learner App, Teacher Web, Admin Web, Public Web)
├── services/           # Domain-Driven Microservices (API Gateway, IRT, Content, Speech, Sync, Translate)
├── packages/           # Shared Monorepo Packages (Domain, Schemas, API Client, Shared, UI)
├── ai/                 # Machine Learning Subsystem (Language Packs, Models, Training, Prompts)
├── data/               # Static Data & Curriculum (Curriculum, Glossaries, Seed, Translation Memory)
├── docs/               # Public Web Portal & Technical Documentation (GitHub Pages Target)
├── infrastructure/     # DevOps & Containers (Docker, Database SQL, Prometheus Monitoring)
├── scripts/            # Shell Automation & Seeding (Setup, Android Builds)
├── tests/              # Automated Test Suites (Offline Sync Tests, Unit Tests)
└── .ai/                # Autonomous Multi-Agent System (Agents, Rules, Skills)
```

---

## 🛠️ File Types & Their Capabilities

| File Extension | Functional Purpose | Where Used | Capability & Why This File Type Was Chosen |
| :--- | :--- | :--- | :--- |
| **`.ts`** | Strongly-Typed Logic | `services/*`, `packages/*` | **Business Logic & Protocols:** Microservices, controllers, algorithms, and Zod schemas. Guarantees compile-time safety and prevents runtime type errors across services. |
| **`.tsx`** | Reactive Visual UI | `apps/android/`, `apps/*-web/`, `packages/ui/` | **Accessible Interfaces:** React and React Native user interfaces for tribal learners, school teachers, and district administrators with WCAG 2.1 AA compliance. |
| **`.py`** | Machine Learning & NLP | `ai/pipelines/`, `ai/evaluation/` | **Deep Learning & Evaluation:** PyTorch and Hugging Face training pipelines for Conformer speech encoders (ASR/TTS) and neural machine translation (NMT). |
| **`.json`** | Dictionaries & Schemas | `ai/language-packs/`, `data/*` | **Linguistic Dictionaries & Seed Data:** Austroasiatic language packs (Santhali, Mundari, Ho), translation memory pairs, and seed curriculum packages. Fast $O(1)$ dictionary parsing without database overhead. |
| **`.prisma`** | Relational ORM Mapping | `services/api/prisma/` | **Type-Safe Database Schema:** Defines PostgreSQL models (Users, Classes, Lessons, SyncLedger) and generates migration queries automatically. |
| **`.sql`** | Database Initialization | `infrastructure/database/` | **Raw Engine Bootstrap:** PostgreSQL initial scripts enabling required extensions (`uuid-ossp`, `pg_trgm`) and database roles. |
| **`.html` & `.css`** | Semantic Architecture | `apps/web/`, `docs/` | **VC-Grade Web Platform:** Dedicated feature pages, custom 404 recovery, and legal compliance pages with zero client-side hydration delays. |
| **`.js`** | Client Simulators | `apps/web/assets/js/`, `docs/assets/js/` | **Interactive Engines & Telemetry:** Real mathematical IRT 3PL engines, Ol Chiki transliterators, and privacy-preserving zero-cookie telemetry loggers. |
| **`.yaml` / `.yml`** | Declarative Configs | `infrastructure/*`, `.github/*` | **Infrastructure as Code:** Docker Compose cluster configurations, GitHub Actions production workflows, and OpenAPI 3.0 API definitions. |
| **`.sh`** | Toolchain Automation | `scripts/*` | **Deterministic Scripts:** Shell scripts automating environment setup, database seeding, and Android release APK signing. |

---

## ⚡ Quick Start

### 1. Environment Configuration
```bash
# Copy template and review environment settings
cp .env.example .env

# Generate secure authentication secrets
export JWT_SECRET=$(openssl rand -hex 32)
export REFRESH_TOKEN_SECRET=$(openssl rand -hex 32)
```

### 2. Install Monorepo Dependencies
```bash
npm install
```

### 3. Launch Local Development Services
```bash
# Start Docker backend dependencies (Postgres + Redis)
docker compose -f infrastructure/docker/docker-compose.yml up -d postgres redis

# Run microservices in development mode
npm run dev
```

---

## 📚 Key Technical Documentation
* [CAPABILITY_AND_FILE_STRUCTURE.md](CAPABILITY_AND_FILE_STRUCTURE.md) - Exhaustive folder-by-folder and file-by-file capability guide.
* [NEW_FEATURES_AND_REGIONAL_IMPACT.md](docs/NEW_FEATURES_AND_REGIONAL_IMPACT.md) - Feasibility study and regional impact for Jharkhand tribal communities.
* [PRD.md](docs/requirements/PRD.md) - Product requirements document and target learner profiles.
* [system-design.md](docs/architecture/system-design.md) - Distributed systems architecture and microservice specifications.
