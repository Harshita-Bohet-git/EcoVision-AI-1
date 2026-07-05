# EcoVision AI

AI-powered Waste Detection and Disposal Assistant — MERN stack project with a React Vite frontend and Express + MongoDB backend.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port configured via workflow)
- `pnpm --filter @workspace/client run dev` — run the React frontend (port configured via workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- **Frontend**: React 19, Vite 7, TailwindCSS 4, Framer Motion, wouter (routing), TanStack React Query
- **Backend**: Node.js 24, Express 5, Mongoose (MongoDB ODM), dotenv, pino (logging)
- **Shared**: pnpm workspaces, TypeScript 5.9, OpenAPI-first contract (`lib/api-spec/openapi.yaml`), Orval codegen

## Project Structure

```
artifacts/
  client/          ← React Vite frontend (EcoVision AI UI)
  api-server/      ← Express backend (MongoDB, health routes, future AI APIs)
lib/
  api-spec/        ← OpenAPI spec (source of truth)
  api-client-react/← Generated React Query hooks
  api-zod/         ← Generated Zod validation schemas
  db/              ← Drizzle ORM (Postgres, if used later)
```

## API Endpoints

- `GET /api/health` — returns `{ "status": "Server Running" }`
- `GET /api/healthz` — internal health check, returns `{ "status": "ok" }`

## Environment Variables / Secrets

| Key | Type | Required | Purpose |
|-----|------|----------|---------|
| `MONGODB_URI` | Secret | For DB features | MongoDB Atlas connection string |
| `NODE_ENV` | Env var | No | `development` or `production` |

Add `MONGODB_URI` via Replit Secrets (not in .env). See `.env.example` for format.

## Architecture Decisions

- OpenAPI-first: all API contracts live in `lib/api-spec/openapi.yaml` and drive codegen. Never hand-write what orval generates.
- MongoDB connection is gracefully skipped if `MONGODB_URI` is not set (server still starts and health check works).
- `dotenv/config` is loaded at the top of `artifacts/api-server/src/index.ts` for local `.env` support.
- CORS is enabled globally on the Express app.
- Pino logger used throughout the server — never `console.log`.

## Adding Future APIs

1. Add the endpoint to `lib/api-spec/openapi.yaml`
2. Run `pnpm --filter @workspace/api-spec run codegen`
3. Add the route handler in `artifacts/api-server/src/routes/`
4. Register the router in `artifacts/api-server/src/routes/index.ts`
5. Add Mongoose models in `artifacts/api-server/src/models/` (new folder, create as needed)

## User Preferences

- No authentication or AI features in this build
- Clean folder architecture — keep client and server concerns separated
- MongoDB preferred over Postgres for future feature work

## Gotchas

- Always run codegen after editing `openapi.yaml` before using new hooks in the frontend
- The server skips MongoDB gracefully if `MONGODB_URI` is absent — but AI/data features will not work without it
- Use `req.log` for logging inside Express route handlers (not `console.log`)
