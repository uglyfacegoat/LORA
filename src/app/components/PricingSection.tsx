import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { trackEvent } from "../analytics";
import {
  getPricingProducts,
  getPricingTiers,
  getStandaloneProducts,
  getWebsiteTiers,
  type PricingVariant,
  type Product,
  type Tier,
} from "../data/pricing";
import { useI18n } from "../i18n";
import { localizedPath } from "../seo/site";
import { ExpandedPricingCard } from "./ExpandedPricingCard";
import { PricingMiniCard, HomePricingCard } from "./PricingCards";
import { StandaloneProductsGrid } from "./PricingStandaloneProducts";
import { useInView } from "./useInView";

function scrollToContact(fallbackHref: string) {
  const el = document.getElementById("contact-form");
  if (!el) {
    window.location.href = fallbackHref;
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "instant" });
}

export function PricingSection({ variant = "home" }: { variant?: PricingVariant }) {
  return variant === "page" ? <PricingPageSection /> : <HomePricingSection />;
}

function HomePricingSection() {
  const [ref, inView] = useInView(0.06);
  const { t, lang } = useI18n();

  const tiers = useMemo(() => getWebsiteTiers(t), [t]);
  const standaloneProducts = useMemo(() => getStandaloneProducts(t), [t]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 md:px-20 md:py-44">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div
          style={{
            width: 680,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, color-mix(in srgb, var(--fg-1) 4%, transparent) 0%, transparent 70%)",
            filter: "blur(44px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <span
            className="uppercase tracking-[0.35em]"
            style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}
          >
            {t("pricing.eyebrow")}
          </span>
        </motion.div>

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--fg-1)",
            }}
          >
            {t("pricing.title")}
            <br />
            <span style={{ color: "var(--fg-3)" }}>{t("pricing.titleSub")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "38ch" }}
          >
            {t("pricing.desc")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {tiers.map((tier) => (
            <HomePricingCard
              key={tier.key}
              tier={tier}
              onClick={() => {
                trackEvent("pricing_click", { action: "home_cta", tier: tier.key });
                scrollToContact(localizedPath("/audit", lang));
              }}
            />
          ))}
        </motion.div>

        <p className="mt-8 max-w-3xl" style={{ fontSize: "0.72rem", lineHeight: 1.7, color: "var(--fg-4)" }}>
          {t("pricing.footnote")}
        </p>

        <StandaloneProductsGrid title={t("pricing.extra.title")} products={standaloneProducts} />
      </div>
    </section>
  );
}

function PricingPageSection() {
  const [ref] = useInView(0.06);
  const { t, lang } = useI18n();
  const [activeProduct, setActiveProduct] = useState<Product>("website");
  const [activeTier, setActiveTier] = useState<Tier | null>(null);

  const products = useMemo(() => getPricingProducts(t), [t]);
  const tiers = useMemo(() => getPricingTiers(t, activeProduct), [activeProduct, t]);

  const selectedProduct = products.find((product) => product.key === activeProduct) ?? products[0];
  const isPage = true;
  const selectedTier = tiers.find((tier) => tier.key === activeTier) ?? null;
  const standaloneProducts = useMemo(() => getStandaloneProducts(t), [t]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-24 pt-12 md:px-20 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div
          style={{
            width: 680,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, color-mix(in srgb, var(--fg-1) 4%, transparent) 0%, transparent 70%)",
            filter: "blur(44px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-end">
          <div>
            <span
              className="uppercase"
              style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 800, color: "var(--fg-4)" }}
            >
              {t("pricing.eyebrow")}
            </span>
            <h1
              className="mt-7 max-w-2xl"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: "0",
                color: "var(--fg-1)",
              }}
            >
              {t("pricing.page.title")}
            </h1>
          </div>
          <p
            className="max-w-xl md:justify-self-end"
            style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--fg-3)" }}
          >
            {t("pricing.page.text")}
          </p>
        </div>

        <div
          className="mb-10 flex w-fit max-w-full flex-wrap gap-2 rounded-xl p-1"
          style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
        >
          {products.map((product) => {
            const active = activeProduct === product.key;
            return (
              <button
                key={product.key}
                onClick={() => {
                  trackEvent("pricing_click", { action: "switch_product", product: product.key });
                  setActiveProduct(product.key);
                  setActiveTier(null);
                }}
                className="group rounded-lg px-5 py-2.5 text-left transition-all duration-300"
                style={{
                  background: active ? "var(--surface-strong)" : "transparent",
                  border: active ? "1px solid var(--surface-border)" : "1px solid transparent",
                }}
              >
                <span
                  className="uppercase"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    fontWeight: 800,
                    color: active ? "var(--fg-1)" : "var(--fg-3)",
                  }}
                >
                  {product.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-8 max-w-2xl" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
          {selectedProduct.summary}
        </p>

        {!isPage || !selectedTier ? (
          <motion.div
            key="pricing-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {tiers.map((tier) => (
              <PricingMiniCard
                key={`${activeProduct}-${tier.key}`}
                tier={tier}
                isPage={isPage}
                onClick={() => {
                  trackEvent("pricing_click", { action: "open_tier", product: activeProduct, tier: tier.key });
                  if (isPage) {
                    setActiveTier(tier.key);
                    return;
                  }
                  scrollToContact(localizedPath("/audit", lang));
                }}
              />
            ))}
          </motion.div>
        ) : (
          <ExpandedPricingCard
            key={`${activeProduct}-${selectedTier.key}-expanded`}
            tier={selectedTier}
            productLabel={selectedProduct.label}
            onBack={() => setActiveTier(null)}
          />
        )}

        {isPage && !activeTier && (
          <StandaloneProductsGrid title={t("pricing.extra.title")} products={standaloneProducts} />
        )}

        {isPage && (
          <div className="mt-12" style={{ borderTop: "1px solid var(--surface-border)", paddingTop: "2rem" }}>
            <p className="max-w-4xl" style={{ fontSize: "0.74rem", lineHeight: 1.7, color: "var(--fg-4)" }}>
              {t("pricing.offerDisclaimer")}
            </p>
            <a
              href={localizedPath("/audit", lang)}
              onClick={() => trackEvent("pricing_click", { action: "page_brief", product: activeProduct })}
              className="group mt-9 grid gap-6 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              style={{
                borderTop: "1px solid var(--surface-border)",
                borderBottom: "1px solid var(--surface-border)",
                color: "var(--fg-1)",
              }}
            >
              <span>
                <span
                  className="block uppercase"
                  style={{ fontSize: "0.56rem", letterSpacing: "0.28em", fontWeight: 900, color: "var(--fg-4)" }}
                >
                  {t("pricing.cta.kicker")}
                </span>
                <span
                  className="mt-3 block"
                  style={{
                    fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)",
                    lineHeight: 1,
                    fontWeight: 850,
                    letterSpacing: "-0.025em",
                    color: "var(--fg-2)",
                  }}
                >
                  {t("pricing.cta.big")}
                </span>
              </span>
              <span
                className="flex items-center justify-start gap-4 uppercase transition-transform duration-300 group-hover:translate-x-1 md:justify-end"
                style={{ fontSize: "0.62rem", letterSpacing: "0.24em", fontWeight: 900, color: "var(--fg-2)" }}
                aria-hidden="true"
              >
                <span>{t("pricing.cta.default")}</span>
                <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>→</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
