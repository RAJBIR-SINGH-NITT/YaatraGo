import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isMockMode } from "../api/client";
import type { Journey, JourneyDraft, ScheduledJourney, SosReason, SosRecord, TrustedContact } from "../api/types";
import { demoActiveJourney, demoContacts, demoHistory, demoSchedules } from "../mocks/demoData";

export type TextScale = "normal" | "large" | "extraLarge";

interface AppContextValue {
  isMock: boolean;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  language: "en" | "hi";
  textScale: TextScale;
  highContrast: boolean;
  voiceEnabled: boolean;
  serverAddress: string;
  activeJourney?: Journey;
  history: Journey[];
  contacts: TrustedContact[];
  schedules: ScheduledJourney[];
  sos?: SosRecord;
  loginDemo: () => void;
  logout: () => void;
  completeOnboarding: () => void;
  setLanguage: (language: "en" | "hi") => void;
  setTextScale: (scale: TextScale) => void;
  setHighContrast: (value: boolean) => void;
  setVoiceEnabled: (value: boolean) => void;
  setServerAddress: (value: string) => void;
  startJourney: (draft: JourneyDraft) => Journey;
  completeJourney: () => void;
  removeContact: (id: string) => void;
  toggleSchedule: (id: string) => void;
  triggerSos: (reason: SosReason) => void;
  resolveSos: () => void;
  clearLocalData: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const store = {
  onboarding: "yaatrago-onboarding-complete",
  language: "yaatrago-language",
  textScale: "yaatrago-text-scale",
  contrast: "yaatrago-high-contrast",
  voice: "yaatrago-voice-enabled",
  server: "yaatrago-server-address",
  demoSignedIn: "yaatrago-demo-signed-in",
};

function getStoredBoolean(key: string): boolean {
  return localStorage.getItem(key) === "true";
}

function readScale(): TextScale {
  const saved = localStorage.getItem(store.textScale);
  return saved === "large" || saved === "extraLarge" ? saved : "normal";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isMockMode && getStoredBoolean(store.demoSignedIn));
  const [onboardingComplete, setOnboardingComplete] = useState(() => getStoredBoolean(store.onboarding));
  const [language, setLanguageState] = useState<"en" | "hi">(() => (localStorage.getItem(store.language) === "hi" ? "hi" : "en"));
  const [textScale, setTextScaleState] = useState<TextScale>(readScale);
  const [highContrast, setHighContrastState] = useState(() => getStoredBoolean(store.contrast));
  const [voiceEnabled, setVoiceEnabledState] = useState(() => getStoredBoolean(store.voice));
  const [serverAddress, setServerAddressState] = useState(() => localStorage.getItem(store.server) ?? "");
  const [activeJourney, setActiveJourney] = useState<Journey | undefined>(() => (isMockMode ? demoActiveJourney : undefined));
  const [history, setHistory] = useState<Journey[]>(() => (isMockMode ? demoHistory : []));
  const [contacts, setContacts] = useState<TrustedContact[]>(() => (isMockMode ? demoContacts : []));
  const [schedules, setSchedules] = useState<ScheduledJourney[]>(() => (isMockMode ? demoSchedules : []));
  const [sos, setSos] = useState<SosRecord>();

  useEffect(() => {
    document.documentElement.dataset.textScale = textScale;
    document.documentElement.dataset.contrast = String(highContrast);
  }, [textScale, highContrast]);

  const value = useMemo<AppContextValue>(() => ({
    isMock: isMockMode,
    isAuthenticated,
    onboardingComplete,
    language,
    textScale,
    highContrast,
    voiceEnabled,
    serverAddress,
    activeJourney,
    history,
    contacts,
    schedules,
    sos,
    loginDemo: () => {
      if (!isMockMode) return;
      localStorage.setItem(store.demoSignedIn, "true");
      setIsAuthenticated(true);
    },
    logout: () => {
      localStorage.removeItem(store.demoSignedIn);
      setIsAuthenticated(false);
    },
    completeOnboarding: () => {
      localStorage.setItem(store.onboarding, "true");
      setOnboardingComplete(true);
    },
    setLanguage: (nextLanguage) => {
      localStorage.setItem(store.language, nextLanguage);
      setLanguageState(nextLanguage);
    },
    setTextScale: (scale) => {
      localStorage.setItem(store.textScale, scale);
      setTextScaleState(scale);
    },
    setHighContrast: (nextValue) => {
      localStorage.setItem(store.contrast, String(nextValue));
      setHighContrastState(nextValue);
    },
    setVoiceEnabled: (nextValue) => {
      localStorage.setItem(store.voice, String(nextValue));
      setVoiceEnabledState(nextValue);
    },
    setServerAddress: (nextAddress) => {
      localStorage.setItem(store.server, nextAddress);
      setServerAddressState(nextAddress);
    },
    startJourney: (draft) => {
      const journey: Journey = {
        id: `demo-journey-${Date.now()}`,
        origin: draft.origin,
        destination: draft.destination,
        expectedArrivalAt: new Date(draft.expectedArrivalAt).toISOString(),
        createdAt: new Date().toISOString(),
        originMode: draft.originMode,
        destinationMode: draft.destinationMode,
        transfers: draft.transfers,
        status: "active",
        distanceLabel: "Demo route",
        durationLabel: "Not calculated",
      };
      setActiveJourney(journey);
      return journey;
    },
    completeJourney: () => {
      setActiveJourney((journey) => {
        if (!journey) return journey;
        const completed = { ...journey, status: "completed" as const, completedAt: new Date().toISOString() };
        setHistory((current) => [completed, ...current]);
        return undefined;
      });
    },
    removeContact: (id) => setContacts((current) => current.filter((contact) => contact.id !== id)),
    toggleSchedule: (id) => setSchedules((current) => current.map((schedule) => (schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule))),
    triggerSos: (reason) => setSos({ id: `demo-sos-${Date.now()}`, reason, status: "active", createdAt: new Date().toISOString(), journeyId: activeJourney?.id }),
    resolveSos: () => setSos((current) => (current ? { ...current, status: "resolved" } : current)),
    clearLocalData: () => {
      Object.values(store).forEach((key) => localStorage.removeItem(key));
      window.location.assign("/onboarding");
    },
  }), [activeJourney, contacts, history, highContrast, isAuthenticated, language, onboardingComplete, schedules, serverAddress, sos, textScale, voiceEnabled]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}