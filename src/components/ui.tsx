import { useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { Check, ChevronDown, LoaderCircle, Mic, Volume2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={cn("h-9 w-9", className)} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 4.5 36 10v10.3c0 9.1-5.9 16.9-14 19.2-8.1-2.3-14-10.1-14-19.2V10l14-5.5Z" fill="#15803D" />
      <path d="M13.5 24c3.7-6.4 7.5-9.6 11.4-9.6 3.6 0 5.6 2.1 5.6 5.1 0 4.7-4.8 7.1-10.8 9.8" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="13" cy="25" r="2.2" fill="#F59E0B" />
      <circle cx="30.8" cy="20" r="2.2" fill="white" />
    </svg>
  );
}

export function Button({ className, variant = "primary", loading, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "quiet"; loading?: boolean }) {
  const styles = {
    primary: "bg-green-700 text-white hover:bg-green-800 focus-visible:outline-green-700",
    secondary: "border border-[#bcd8c4] bg-white text-[#10231A] hover:bg-green-50 focus-visible:outline-green-700",
    danger: "bg-[#B91C1C] text-white hover:bg-red-800 focus-visible:outline-[#B91C1C]",
    quiet: "text-green-800 hover:bg-green-100 focus-visible:outline-green-700",
  };
  return (
    <button className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-base font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60", styles[variant], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export function IconButton({ label, children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className={cn("grid h-12 w-12 place-items-center rounded-full text-[#10231A] transition-colors hover:bg-green-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700", className)} {...props}>{children}</button>;
}

export function Input({ label, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = props.id ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="block text-sm font-semibold text-[#243B2C]">{label}</span>
      <input id={id} className={cn("min-h-14 w-full rounded-2xl border border-[#BFD8C6] bg-white px-4 text-lg text-[#10231A] shadow-sm outline-none transition focus:border-green-700 focus:ring-3 focus:ring-green-100", error && "border-red-700", className)} {...props} />
      {error ? <span className="block text-sm font-medium text-red-800" role="alert">{error}</span> : null}
    </label>
  );
}

export function Select({ label, children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  const id = props.id ?? `select-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="block text-sm font-semibold text-[#243B2C]">{label}</span>
      <span className="relative block">
        <select id={id} className={cn("min-h-14 w-full appearance-none rounded-2xl border border-[#BFD8C6] bg-white px-4 pr-10 text-lg text-[#10231A] shadow-sm outline-none transition focus:border-green-700 focus:ring-3 focus:ring-green-100", className)} {...props}>{children}</select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B5F54]" aria-hidden="true" />
      </span>
    </label>
  );
}

export function StatusBadge({ tone = "neutral", children }: { tone?: "success" | "warning" | "danger" | "info" | "neutral"; children: ReactNode }) {
  const tones = {
    success: "bg-green-100 text-green-900",
    warning: "bg-amber-100 text-amber-900",
    danger: "bg-red-100 text-red-900",
    info: "bg-sky-100 text-sky-900",
    neutral: "bg-[#EAF3EC] text-[#385044]",
  };
  return <span className={cn("inline-flex min-h-7 items-center gap-1.5 rounded-full px-3 text-sm font-semibold", tones[tone])}><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />{children}</span>;
}

export function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (checked: boolean) => void; label: string; description?: string }) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-2">
      <span><span className="block font-semibold text-[#10231A]">{label}</span>{description ? <span className="mt-1 block text-sm text-[#4B5F54]">{description}</span> : null}</span>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="relative h-8 w-14 shrink-0 rounded-full bg-[#B5C7BB] transition peer-checked:bg-green-700 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-700"><span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition peer-checked:translate-x-6" /></span>
    </label>
  );
}

export function Sheet({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-[#10231A]/35 p-0 sm:items-center sm:justify-center sm:p-6" role="presentation" onMouseDown={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabIndex={-1} className="w-full max-w-lg rounded-t-[28px] bg-white p-5 shadow-2xl outline-none motion-safe:animate-[rise_180ms_ease-out] sm:rounded-[28px]" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="sheet-title" className="text-xl font-bold text-[#10231A]">{title}</h2>
          <IconButton label="Close" onClick={onClose}><X className="h-5 w-5" /></IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
  return <section className="border-y border-[#D5E8DA] py-8 text-center"><div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-800">{icon}</div><h2 className="text-xl font-bold text-[#10231A]">{title}</h2><p className="mx-auto mt-2 max-w-sm text-[#4B5F54]">{text}</p>{action ? <div className="mt-5">{action}</div> : null}</section>;
}

export function VoiceButton({ onResult }: { onResult: (value: string) => void }) {
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);
  const supported = typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);
  const start = () => {
    if (!supported) return;
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => { lang: string; onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; start: () => void }; webkitSpeechRecognition?: new () => { lang: string; onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; start: () => void } }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => { lang: string; onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; start: () => void } }).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = document.documentElement.lang === "hi" ? "hi-IN" : "en-IN";
    recognition.onresult = (event) => onResult(event.results[0][0].transcript);
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  };
  return <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-[#BFD8C6] bg-white text-green-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:opacity-50" aria-label={supported ? (listening ? t("common.loading") : "Voice input") : t("common.voiceUnsupported")} title={supported ? "Voice input" : t("common.voiceUnsupported")} onClick={start} disabled={!supported}>{listening ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}</button>;
}

export function ReadAloudButton({ text }: { text: string }) {
  const { t } = useTranslation();
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const toggle = () => {
    if (!supported) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.documentElement.lang === "hi" ? "hi-IN" : "en-IN";
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };
  return <button type="button" className="inline-flex min-h-12 items-center gap-2 rounded-2xl px-3 text-sm font-semibold text-green-800 hover:bg-green-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:opacity-50" onClick={toggle} disabled={!supported}><Volume2 className="h-5 w-5" />{speaking ? t("common.stopReading") : t("common.readAloud")}</button>;
}

export function CheckRow({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-3 text-[#314A39]"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-800"><Check className="h-3.5 w-3.5" /></span><span>{children}</span></div>;
}