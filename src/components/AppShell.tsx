import { Bell, CircleHelp, Home, Map, Menu, Settings, ShieldAlert, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../app/AppProvider";
import { BrandMark, StatusBadge } from "./ui";
import { cn } from "../utils/cn";

const navItems = [
  { to: "/home", label: "nav.home", icon: Home },
  { to: "/journeys/active", label: "nav.journey", icon: Map },
  { to: "/journeys/history", label: "nav.activity", icon: Bell },
  { to: "/contacts", label: "nav.people", icon: Users },
  { to: "/settings", label: "nav.more", icon: Menu },
];

export function ConnectivityIndicator() {
  const { t } = useTranslation();
  const { isMock } = useApp();
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  if (!online) return <StatusBadge tone="danger">{t("app.offline")}</StatusBadge>;
  return <StatusBadge tone={isMock ? "info" : "warning"}>{isMock ? t("app.demo") : t("app.unavailable")}</StatusBadge>;
}

export function PageHeader({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: ReactNode }) {
  return <header className="mb-7 motion-safe:animate-[fadeUp_260ms_ease-out]"><div className="flex items-start justify-between gap-3">{eyebrow ? <p className="mb-2 text-sm font-bold tracking-wide text-green-800">{eyebrow}</p> : null}{action}</div><h1 className="text-[clamp(1.65rem,6vw,2.1rem)] font-bold leading-tight tracking-tight text-[#10231A]">{title}</h1>{text ? <p className="mt-2 max-w-xl text-[#4B5F54]">{text}</p> : null}</header>;
}

export function AppShell() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-[#F2FAF4] pb-28">
      <header className="sticky top-0 z-30 border-b border-[#D5E8DA] bg-white/95 shadow-[0_3px_14px_rgba(21,128,61,0.06)] backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/home" className="flex items-center gap-2 rounded-lg text-[#10231A] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700"><BrandMark /><span className="text-lg font-bold tracking-tight">{t("app.name")}</span></Link>
          <ConnectivityIndicator />
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6"><Outlet /></main>
      <Link to="/sos" className="fixed bottom-24 right-4 z-20 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#B91C1C] px-5 font-bold text-white shadow-[0_10px_24px_rgba(185,28,28,.28)] transition hover:bg-red-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C] motion-safe:animate-[sosPulse_2.8s_ease-in-out_infinite]" aria-label={t("actions.sos")}><ShieldAlert className="h-5 w-5" />{t("actions.sos")}</Link>
      <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-[#D5E8DA] bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto grid max-w-3xl grid-cols-5 px-1">
          {navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => cn("flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 text-xs font-semibold focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-green-700", isActive || (to === "/journeys/active" && pathname.startsWith("/journeys/new")) ? "text-green-800" : "text-[#62756A]")}><Icon className="h-5 w-5" /><span>{t(label)}</span></NavLink>)}
        </div>
      </nav>
    </div>
  );
}

export function MoreLinks() {
  const { t } = useTranslation();
  return <div className="divide-y divide-[#D5E8DA] border-y border-[#D5E8DA]"><Link to="/safety-assistant" className="flex min-h-16 items-center justify-between gap-3 py-3 text-left font-semibold text-[#10231A]"><span className="inline-flex items-center gap-3"><CircleHelp className="h-5 w-5 text-green-800" />{t("home.assistant")}</span><span aria-hidden="true">›</span></Link><Link to="/settings" className="flex min-h-16 items-center justify-between gap-3 py-3 text-left font-semibold text-[#10231A]"><span className="inline-flex items-center gap-3"><Settings className="h-5 w-5 text-green-800" />{t("settings.title")}</span><span aria-hidden="true">›</span></Link></div>;
}