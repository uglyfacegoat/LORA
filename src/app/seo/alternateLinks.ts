import { LANGS, SITE_URL, localizedPath, type Lang } from "./site";

export type AlternateLink = {
  lang: Lang | "x-default";
  href: string;
};

export function buildAlternateLinks(path: string): AlternateLink[] {
  const localizedLinks = LANGS.map((lang) => ({
    lang,
    href: `${SITE_URL}${localizedPath(path, lang)}`,
  }));

  return [
    ...localizedLinks,
    {
      lang: "x-default" as const,
      href: `${SITE_URL}${localizedPath(path, "en")}`,
    },
  ];
}
