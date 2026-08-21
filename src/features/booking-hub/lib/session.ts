export const INTAKE_DATA_KEY = "swank-concierge-intake";
export const INTAKE_STEP_KEY = "swank-concierge-step";
export const QUIZ_RESULT_KEY = "swank-booking-path-result";

export function readSessionValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.sessionStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeSessionValue(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function clearConciergeDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(INTAKE_DATA_KEY);
  window.sessionStorage.removeItem(INTAKE_STEP_KEY);
}

export function scrollToRegion(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
