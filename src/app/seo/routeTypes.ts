import type { LocalizedText } from "./site";

export type RouteKind = "home" | "listing" | "service" | "industry" | "article" | "simple" | "not-found";
export type ChangeFrequency = "weekly" | "monthly" | "yearly";

export type SeoRoute = {
  kind: RouteKind;
  path: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  h1: LocalizedText;
  summary: LocalizedText;
  eyebrow?: LocalizedText;
  changeFrequency: ChangeFrequency;
  priority: number;
  updatedAt?: string;
  noindex?: boolean;
};

export type DetailRoute = SeoRoute & {
  kind: "service" | "industry" | "article";
  problems: LocalizedText[];
  deliverables: LocalizedText[];
  integrations: LocalizedText[];
  process: LocalizedText[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  related: string[];
  cta: LocalizedText;
  date?: string;
};

export function text(en: string, ru: string, es = en, zh = en): LocalizedText {
  return { en, es, ru, zh };
}
