import { useI18n } from "../i18n";
import { localizedPath, localize } from "../seo/site";
import type { SeoRoute } from "../seo/routes";
import { SeoShell } from "./SeoShell";

export function NotFoundPage({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  return (
    <SeoShell route={route}>
      <div className="mx-auto max-w-3xl">
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.98, fontWeight: 900, color: "var(--fg-1)" }}>
          {localize(route.h1, lang)}
        </h1>
        <p className="mt-6" style={{ color: "var(--fg-3)", lineHeight: 1.7 }}>
          {localize(route.summary, lang)}
        </p>
        <a
          href={localizedPath("/", lang)}
          className="mt-8 inline-flex rounded-xl px-7 py-4 uppercase"
          style={{
            background: "var(--cta-bg)",
            color: "var(--cta-fg)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            fontWeight: 800,
          }}
        >
          Back home
        </a>
      </div>
    </SeoShell>
  );
}
