# Getting Started with Janbhasha

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Python >= 3.10 (for AI training scripts)
- Docker & Docker Compose (optional for containerized setup)

## Quick Local Setup

1. **Install Dependencies across workspaces:**
   ```bash
   npm install
   ```

2. **Build Shared Packages:**
   ```bash
   npm run build
   ```

3. **Start Core API Gateway:**
   ```bash
   cd services/api
   npm run dev
   ```

4. **Launch Teacher Web Portal:**
   ```bash
   cd apps/teacher-web
   npm run dev
   ```

5. **Launch Admin Web Console:**
   ```bash
   cd apps/admin-web
   npm run dev
   ```
