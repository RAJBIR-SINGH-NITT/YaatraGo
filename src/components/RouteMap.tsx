import { MapPin, Navigation, RadioTower } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Journey } from "../api/types";

export function RouteMap({ journey, compact = false }: { journey?: Journey; compact?: boolean }) {
  const { t } = useTranslation();
  return (
    <section aria-label={t("journey.routePreview")} className={`relative overflow-hidden rounded-3xl border border-[#CDE5D3] bg-[#E5F5E8] ${compact ? "h-36" : "h-60"}`}>
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(90deg, rgba(21,128,61,.08) 1px, transparent 1px), linear-gradient(rgba(21,128,61,.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" preserveAspectRatio="none" aria-hidden="true">
        <path d="M34 190 C88 165 100 120 170 132 S267 70 362 52" fill="none" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10" className="motion-safe:animate-[dash_1.2s_linear_infinite]" />
        <circle cx="34" cy="190" r="10" fill="#15803D" stroke="white" strokeWidth="5" />
        <circle cx="362" cy="52" r="10" fill="#B91C1C" stroke="white" strokeWidth="5" />
      </svg>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#23412C]"><RadioTower className="h-4 w-4 text-[#0369A1]" />{t("common.demoLabel")}</div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="max-w-[65%] rounded-2xl bg-white px-3 py-2 shadow-sm"><p className="truncate text-sm font-semibold text-[#10231A]">{journey?.origin ?? t("journey.from")}</p><p className="truncate text-xs text-[#4B5F54]">{journey?.destination ?? t("journey.to")}</p></div>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-green-800 shadow-sm"><Navigation className="h-5 w-5" /></div>
      </div>
      <span className="sr-only"><MapPin />{t("journey.routeDemo")}</span>
    </section>
  );
}