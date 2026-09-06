# Operational & Automation Scripts (`scripts/`)

This directory contains executable automation scripts for development environment setup, database seeding, Android APK compilation, and deployment pipelines.

---

## Directory & Capability Breakdown

```
scripts/
├── setup/      # Environment initialization and database seeding scripts (.sh, .ts)
└── android/    # Native mobile application build and release scripts (.sh)
```

---

### Detailed Capabilities

| Script File | File Type | Capability & Responsibilities | How It Works |
| :--- | :--- | :--- | :--- |
| **`scripts/setup/init.sh`** | `.sh` | **Automated Environment Provisioning:** Verifies prerequisite runtimes (Node.js, Docker, Python), creates local `.env` files, and installs dependencies. | Checks system binaries, generates random JWT secrets, and runs initial database migrations with a single command. |
| **`scripts/setup/seed-db.ts`** | `.ts` | **Database Seed Runner:** Parses JSON seed files from `data/seed/` and inserts foundational users, lessons, and language codes into PostgreSQL. | Uses Prisma Client to execute idempotent batch insert transactions, setting up a working development sandbox. |
| **`scripts/android/build-release.sh`** | `.sh` | **Android Release Compilation:** Automates Gradle release builds, bundles offline language packs, and signs APKs for school tablet deployment. | Invokes the Android SDK toolchain to generate optimized `.apk` bundles ready for distribution via USB or local village networks. |
