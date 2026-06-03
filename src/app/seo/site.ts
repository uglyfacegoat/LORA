export type Lang = "en" | "es" | "ru" | "zh";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://loragroup.space").replace(/\/$/, "");
export const SITE_NAME = "LORA";
export const DEFAULT_LANG: Lang = "en";
export const LANGS: Lang[] = ["en", "es", "ru", "zh"];

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  es: "Espanol",
  ru: "Русский",
  zh: "中文",
};

export const CONTACT_EMAIL = "support@loragroup.space";
export const OG_IMAGE = "/logo-large-dark.svg";

export type LocalizedText = Record<Lang, string>;

export function localize(text: LocalizedText, lang: Lang) {
  return text[lang] || text[DEFAULT_LANG];
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && LANGS.includes(value as Lang);
}

export function stripTrailingSlash(path: string) {
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

export function getLangFromPath(pathname: string): Lang | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLang(segment) ? segment : null;
}

export function getPathWithoutLang(pathname: string) {
  const clean = stripTrailingSlash(pathname.split("?")[0] || "/");
  const parts = clean.split("/").filter(Boolean);
  if (isLang(parts[0])) parts.shift();
  return parts.length ? `/${parts.join("/")}` : "/";
}

export function localizedPath(path: string, lang: Lang) {
  const clean = stripTrailingSlash(path || "/");
  return clean === "/" ? `/${lang}/` : `/${lang}${clean}/`;
}

export function absoluteUrl(path: string, lang?: Lang) {
  return `${SITE_URL}${lang ? localizedPath(path, lang) : path}`;
}
