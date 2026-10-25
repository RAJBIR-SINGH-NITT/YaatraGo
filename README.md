<<<<<<< HEAD
# YaatraGo Frontend

YaatraGo is a mobile-first journey safety and emergency-assistance frontend. Its product promise is simple: plan a journey, keep it in view while travelling, and confirm that you reached safely.

## Feature-to-Endpoint-to-Screen Matrix

| Feature | Screen | Endpoint status | Current behavior |
|---|---|---|---|
| Onboarding and language | `/onboarding` | Browser-local only | English and Hindi selection, skippable walkthrough |
| Login and registration | `/login`, `/register` | No verified endpoint | Explicit local demo authentication only |
| Journey creation | `/journeys/new` | No verified endpoint | Accessible two-step demo journey creator |
| Active journey | `/journeys/active` | No verified endpoint | Demo route, current-page location permission, honest non-live status |
| Arrival confirmation | `/arrival` | No verified endpoint | Demo-only completion; no notification claim |
| SOS | `/sos` | No verified endpoint | Demo-only request, confirmation, active/resolved status; no external side effect |
| Trusted contacts | `/contacts` | No verified endpoint | Clearly marked demo-only contacts |
| Scheduled journeys | `/journeys/scheduled` | No verified endpoint | Demo schedule toggle, no recurrence execution |
| History | `/journeys/history` | No verified endpoint | Local demo history |
| Safety Assistant | `/safety-assistant` | No verified endpoint | Local safety guidance, not emergency dispatch |
| Settings and connection | `/settings` | No verified health route | Preferences and LAN/CORS instructions; no false health result |

Read `DISCOVERY.md`, `API_CONTRACT.md`, and `BACKEND_GAPS.md` before connecting any live service.

## Prerequisites

- Node.js 20 or later
- npm 10 or later
- A current backend contract before turning off mock mode

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open the URL printed by Vite. For another device on the same network, run:

```bash
npm run dev -- --host 0.0.0.0
```

Then open `http://<frontend-lan-ip>:5173` on the other device.

## Environment

```dotenv
VITE_API_BASE_URL=
VITE_USE_MOCKS=true
```

`VITE_USE_MOCKS=true` is the safe default because no backend exists in the supplied workspace. It makes the product usable as a clearly labelled local demonstration and never contacts a person, Telegram, or emergency service.

Set `VITE_USE_MOCKS=false` only after supplying a verified backend base URL and implementing confirmed endpoint adapters in `src/api/endpoints.ts`. In real mode, the HTTP client fails closed when no verified route exists; it never fabricates a successful login, journey, SOS, arrival, or notification.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Backend Start Instructions

No backend source, executable, compose file, requirements file, Gradle/Maven project, Spring configuration, or Python application was available to inspect. Backend start commands therefore cannot be determined safely.

When the backend source is available, start the documented Spring Boot gateway and any internal Python service according to their own configuration. Verify the external base URL, context path, authentication response, CORS origins, and health endpoint before setting `VITE_USE_MOCKS=false`.

## API Integration Architecture

- `src/api/client.ts` is the only HTTP transport. It reads `VITE_API_BASE_URL` (or the Settings local-development fallback when no environment URL is set), applies a timeout and abort signal, retries only `GET` requests, accepts an optional bearer token, handles empty/non-JSON responses, and normalizes errors.
- `src/api/endpoints.ts` intentionally exports no endpoint functions yet because none are source-verified.
- `src/api/types.ts` contains clearly marked frontend demo models, not claims about the backend DTOs.
- UI components do not contain API URLs or direct `fetch` calls.
- `src/app/AppProvider.tsx` holds ephemeral/local demonstration behavior. It must be replaced by typed server-state hooks after a real contract is available.

## CORS and Another Laptop

The frontend and backend may run on different devices only after the backend permits the frontend origin. Add the exact protocol, IP address, and port shown by Vite to the backend CORS allowlist. For example, a backend should explicitly allow `http://192.168.1.25:5173`, with the appropriate methods and `Authorization` header if bearer tokens are used. Do not use a wildcard CORS policy with credentialed sessions.

The Settings screen keeps the server address away from login and explains that a health check cannot be confirmed until a real health endpoint is verified.

## Authentication Behavior

The login form has only email and password. Registration has email, password, and confirm password, with local matching validation. No password, token, or location data is logged. In mock mode, a non-sensitive local demo sign-in flag is used. The app does not assume a token field, JWT shape, or authorization header for real mode.

## PWA and Offline

`public/manifest.webmanifest`, the original YaatraGo SVG icon, and `public/sw.js` provide an installable shell where browser support permits. The service worker caches only same-origin app-shell assets and skips `/api/` requests. Offline state is visible in the interface. Offline support does not imply SOS dispatch, GPS tracking, notifications, or server updates work offline.

The existing Vite configuration is deliberately preserved. A manual lightweight service worker is used instead of changing the configured Vite plugin chain.

## Accessibility

- Semantic landmarks, labelled form controls, keyboard-accessible dialog, and visible focus
- Minimum 48px touch-focused controls and a 56px primary action scale
- English and Hindi with `react-i18next`
- Text-size and high-contrast preferences
- Optional browser voice input and read-aloud with graceful unsupported states
- `prefers-reduced-motion` support
- Honest browser-location permission wording and no background-tracking promise

## Troubleshooting

| Problem | Check |
|---|---|
| The app says demo data | This is expected with `VITE_USE_MOCKS=true`. |
| Real mode cannot sign in | Expected until `VITE_API_BASE_URL` and verified endpoint adapters are supplied. |
| Another phone cannot open the app | Run Vite with `--host 0.0.0.0`, use the laptop LAN IP, and check the firewall. |
| Location is unavailable | Use HTTPS or localhost where required, grant browser permission, and keep the page open. |
| Backend request is blocked | Check the real backend's CORS policy and confirm the exact frontend origin. |

## Deployment Notes

Build with `npm run build` and deploy `dist/` behind HTTPS. Set `VITE_API_BASE_URL` during the production build. Do not put credentials, bot tokens, private API keys, or real user location history in the frontend build, public environment file, or service-worker cache.

## Verification Report

### Commands run

| Command | Result |
|---|---|
| `npm install` | Passed; npm reported two dependency audit findings in the starter dependency tree (one low, one high) |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed |

### Functional coverage

The demo flow was statically verified through the TypeScript build: onboarding, demo login/registration, journey creation, active journey, browser location permission path, arrival completion, SOS confirmation/resolution, contact removal confirmation, schedule toggle, local assistant, settings, language switching, text-scale/high-contrast preferences, and the manual PWA registration code.

No backend functional calls could be executed because no backend or verified route contract was present. No browser automation package or browser binary was supplied in the workspace, so automated 360px, 390px, 430px, tablet, and desktop visual checks were not run. These remain unverified and should be run once a browser test runner is available.

### Known backend gaps

See `BACKEND_GAPS.md` for the complete list. The blockers are authentication, health/CORS contract, journey CRUD, contact consent CRUD, arrival/grace-period state, SOS/status/location persistence, notification outcomes, schedule CRUD/execution, assistant schema, profile persistence, and any real-time/device capabilities.
=======
# YaatraGo
>>>>>>> 9c95628495f90f3c404bd3dac5a1ec5b7a181d00
