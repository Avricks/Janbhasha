# Janbhasha System Architecture & Design

## 1. High-Level Architecture

```
+-------------------------------------------------------------+
|                      Client Layer                           |
|  [Android Learner App]   [Teacher Web]   [Admin Console]    |
+-------------------------------------------------------------+
                              |
                     HTTPS / JSON REST
                              v
+-------------------------------------------------------------+
|                     API Gateway (Node.js)                   |
|       - JWT Auth & RBAC Middleware                          |
|       - Request Rate Limiting & Zod Validation              |
+-------------------------------------------------------------+
       |               |               |              |
       v               v               v              v
+-------------+ +-------------+ +-------------+ +-------------+
| Translation | |   Speech    | |   Content   | |  Assessment |
|   Service   | |  (ASR/TTS)  | |  Curriculum | | (IRT Model) |
+-------------+ +-------------+ +-------------+ +-------------+
       \               /               \              /
        +--------------------------------------------+
                              v
                 [Sync Microservice Engine]
                              v
           +-------------------------------------+
           | Data Stores: PostgreSQL 15 + Redis  |
           +-------------------------------------+
```

## 2. Microservice Port Allocations
- API Gateway: `3000`
- Translation Service: `3001`
- Speech Processing Service: `3002`
- Content & Curriculum Service: `3003`
- Assessment & IRT Service: `3004`
- Offline Sync Engine: `3005`
- Teacher Web (Vite): `5173`
- Admin Web (Vite): `5174`
