import type { Journey, ScheduledJourney, TrustedContact } from "../api/types";

const inHours = (hours: number) => new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
const beforeHours = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export const demoActiveJourney: Journey = {
  id: "demo-active-journey",
  origin: "Kashmere Gate Metro",
  destination: "North Campus",
  expectedArrivalAt: inHours(1),
  createdAt: beforeHours(1),
  originMode: "metro",
  destinationMode: "walking",
  transfers: [],
  status: "active",
  distanceLabel: "5.2 km",
  durationLabel: "28 min",
  lastKnownLocation: "Near Civil Lines",
  lastLocationAt: beforeHours(0.1),
};

export const demoHistory: Journey[] = [
  {
    id: "demo-completed-journey",
    origin: "Lajpat Nagar",
    destination: "New Delhi Railway Station",
    expectedArrivalAt: beforeHours(28),
    createdAt: beforeHours(30),
    completedAt: beforeHours(27),
    originMode: "auto",
    destinationMode: "train",
    transfers: [],
    status: "completed",
    distanceLabel: "12 km",
    durationLabel: "42 min",
  },
];

export const demoContacts: TrustedContact[] = [
  { id: "contact-1", name: "Aarav", relationship: "Brother", phone: "+91 98XXXXXX42", notificationStatus: "demo" },
  { id: "contact-2", name: "Meera", relationship: "Friend", phone: "+91 97XXXXXX61", notificationStatus: "demo" },
];

export const demoSchedules: ScheduledJourney[] = [
  {
    id: "schedule-1",
    origin: "Home",
    destination: "College",
    departureTime: "08:10",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    mode: "metro",
  },
];