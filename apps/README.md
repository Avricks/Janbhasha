# Client Applications Layer (`apps/`)

This directory contains the user-facing client applications tailored for the diverse stakeholders in the Janbhasha vernacular education ecosystem: rural students, village teachers, district administrators, and external institutional partners.

---

## Directory & Capability Overview

```
apps/
├── android/        # Native Android mobile learner application (Offline-First, Ol Chiki UI)
├── teacher-web/    # Teacher classroom portal for lesson management and progress monitoring
├── admin-web/      # District administrative console for governance, content, and telemetry
└── web/            # VC-grade public architectural web platform and interactive feature showcases
```

---

### Detailed Capabilities

| Application | Primary User Base | Key File Types | Core Capabilities & Working Mechanism |
| :--- | :--- | :--- | :--- |
| **`apps/android/`** | Tribal Primary School Learners (Ages 5–12) | `.tsx`, `.ts`, `.json` | **Offline-First Vernacular Learning:** Runs natively on low-cost school tablets. Implements local SQLite lesson storage, native script rendering (Ol Chiki `U+1C50`), interactive IRT-adaptive quizzes, speech pronunciation drills, and background delta synchronization when near cellular signal. |
| **`apps/teacher-web/`** | Rural School Educators & Headmasters | `.tsx`, `.ts`, `.css`, `.json` | **Classroom Management & Authoring:** Single-Page Application (SPA) built with React 18 and Vite. Allows teachers to organize student cohorts, assign curriculum modules, view reading fluency scores, and download printable bilingual worksheets. |
| **`apps/admin-web/`** | District Education Officers (DEOs) & Linguists | `.tsx`, `.ts`, `.css`, `.json` | **Governance & Telemetry Dashboard:** Built with React 18 and Zustand. Monitors district literacy benchmarks across Dumka, East Singhbhum, and Ranchi, manages teacher accounts, and reviews vernacular vocabulary corpus additions. |
| **`apps/web/`** | State Governments, NGOs, Research Partners | `.html`, `.css`, `.js`, `.json`, `.svg` | **Public Architectural Platform & Showcases:** Multi-page web platform strictly adhering to VC engineering rules (zero pure white backgrounds, zero drop shadows, zero emojis, zero em dashes). Features 6 dedicated feature pages with real interactive engines, DPDP Act privacy policy, and institutional pilot request intake. |
