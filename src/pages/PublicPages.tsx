import { Eye, EyeOff, Globe2, ShieldCheck } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../app/AppProvider";
import { BrandMark, Button, Input } from "../components/ui";

function PublicFrame({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-[#F2FAF4] px-4 py-6 sm:grid sm:place-items-center sm:p-8"><div className="mx-auto w-full max-w-md">{children}</div></main>;
}

export function OnboardingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { completeOnboarding, setLanguage } = useApp();
  const [step, setStep] = useState(0);
  const steps = [
    { title: t("onboarding.step1Title"), text: t("onboarding.step1Text") },
    { title: t("onboarding.step2Title"), text: t("onboarding.step2Text") },
    { title: t("onboarding.step3Title"), text: t("onboarding.step3Text") },
  ];
  const finish = () => { completeOnboarding(); navigate("/login"); };
  const chooseLanguage = (language: "en" | "hi") => { setLanguage(language); void i18n.changeLanguage(language); document.documentElement.lang = language; };
  return (
    <PublicFrame>
      <div className="flex min-h-[calc(100vh-3rem)] flex-col justify-between py-5 sm:min-h-[620px]">
        <div className="flex items-center gap-3"><BrandMark className="h-11 w-11 motion-safe:animate-[float_3.5s_ease-in-out_infinite]" /><div><p className="text-2xl font-bold tracking-tight text-[#10231A]">{t("app.name")}</p><p className="text-sm text-[#4B5F54]">{t("onboarding.language")}</p></div></div>
        <section className="motion-safe:animate-[fadeUp_300ms_ease-out]">
          <div className="mb-7 flex gap-2" aria-label={t("journey.step", { current: step + 1, total: steps.length })}>{steps.map((item, index) => <span key={item.title} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-green-700" : "bg-[#CDE5D3]"}`} />)}</div>
          <div className="mb-8 grid h-20 w-20 place-items-center rounded-[28px] bg-green-800 text-3xl font-bold text-white">0{step + 1}</div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10231A]">{steps[step].title}</h1>
          <p className="mt-4 max-w-sm text-lg leading-8 text-[#4B5F54]">{steps[step].text}</p>
          {step === 0 ? <div className="mt-8 flex gap-3" role="group" aria-label={t("onboarding.language")}><button type="button" onClick={() => chooseLanguage("en")} className={`min-h-12 rounded-2xl border px-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${i18n.language === "en" ? "border-green-700 bg-green-100 text-green-900" : "border-[#BFD8C6] bg-white text-[#243B2C]"}`}>English</button><button type="button" onClick={() => chooseLanguage("hi")} className={`min-h-12 rounded-2xl border px-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${i18n.language === "hi" ? "border-green-700 bg-green-100 text-green-900" : "border-[#BFD8C6] bg-white text-[#243B2C]"}`}>हिन्दी</button></div> : null}
        </section>
        <div className="space-y-4"><p className="text-sm leading-6 text-[#4B5F54]">{t("onboarding.privacy")}</p><div className="flex gap-3"><Button variant="secondary" className="flex-1" onClick={finish}>{t("actions.skip")}</Button><Button className="flex-[1.5]" onClick={() => step === steps.length - 1 ? finish() : setStep((value) => value + 1)}>{step === steps.length - 1 ? t("actions.done") : t("actions.continue")}</Button></div></div>
      </div>
    </PublicFrame>
  );
}

function AuthHeader({ title, text }: { title: string; text: string }) {
  const { t } = useTranslation();
  return <><Link to="/onboarding" className="inline-flex items-center gap-2 rounded-lg text-[#10231A] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700"><BrandMark /><span className="text-xl font-bold">{t("app.name")}</span></Link><header className="mt-12"><div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-800"><ShieldCheck className="h-6 w-6" /></div><h1 className="text-3xl font-bold tracking-tight text-[#10231A]">{title}</h1><p className="mt-3 text-[#4B5F54]">{text}</p></header></>;
}

function PasswordField({ label, value, onChange, autocomplete }: { label: string; value: string; onChange: (value: string) => void; autocomplete: string }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  return <div className="relative"><Input label={label} type={visible ? "text" : "password"} autoComplete={autocomplete} value={value} onChange={(event) => onChange(event.target.value)} required className="pr-14" /><button type="button" className="absolute bottom-1 right-1 grid h-12 w-12 place-items-center rounded-xl text-green-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-green-700" onClick={() => setVisible((current) => !current)} aria-label={visible ? t("auth.hidePassword") : t("auth.showPassword")}>{visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>;
}

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, isMock, loginDemo } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (isAuthenticated) return <Navigate to="/home" replace />;
  const submit = (event: FormEvent) => { event.preventDefault(); if (!isMock) return; loginDemo(); navigate("/home"); };
  return <PublicFrame><AuthHeader title={t("auth.welcome")} text={t("auth.signinText")} /><form onSubmit={submit} className="mt-8 space-y-5"><Input label={t("auth.email")} type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><PasswordField label={t("auth.password")} value={password} onChange={setPassword} autocomplete="current-password" />{isMock ? <p className="rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-sky-950">{t("auth.demoNotice")}</p> : <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">{t("auth.realUnavailable")}</p>}<Button type="submit" className="w-full" disabled={!isMock}>{t("auth.login")}</Button></form><p className="mt-7 text-center text-[#4B5F54]">{t("auth.newAccount")} <Link to="/register" className="font-bold text-green-800 underline underline-offset-4">{t("auth.create")}</Link></p></PublicFrame>;
}

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, isMock, loginDemo } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  if (isAuthenticated) return <Navigate to="/home" replace />;
  const submit = (event: FormEvent) => { event.preventDefault(); if (password !== confirmPassword) { setError(t("auth.passwordMismatch")); return; } if (!isMock) return; loginDemo(); navigate("/home"); };
  return <PublicFrame><AuthHeader title={t("auth.create")} text={t("auth.createText")} /><form onSubmit={submit} className="mt-8 space-y-5"><Input label={t("auth.email")} type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><PasswordField label={t("auth.password")} value={password} onChange={setPassword} autocomplete="new-password" /><PasswordField label={t("auth.confirmPassword")} value={confirmPassword} onChange={(value) => { setConfirmPassword(value); setError(""); }} autocomplete="new-password" />{error ? <p role="alert" className="text-sm font-semibold text-red-800">{error}</p> : null}{isMock ? <p className="rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-sky-950">{t("auth.demoNotice")}</p> : <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">{t("auth.realUnavailable")}</p>}<Button type="submit" className="w-full" disabled={!isMock}>{t("auth.create")}</Button></form><p className="mt-7 text-center text-[#4B5F54]">{t("auth.existingAccount")} <Link to="/login" className="font-bold text-green-800 underline underline-offset-4">{t("auth.login")}</Link></p></PublicFrame>;
}

export function NotFoundPage() {
  const { t } = useTranslation();
  return <PublicFrame><div className="grid min-h-[70vh] place-items-center text-center"><div><Globe2 className="mx-auto h-12 w-12 text-green-800" /><h1 className="mt-5 text-3xl font-bold text-[#10231A]">{t("common.notFound")}</h1><Link to="/home" className="mt-6 inline-flex min-h-12 items-center rounded-2xl bg-green-700 px-5 font-bold text-white">{t("common.goHome")}</Link></div></div></PublicFrame>;
}