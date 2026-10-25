# YaatraGo API Contract

**Status:** no backend source or executable API contract is available in this workspace. This document intentionally records unknowns instead of inventing a contract.

## Verified routes

There are no verified REST, WebSocket, SSE, file upload, or streaming routes.

| Method | Path | Service | Screen | Request | Response | Authentication | Evidence |
|---|---|---|---|---|---|---|---|
| - | - | - | - | - | - | - | No server source in workspace |

## Routes mentioned in project notes, but not verified

The following are **not implemented in `src/api/endpoints.ts`** and must not be called until source confirms them:

| Proposed capability | Unverified route note | Affected screen | What is unknown |
|---|---|---|---|
| Start workflow | `POST /api/v1/journeys/start` | Active Journey | Service boundary, schema, auth, status |
| Arrival report | `POST /api/v1/journeys/reached` | Arrival Confirmation | Schema and state semantics |
| Missed arrival | `POST /api/v1/journeys/missed-arrival` | Arrival Not Confirmed | Grace-period and notification behavior |
| Schedule workflow | `POST /api/v1/journeys/schedule` | Scheduled Journeys | CRUD and recurrence schema |
| SOS workflow | `POST /api/v1/safety/sos` | SOS | Accepted reason/location fields and response state |
| Location update | `POST /api/v1/safety/location-update` | Active Journey / SOS | Persistence, cadence, auth |
| Resolve SOS | `POST /api/v1/safety/sos-stop` | SOS | Resolution schema and notification state |
| Chatbot | `POST /api/v1/chatbot/message` | Safety Assistant | Prompt and answer schema, moderation, auth |
| Create journey | `POST /journeys` or prefixed version | New Journey | Context path, DTO schema, JWT |
| List journeys | `GET /journeys` or prefixed version | Home / History | Pagination and response envelope |
| Complete journey | `PATCH /journeys/{id}/complete` | Arrival Confirmation | Completion response and errors |
| Create check-in | `POST /journeys/{id}/check-ins` | Journey Details | Request schema |
| List check-ins | `GET /journeys/{id}/check-ins` | Journey Details | Response schema |

## Feature-to-endpoint matrix

| Screen or feature | Real API behavior | Demo behavior | Integration point |
|---|---|---|---|
| Login / registration | Disabled: no verified endpoint | Local demo sign-in and account creation | `src/app/AppProvider.tsx` |
| Journey creation | Disabled: no verified endpoint | Local demo journey creation | `src/app/AppProvider.tsx` |
| Journeys and history | Disabled: no verified endpoint | Demo data only | `src/mocks/demoData.ts` |
| Arrival confirmation | Disabled: no verified endpoint | Local demo state transition | `src/app/AppProvider.tsx` |
| SOS and resolution | Disabled: no verified endpoint | Local demo state transition, no notification | `src/app/AppProvider.tsx` |
| Contacts | Disabled: no verified endpoint | Local demo contact list | `src/mocks/demoData.ts` |
| Schedule | Disabled: no verified endpoint | Local demo schedule toggle | `src/app/AppProvider.tsx` |
| Safety Assistant | Disabled: no verified endpoint | Local safety guidance only | `src/pages/AppPages.tsx` |
| Connection test | No health route verified | Browser online status only | `src/api/client.ts` |

## Central client behavior

`src/api/client.ts` defines the only HTTP transport. It reads `VITE_API_BASE_URL`, supports abort signals and a timeout, retries idempotent `GET` requests only, normalizes errors, supports an optional bearer token, and handles empty/non-JSON bodies. It does not provide a default real API URL because none is verified.

When mock mode is disabled, requests fail closed with a typed `ApiError` explaining that no verified endpoint is configured. This prevents false successful SOS, journey, notification, and authentication claims.

## Required verification before implementing an endpoint adapter

For each endpoint, record the full path including context prefix, content type, exact request schema, exact response schema, required token field/header, success codes, validation errors, generic error envelope, and relevant controller/service source location. Add only then to `src/api/endpoints.ts`.