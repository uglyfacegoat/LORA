import type { TierView } from "../data/pricing";
import { useI18n } from "../i18n";

export function PricingMiniCard({ tier, isPage, onClick }: { tier: TierView; isPage: boolean; onClick: () => void }) {
  const { t } = useI18n();
  return (
    <TierSummaryCard
      tier={tier}
      featureLimit={isPage ? 4 : 3}
      buttonLabel={isPage ? t("pricing.card.details") : getTierCtaLabel(tier, t)}
      onClick={onClick}
    />
  );
}

export function HomePricingCard({ tier, onClick }: { tier: TierView; onClick: () => void }) {
  const { t } = useI18n();
  return <TierSummaryCard tier={tier} featureLimit={3} buttonLabel={getTierCtaLabel(tier, t)} onClick={onClick} />;
}

function TierSummaryCard({
  tier,
  featureLimit,
  buttonLabel,
  onClick,
}: {
  tier: TierView;
  featureLimit: number;
  buttonLabel: string;
  onClick: () => void;
}) {
  const { t } = useI18n();

  return (
    <article
      className={`relative flex h-auto flex-col rounded-2xl p-6 ${tier.key === "max" ? "pb-10" : ""}`}
      style={{
        background: tier.key === "max" ? "var(--surface-strong)" : "var(--surface-soft)",
        border: `1px solid ${tier.key === "max" ? "var(--accent-border)" : "var(--surface-border)"}`,
      }}
    >
      {tier.key === "max" && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 uppercase"
          style={{
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            fontWeight: 900,
            background: "var(--fg-1)",
            color: "var(--app-bg)",
          }}
        >
          {t("pricing.recommended")}
        </div>
      )}

      <div className="mb-4 flex items-center justify-between gap-4">
        <span
          className="uppercase"
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            fontWeight: 800,
            color: tier.key === "max" ? "var(--fg-2)" : "var(--fg-3)",
          }}
        >
          {tier.label}
        </span>
        {tier.key !== "custom" && (
          <span style={{ fontSize: "0.5rem", color: "var(--fg-4)", fontWeight: 500 }}>{tier.note}</span>
        )}
      </div>

      <div
        style={{
          fontSize: tier.key === "custom" ? "1.3rem" : "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 850,
          letterSpacing: "-0.03em",
          color: "var(--fg-1)",
          lineHeight: 1,
        }}
      >
        {tier.price}
      </div>

      <p className="mt-3" style={{ fontSize: "0.72rem", lineHeight: 1.55, color: "var(--fg-4)" }}>
        {tier.for}
      </p>

      <div className="my-5 h-px" style={{ background: "var(--surface-border)" }} />

      <ul className="grid gap-2.5">
        {tier.features.slice(0, featureLimit).map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckIcon />
            <span style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--fg-3)" }}>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onClick}
        className="mt-6 w-full rounded-xl py-3 uppercase tracking-[0.18em] transition-all duration-300"
        style={{
          fontSize: "0.58rem",
          fontWeight: 800,
          background: tier.key === "max" ? "var(--fg-1)" : "var(--surface-strong)",
          color: tier.key === "max" ? "var(--app-bg)" : "var(--fg-2)",
          border: tier.key === "max" ? "none" : "1px solid var(--surface-border)",
        }}
      >
        {buttonLabel}
      </button>
    </article>
  );
}

function getTierCtaLabel(tier: TierView, t: (key: string) => string) {
  return tier.key === "custom" ? t("pricing.cta.custom") : t("pricing.cta.default");
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: "0.25em", flexShrink: 0 }}>
      <path
        d="M2 5L4.2 7.5L8 2.5"
        stroke="var(--fg-2)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
