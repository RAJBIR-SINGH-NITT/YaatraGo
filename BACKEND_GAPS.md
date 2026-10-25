# YaatraGo Backend Gaps

This assessment is based on the available workspace. The backend source itself is absent, so every backend capability below is unverified.

| Area | UI needs | Backend currently available | Missing contract or capability | Minimal additive proposal | Temporary frontend behavior | Affected screen |
|---|---|---|---|---|---|---|
| Health and CORS | Test connection and LAN guidance | None inspectable | Health route, allowed origins and local-network CORS policy | Add unauthenticated `GET /actuator/health` or documented health route, and allow configured frontend origins | Browser online signal only | Settings |
| Auth | Login, registration, session expiry | None inspectable | Mappings, request DTOs, JWT/session response | Document controller mappings and response; return a non-secret expiry indicator | Demo-only authentication | Login, Register |
| Journey CRUD | Create, list, complete, details | None inspectable | Base prefix, DTOs, states, pagination | Expose typed journey endpoints and ownership checks | Demo data only | Home, Journey, History |
| Coordinates and routes | Persist origin/destination coordinates and estimates | None inspectable | Field names and date/time format | Verify six noted map fields or add optional typed properties | Demo route only | New Journey, Active Journey |
| Modes and transfers | Persist transport choices and optional transfer timeline | None inspectable | Segment schema | Add optional journey segments in a backward-compatible request field | Visual demo only | New Journey, Active Journey |
| Arrival and grace period | Accurate arrival confirmation and overdue workflow | None inspectable | Server-owned timer/state and grace interval | Add journey arrival state with scheduler-owned transitions and queryable status | Local demo prompt only | Arrival |
| SOS | Create/resolve emergency with honest status | None inspectable | Payload, idempotency and resolution semantics | Add explicitly idempotent SOS request key and status response | Demo-only request; no contact claim | SOS |
| Location updates | Store updates while SOS active | None inspectable | Schema, rate limit, retention and consent | Add a documented location update endpoint with retention policy | No real upload | Active SOS |
| Notifications | Report Telegram attempt/delivery state | None inspectable | Notification lifecycle in response | Return `accepted`, `sending`, `sent`, `deliveryConfirmed`, or `failed` only when evidenced | Never reports delivery | SOS, Activity |
| Contacts | CRUD and consent/verification | None inspectable | Contact schema and delivery consent | Add authenticated CRUD with verification metadata and consent timestamp | Demo-only list | People |
| Recurring journeys | CRUD and backend-owned execution | None inspectable | Recurrence DTOs, schedule state and jobs | Add schedule CRUD; scheduler should own execution | Demo-only toggle | Scheduled Journeys |
| Safety assistant | Safe question/answer schema | None inspectable | Request, response, safety/error behavior | Expose a moderated authenticated assistant endpoint | Local safety tips only | Safety Assistant |
| Profile/settings | Persist profile and preferences | None inspectable | Profile schema | Add profile/preferences endpoints | Browser-local preferences only | Settings |
| Realtime | Accurate live updates | None inspectable | WebSocket/SSE/polling contract | Expose server authenticated transport only if required | Explicitly not live | Active Journey, SOS |
| Device/data modules | User-facing surface for discovered modules | None inspectable | Source unavailable | Inspect source before deciding exposure | No device UI fabricated | N/A |

## Safe backend patch guidance

No backend files are in this workspace, so no backend patch can be supplied without inventing code or changing an unknown architecture. When the services are available, the smallest safe first addition is a CORS-reviewed health endpoint and an OpenAPI document. Do not add unauthenticated SOS, expose Telegram credentials, or move internal Python endpoints directly into the browser without reviewing the current service boundary.

## Frontend mock policy

`VITE_USE_MOCKS=true` is a labelled demonstration mode only. It uses local state with no external side effects. In this mode, an SOS display never contacts a person or external service. With `VITE_USE_MOCKS=false`, unverified functionality stays unavailable rather than pretending to work.