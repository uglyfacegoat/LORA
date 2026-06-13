import React, { createContext, useContext, useEffect, useState } from "react";
import { getLangFromPath, getPathWithoutLang, localizedPath } from "./seo/site";
import { translations, type Lang } from "./i18nMessages";

export { LANGS, translations } from "./i18nMessages";
export type { Lang } from "./i18nMessages";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children, initialPath }: { children: React.ReactNode; initialPath?: string }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const path = initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/en/");
    return getLangFromPath(path) ?? "en";
  });

  useEffect(() => {
    const urlLang = getLangFromPath(window.location.pathname);
    if (urlLang) {
      setLangState(urlLang);
      return;
    }

    const saved = localStorage.getItem("lora.lang") as Lang | null;
    if (saved && ["en", "es", "ru", "zh"].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const urlLang = getLangFromPath(window.location.pathname);
      if (urlLang) setLangState(urlLang);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lora.lang", l);
    } catch {}

    const nextPath = localizedPath(getPathWithoutLang(window.location.pathname), l);
    window.history.pushState(null, "", `${nextPath}${window.location.search}${window.location.hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const t = (key: string) => translations[key]?.[lang] ?? translations[key]?.en ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
