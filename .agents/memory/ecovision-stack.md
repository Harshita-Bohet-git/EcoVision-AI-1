---
name: EcoVision AI stack decisions
description: Key architecture and configuration decisions for the EcoVision AI MERN project
---

## MongoDB connection (artifacts/api-server/src/lib/db.ts)
Read MONGODB_URI **inside** `connectDB()`, not at module scope. This avoids initialization-order bugs if db.ts is ever imported before dotenv runs in a test or alternate entrypoint.
**Why:** Code review flagged module-scope env read as fragile — dotenv must always load first.

## CORS (artifacts/api-server/src/app.ts)
Environment-driven: `true` (all origins) in development, allowlist-only in production via `ALLOWED_ORIGINS` env var (comma-separated).
**Why:** Permissive `cors()` with no config is not production-safe once auth/tokens are added.
**How to apply:** Set `ALLOWED_ORIGINS` secret before deploying to production.

## dotenv
Loaded via `import "dotenv/config"` at the top of `artifacts/api-server/src/index.ts`.

## Health endpoints
- `GET /api/health` → `{ "status": "Server Running" }` (user-facing)
- `GET /api/healthz` → `{ "status": "ok" }` (machine-oriented internal)
Both defined in `artifacts/api-server/src/routes/health.ts` and spec'd in `lib/api-spec/openapi.yaml`.

## Future APIs
Add route handlers under `artifacts/api-server/src/routes/`, Mongoose models under `artifacts/api-server/src/models/` (create folder when needed), always update OpenAPI spec first then run codegen.
