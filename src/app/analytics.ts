export type AnalyticsEvent =
  | "click_cta"
  | "submit_lead_form"
  | "click_phone"
  | "click_email"
  | "click_telegram"
  | "click_whatsapp"
  | "open_brief"
  | "pricing_click"
  | "service_page_cta_click";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    ym?: (counterId: string | number, method: string, eventName: string, params?: Payload) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const yandexCounterId = import.meta.env.VITE_YANDEX_METRIKA_ID;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function trackEvent(eventName: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("lora:analytics", { detail: { eventName, payload } }));

  if (yandexCounterId && typeof window.ym === "function") {
    window.ym(yandexCounterId, "reachGoal", eventName, payload);
  }

  if (gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}
