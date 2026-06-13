import { motion } from "motion/react";
import type { TierView } from "../data/pricing";
import { useI18n } from "../i18n";

function splitRublePrice(price: string) {
  if (!price.includes("₽")) return null;
  const prefix = price.trim().startsWith("от") ? "от " : "";
  const digits = price.replace(/[^\d]/g, "");
  if (digits.length <= 3) return null;
  return {
    top: `${prefix}${digits.slice(0, -3)}`,
    bottom: `${digits.slice(-3)} ₽`,
  };
}

export function ExpandedPricingCard({
  tier,
  productLabel,
  onBack,
}: {
  tier: TierView;
  productLabel: string;
  onBack: () => void;
}) {
  const { t } = useI18n();
  const rublePrice = splitRublePrice(tier.price);
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl p-6 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--fg-1) 5%, transparent), transparent 42%), var(--surface-soft)",
        border: `1px solid ${tier.key === "max" ? "var(--accent-border)" : "var(--surface-border)"}`,
      }}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
        <div>
          <span
            className="uppercase"
            style={{ fontSize: "0.58rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-4)" }}
          >
            {productLabel}
          </span>

          <h2
            className="mt-10 uppercase"
            style={{ fontSize: "0.72rem", letterSpacing: "0.3em", fontWeight: 900, color: "var(--fg-3)" }}
          >
            {tier.label}
          </h2>
          {rublePrice ? (
            <div className="mt-5" style={{ color: "var(--fg-2)" }}>
              <div
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.06em",
                  lineHeight: 0.82,
                }}
              >
                {rublePrice.top}
              </div>
              <div
                style={{
                  fontSize: "clamp(2.35rem, 6.6vw, 5.75rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.055em",
                  lineHeight: 0.86,
                }}
              >
                {rublePrice.bottom}
              </div>
            </div>
          ) : (
            <div
              className="mt-5"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.055em",
                color: "var(--fg-2)",
                lineHeight: 0.9,
              }}
            >
              {tier.price}
            </div>
          )}
          <div
            className="mt-7 h-px w-full"
            style={{ background: "linear-gradient(to right, var(--surface-border), transparent)" }}
          />
          <p className="mt-7 max-w-sm" style={{ fontSize: "0.95rem", lineHeight: 1.68, color: "var(--fg-3)" }}>
            {tier.for}
          </p>

          <p
            className="mt-8 max-w-md"
            style={{ fontSize: "1.05rem", lineHeight: 1.62, color: "var(--fg-2)", fontWeight: 650 }}
          >
            {t(`pricing.recommend.${tier.key}`)}
          </p>
        </div>

        <div>
          <div className="grid gap-0">
            <div
              className="grid gap-4 py-5 md:grid-cols-[10rem_minmax(0,1fr)]"
              style={{ borderTop: "1px solid var(--surface-border)" }}
            >
              <span
                className="uppercase"
                style={{ fontSize: "0.54rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {t("pricing.modal.for")}
              </span>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "var(--fg-2)", fontWeight: 650 }}>
                {tier.value}
              </p>
            </div>
            <div
              className="grid gap-4 py-5 md:grid-cols-[10rem_minmax(0,1fr)]"
              style={{ borderTop: "1px solid var(--surface-border)" }}
            >
              <span
                className="uppercase"
                style={{ fontSize: "0.54rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {t("pricing.modal.start")}
              </span>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "var(--fg-3)" }}>
                {t("pricing.modal.startText")}
              </p>
            </div>
            <div
              className="grid gap-4 py-5 md:grid-cols-[10rem_minmax(0,1fr)]"
              style={{ borderTop: "1px solid var(--surface-border)", borderBottom: "1px solid var(--surface-border)" }}
            >
              <span
                className="uppercase"
                style={{ fontSize: "0.54rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {t("pricing.modal.scope")}
              </span>
              <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      style={{ marginTop: "0.25em", flexShrink: 0 }}
                    >
                      <path
                        d="M2 5L4.2 7.5L8 2.5"
                        stroke="var(--fg-2)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ fontSize: "0.82rem", lineHeight: 1.55, color: "var(--fg-3)" }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 w-full rounded-full px-7 py-4 uppercase md:absolute md:bottom-8 md:right-8 md:mt-0 md:w-auto"
        style={{
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          fontWeight: 900,
          color: "var(--cta-fg)",
          background: "var(--cta-bg)",
          border: "1px solid color-mix(in srgb, var(--fg-1) 18%, transparent)",
        }}
      >
        {t("pricing.card.hide")}
      </button>
    </motion.article>
  );
}
