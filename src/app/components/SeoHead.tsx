import { useEffect } from "react";
import { useI18n } from "../i18n";
import { applyPageMeta } from "../seo/meta";
import type { SeoRoute } from "../seo/routes";

export function SeoHead({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();

  useEffect(() => {
    applyPageMeta(route, lang);
  }, [route, lang]);

  return null;
}
