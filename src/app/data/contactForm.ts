import { COUNTRY_OPTIONS, TIMEZONE_COUNTRY_MAP } from "./phoneCountries";
import type { CountryOption } from "./phoneCountries";

export type AlertState = {
  tone: "success" | "error";
  text: string;
} | null;

export type ContactFormCopy = {
  countrySelect: string;
  searchPlaceholder: string;
  noResults: string;
  missingFields: string;
  invalidEmail: string;
  success: string;
};

export type BriefOption = {
  value: string;
  label: string;
  meta?: string;
};

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  company: string;
  briefDate: string;
  briefTime: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const LEADS_API_URL = `${API_BASE_URL}/api/leads`;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function submitLead(values: ContactFormValues, selectedCountry: CountryOption) {
  return fetch(LEADS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      briefDate: values.briefDate.trim(),
      briefTime: values.briefTime.trim(),
      dialCode: selectedCountry.dialCode,
      countryIso: selectedCountry.iso,
      countryLabel: selectedCountry.label,
    }),
  });
}

export function detectCountryIso() {
  if (typeof window === "undefined") return "US";

  const localeValues = [navigator.language, ...navigator.languages].filter(Boolean).map((value) => value.toUpperCase());
  for (const value of localeValues) {
    const match = value.match(/[-_]([A-Z]{2})$/);
    if (!match) continue;
    const iso = match[1];
    if (COUNTRY_OPTIONS.some((country) => country.iso === iso)) return iso;
  }

  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TIMEZONE_COUNTRY_MAP[zone] ?? "US";
}

export function getContactFormCopy(lang: string): ContactFormCopy {
  if (lang === "ru") {
    return {
      countrySelect: "Регион телефона",
      searchPlaceholder: "Поиск страны или кода",
      noResults: "Ничего не найдено",
      missingFields: "Заполни имя, телефон и email.",
      invalidEmail: "Проверь email.",
      success: "Заявка отправлена.",
    };
  }
  if (lang === "es") {
    return {
      countrySelect: "Region del telefono",
      searchPlaceholder: "Busca un pais o codigo",
      noResults: "No se encontro nada",
      missingFields: "Completa nombre, telefono y email.",
      invalidEmail: "Revisa el email.",
      success: "Solicitud enviada.",
    };
  }
  if (lang === "zh") {
    return {
      countrySelect: "Phone Region",
      searchPlaceholder: "Search country or code",
      noResults: "No matches found",
      missingFields: "Fill in name, phone and email.",
      invalidEmail: "Check the email.",
      success: "Request sent.",
    };
  }
  return {
    countrySelect: "Phone Region",
    searchPlaceholder: "Search country or code",
    noResults: "No matches found",
    missingFields: "Fill in name, phone and email.",
    invalidEmail: "Check the email.",
    success: "Request sent.",
  };
}

export function buildBriefDateOptions(lang: string): BriefOption[] {
  const now = new Date();
  const locale = lang === "ru" ? "ru-RU" : lang === "es" ? "es-ES" : "en-US";

  return Array.from({ length: 21 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() + index);
    const value = date.toISOString().slice(0, 10);
    const label = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
    }).format(date);
    const meta = new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(date);

    return { value, label, meta };
  });
}

export function formatBriefDateValue(value: string, lang: string) {
  if (!value) return "";
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  const locale = lang === "ru" ? "ru-RU" : lang === "es" ? "es-ES" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}
