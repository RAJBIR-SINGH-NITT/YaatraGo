export function formatDateTime(value: string, language: string): string {
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatTime(value: string, language: string): string {
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

export function toLocalDateTimeInput(value?: string): string {
  const date = value ? new Date(value) : new Date(Date.now() + 60 * 60 * 1000);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}