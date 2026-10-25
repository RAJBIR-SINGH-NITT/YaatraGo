# YaatraGo Design System

The official Wise, Airbnb, and Uber reference analyses are retained in `design-refs/`. They informed clarity, readable space, and mobility-oriented action hierarchy only; no branded assets, layouts, or fonts are copied.

## 1. Visual Theme & Atmosphere

YaatraGo is a calm travel-safety companion: light, grounded, quiet, and direct. A soft green canvas frames white working surfaces. The original YaatraGo route-and-shield mark is a strong, repeatable signal. Emergency actions use red only when the user explicitly opens or enters the SOS flow.

## 2. Color Palette & Roles

| Role | Value | Use |
|---|---|---|
| Page background | `#F2FAF4` | Main canvas |
| Surface | `#FFFFFF` | Forms, sheets, focused content |
| Primary | `#15803D` | Primary actions and active state |
| Primary pressed | `#166534` | Active button state |
| Soft green | `#DCFCE7` | Success and quiet highlights |
| Ink | `#10231A` | Primary text |
| Muted | `#4B5F54` | Supporting text |
| Border | `#D5E8DA` | Boundaries and dividers |
| Highlight | `#F59E0B` | Pending attention |
| SOS | `#B91C1C` | Explicit emergency actions |
| Information | `#0369A1` | Connection and information state |

## 3. Typography Rules

Use the system sans stack for performance and familiarity. Body copy is 18px with a 1.5 line-height. Screen titles use 26-32px, semibold or bold. Labels are 14-16px, medium weight. Do not use all caps for sentences. Important actions use descriptive verbs and remain at least 16px.

## 4. Component Stylings

Buttons are 52-56px high, have a 14-16px radius, and carry both an icon and text only when the icon aids understanding. Inputs are white, bordered, 56px minimum, and include persistent labels. Status indicators use an icon and text, not color alone. Sheets have a strong top edge, clear title, and a deliberate close action.

## 5. Layout Principles

Mobile starts with 16px gutters and 24px section rhythm. Each screen has one primary job and one primary action. The sticky top bar shows identity and connection state. Bottom navigation has exactly five labelled destinations. Content is structured with dividers and section spacing, not repeated decorative cards.

## 6. Depth & Elevation

Most surfaces are flat. A low, green-tinted shadow is reserved for the sticky header, bottom sheet, and floating SOS action. Borders clarify form and active elements. Do not use glass effects, neon gradients, or unnecessary shadows.

## 7. Do's and Don'ts

Do use calm, plain language, clear confirmation, persistent visible focus, and honest connection status. Do distinguish a missed arrival from confirmed danger. Do explain when data is demo-only or unavailable.

Do not imply tracking, notification delivery, emergency dispatch, or location sharing without backend evidence. Do not use emoji as the main icon system. Do not fill the interface with stat tiles, badges, or decorative gradients.

## 8. Responsive Behavior

Target 360px, 390px, and 430px first. The app uses a centered desktop content column but keeps the same flows. Bottom navigation stays reachable on touch devices. Forms never require a hover action. Tablet/desktop increase the content width and use side-by-side detail panels only when space permits.

## 9. Agent Prompt Guide

When extending YaatraGo, preserve a mobile-first, safety-sensitive interface with one clear primary action per screen. Use the palette above, semantic HTML, 48px minimum touch targets, keyboard focus, and reduced-motion support. Integrate only documented API contracts through `src/api/`; do not hard-code service URLs or fabricate state. Keep emergency language factual and quiet.