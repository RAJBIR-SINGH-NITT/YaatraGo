export type ApiMode = "mock" | "real";

export type TransportMode =
  | "walking"
  | "auto"
  | "bus"
  | "train"
  | "cab"
  | "bike"
  | "car"
  | "metro"
  | "other";

export type JourneyStatus = "scheduled" | "active" | "completed" | "arrival_pending" | "sos_active";

export interface JourneyTransfer {
  id: string;
  from: string;
  to: string;
  mode: TransportMode;
}

/** Frontend-only demo model. Replace with verified DTOs before real API wiring. */
export interface Journey {
  id: string;
  origin: string;
  destination: string;
  expectedArrivalAt: string;
  createdAt: string;
  originMode: TransportMode;
  destinationMode: TransportMode;
  transfers: JourneyTransfer[];
  status: JourneyStatus;
  distanceLabel?: string;
  durationLabel?: string;
  completedAt?: string;
  lastKnownLocation?: string;
  lastLocationAt?: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  notificationStatus: "unavailable" | "demo";
}

export interface ScheduledJourney {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  days: string[];
  enabled: boolean;
  mode: TransportMode;
}

export interface SosRecord {
  id: string;
  reason: SosReason;
  status: "active" | "resolved";
  createdAt: string;
  journeyId?: string;
}

export type SosReason = "harassment" | "unsafeTransport" | "accident" | "medical" | "following" | "other";

export interface JourneyDraft {
  origin: string;
  destination: string;
  expectedArrivalAt: string;
  originMode: TransportMode;
  destinationMode: TransportMode;
  transfers: JourneyTransfer[];
}

export interface ApiHealth {
  status: "online" | "offline" | "unknown";
  message: string;
}