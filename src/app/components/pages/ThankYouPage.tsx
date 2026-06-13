import { useI18n } from "../../i18n";
import { localizedPath, localize } from "../../seo/site";
import type { Lang } from "../../seo/site";
import type { SeoRoute } from "../../seo/routes";
import { SeoShell } from "../SeoShell";
import { SeoCtaButton, SeoStatement, SeoTechLabel } from "../SeoVisualBlocks";

export function ThankYouPage({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  const copy = thankYouCopy[lang];
  return (
    <SeoShell route={route}>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <div
          className="pointer-events-none absolute -inset-x-20 -inset-y-32 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, color-mix(in srgb, var(--glow-mid) 22%, transparent), transparent 70%)",
          }}
        />

        <SeoTechLabel>{copy.status}</SeoTechLabel>

        <h1
          className="mt-10"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            lineHeight: 0.92,
            fontWeight: 900,
            letterSpacing: "-0.055em",
            color: "var(--fg-1)",
            textShadow: "0 0 80px color-mix(in srgb, var(--glow-mid) 40%, transparent)",
          }}
        >
          {localize(route.h1, lang)}
        </h1>

        <p className="mt-8 max-w-xl" style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--fg-3)" }}>
          {localize(route.summary, lang)}
        </p>

        <div className="mt-16">
          <SeoStatement
            lines={[
              { text: copy.statement[0] },
              { text: copy.statement[1], emphasis: false },
              { text: copy.statement[2], emphasis: true },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <SeoCtaButton href={localizedPath("/", lang)} label={copy.back} />
          <SeoCtaButton href={localizedPath("/services", lang)} label={copy.services} variant="ghost" />
        </div>
      </div>
    </SeoShell>
  );
}

type ThankYouCopy = {
  status: string;
  statement: [string, string, string];
  back: string;
  services: string;
};

const thankYouCopy: Record<Lang, ThankYouCopy> = {
  en: {
    status: "STATUS · RECEIVED",
    statement: ["LORA reads the brief.", "Replies in writing", "within one or two days."],
    back: "Back to LORA",
    services: "See services",
  },
  es: {
    status: "ESTADO · RECIBIDO",
    statement: ["LORA lee el brief.", "Responde por escrito", "en uno o dos dias."],
    back: "Volver a LORA",
    services: "Ver servicios",
  },
  ru: {
    status: "СТАТУС · ПОЛУЧЕНО",
    statement: ["LORA читает бриф.", "Отвечает письменно", "в течение одного-двух дней."],
    back: "Назад к LORA",
    services: "Смотреть услуги",
  },
  zh: {
    status: "状态 · 已收到",
    statement: ["LORA 阅读 brief。", "会以书面回复", "通常一到两天内。"],
    back: "返回 LORA",
    services: "查看服务",
  },
};
