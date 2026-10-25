# YaatraGo Discovery Report

**Discovery date:** 2026-03-31  
**Scope inspected:** the complete available workspace, including all files to a depth of four directories and the project configuration.

## Verified project structure

```text
.
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    └── utils/cn.ts
```

The workspace contains a Vite React TypeScript starter only. There are no sibling directories, service modules, server files, backend configuration files, `.env.example` files, OpenAPI specifications, controller classes, Python applications, database entities, migrations, schedulers, integration modules, device modules, or test fixtures.

## Service boundaries and framework

| Area | Verified finding | Evidence |
|---|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 | `package.json`, `src/main.tsx`, `vite.config.ts`, `src/index.css` |
| Spring Boot API | Not present in available workspace | Complete workspace file scan |
| Python feature service | Not present in available workspace | Complete workspace file scan |
| Telegram service | Not present in available workspace | Complete workspace file scan |
| AI chatbot | Not present in available workspace | Complete workspace file scan |
| WebSocket/SSE/polling transport | Not present in available workspace | Complete workspace file scan |
| PWA configuration | Not present initially | `vite.config.ts`, `public/` absent initially |

## Configuration and deployment

The existing Vite configuration has React, Tailwind, a source alias, and `vite-plugin-singlefile`. It does not define an API proxy, development host, service URL, PWA plugin, or environment variable contract. No backend host, port, context path, CORS policy, or authentication configuration can be verified.

## Authentication

No authentication controller, token issuer, security configuration, session configuration, login request, registration request, or response type exists in the available source. Token field names, authorization header behavior, expiry semantics, and public route mappings are all unknown.

## HTTP route inventory

**Verified HTTP routes: none.**

The routes in the supplied product brief are historical notes only. They cannot be called by the frontend until their implementing source or a current OpenAPI contract is available. No direct browser calls to a Python service are implemented.

## Features available to the frontend

| Feature | Current status | Frontend behavior |
|---|---|---|
| Onboarding and local accessibility preferences | Available locally | Implemented in browser only |
| Journey, arrival, SOS, contacts, schedule, history, chat | No verified backend contract | Clearly labelled demo mode only; unavailable in real mode |
| Map/geocoding/routing | No provider or backend implementation | Demo route preview only; no fabricated GPS or route data in real mode |
| Notifications and Telegram delivery | No implementation | Never claimed as delivered |
| Location tracking | No persistence endpoint or realtime channel | Permission-aware browser location display only when explicitly requested; no background tracking claim |

## Inferences and limits

The starter application was likely created separately from the backend described in the prompt. This is an inference, not a verified architectural fact. The implementation therefore uses an explicit adapter boundary and `VITE_USE_MOCKS=true` for a safe, disconnected product demonstration. When `VITE_USE_MOCKS=false`, the application does not guess routes or return fabricated successes.

## Next integration input needed

To convert demo features to real integrations, provide the Spring Boot and Python source trees or a current API specification with authentication, request/response schemas, base paths, and CORS policy. The additions can then be made in `src/api/endpoints.ts` without changing screens.