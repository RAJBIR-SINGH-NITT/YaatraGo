import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./app/AppProvider";
import { AppShell } from "./components/AppShell";
import { ActiveJourneyPage, ArrivalPage, AssistantPage, ContactsPage, HistoryPage, HomePage, JourneyDetailPage, NewJourneyPage, ScheduledJourneysPage, SettingsPage, SosPage } from "./pages/AppPages";
import { LoginPage, NotFoundPage, OnboardingPage, RegisterPage } from "./pages/PublicPages";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } });

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function EntryRoute() {
  const { onboardingComplete, isAuthenticated } = useApp();
  return <Navigate to={!onboardingComplete ? "/onboarding" : isAuthenticated ? "/home" : "/login"} replace />;
}

function ProtectedRoute() {
  const { onboardingComplete, isAuthenticated } = useApp();
  if (!onboardingComplete) return <Navigate to="/onboarding" replace />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function AppRoutes() {
  return <><ScrollToTop /><Routes><Route path="/" element={<EntryRoute />} /><Route path="/onboarding" element={<OnboardingPage />} /><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /><Route element={<ProtectedRoute />}><Route element={<AppShell />}><Route path="/home" element={<HomePage />} /><Route path="/journeys/new" element={<NewJourneyPage />} /><Route path="/journeys/active" element={<ActiveJourneyPage />} /><Route path="/journeys/:id" element={<JourneyDetailPage />} /><Route path="/arrival" element={<ArrivalPage />} /><Route path="/journeys/scheduled" element={<ScheduledJourneysPage />} /><Route path="/journeys/history" element={<HistoryPage />} /><Route path="/contacts" element={<ContactsPage />} /><Route path="/sos" element={<SosPage />} /><Route path="/safety-assistant" element={<AssistantPage />} /><Route path="/settings" element={<SettingsPage />} /></Route></Route><Route path="*" element={<NotFoundPage />} /></Routes></>;
}

export default function App() {
  return <QueryClientProvider client={queryClient}><BrowserRouter><AppProvider><AppRoutes /></AppProvider></BrowserRouter></QueryClientProvider>;
}