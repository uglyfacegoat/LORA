import { motion } from "motion/react";
import { useState } from "react";
import { useInView } from "./useInView";

import { useI18n } from "../i18n";

const PRODUCTS = ["website", "app", "crm"] as const;
type Product = typeof PRODUCTS[number];

const TIERS = ["min", "mid", "max", "custom"] as const;
type Tier = typeof TIERS[number];

const TIER_COLORS: Record<Tier, string> = {
  min: "rgba(255,255,255,0.04)",
  mid: "rgba(255,255,255,0.06)",
  max: "rgba(255,255,255,0.09)",
  custom: "rgba(255,255,255,0.03)",
};

const TIER_BORDER: Record<Tier, string> = {
  min: "rgba(255,255,255,0.07)",
  mid: "rgba(255,255,255,0.12)",
  max: "rgba(255,255,255,0.22)",
  custom: "rgba(255,255,255,0.07)",
};

const TIER_BADGE: Record<Tier, string> = {
  min: "",
  mid: "",
  max: "POPULAR",
  custom: "",
};

export function PricingSection() {
  const [ref, inView] = useInView(0.06);
  const { t } = useI18n();
  const [activeProduct, setActiveProduct] = useState<Product>("website");

  const products: { key: Product; label: string }[] = [
    { key: "website", label: t("pricing.product.website") },
    { key: "app", label: t("pricing.product.app") },
    { key: "crm", label: t("pricing.product.crm") },
  ];

  const tiers: { key: Tier; label: string; price: string; note: string; for: string; value: string; features: string[] }[] = [
    {
      key: "min",
      label: t("pricing.tier.min"),
      price: t(`pricing.${activeProduct}.min.price`),
      note: t("pricing.fromNote"),
      for: t("pricing.tier.min.for"),
      value: t("pricing.tier.min.value"),
      features: [
        t(`pricing.${activeProduct}.min.f1`),
        t(`pricing.${activeProduct}.min.f2`),
        t(`pricing.${activeProduct}.min.f3`),
        t(`pricing.${activeProduct}.min.f4`),
      ],
    },
    {
      key: "mid",
      label: t("pricing.tier.mid"),
      price: t(`pricing.${activeProduct}.mid.price`),
      note: t("pricing.fromNote"),
      for: t("pricing.tier.mid.for"),
      value: t("pricing.tier.mid.value"),
      features: [
        t(`pricing.${activeProduct}.mid.f1`),
        t(`pricing.${activeProduct}.mid.f2`),
        t(`pricing.${activeProduct}.mid.f3`),
        t(`pricing.${activeProduct}.mid.f4`),
        t(`pricing.${activeProduct}.mid.f5`),
      ],
    },
    {
      key: "max",
      label: t("pricing.tier.max"),
      price: t(`pricing.${activeProduct}.max.price`),
      note: t("pricing.fromNote"),
      for: t("pricing.tier.max.for"),
      value: t("pricing.tier.max.value"),
      features: [
        t(`pricing.${activeProduct}.max.f1`),
        t(`pricing.${activeProduct}.max.f2`),
        t(`pricing.${activeProduct}.max.f3`),
        t(`pricing.${activeProduct}.max.f4`),
        t(`pricing.${activeProduct}.max.f5`),
        t(`pricing.${activeProduct}.max.f6`),
      ],
    },
    {
      key: "custom",
      label: t("pricing.tier.custom"),
      price: t("pricing.custom.price"),
      note: t("pricing.custom.note"),
      for: t("pricing.tier.custom.for"),
      value: t("pricing.tier.custom.value"),
      features: [
        t("pricing.custom.f1"),
        t("pricing.custom.f2"),
        t("pricing.custom.f3"),
        t("pricing.custom.f4"),
      ],
    },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20 overflow-hidden">
      {/* Subtle bg glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div style={{ width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>



      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
          <span className="uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}>
            {t("pricing.eyebrow")}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)" }}
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

        {/* Product switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-2 mb-10 p-1 rounded-xl w-fit"
          style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
        >
          {products.map((p) => (
            <button
              key={p.key}
              onClick={() => setActiveProduct(p.key)}
              className="relative px-5 py-2 rounded-lg transition-all duration-300 uppercase tracking-[0.15em]"
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                color: activeProduct === p.key ? "var(--fg-1)" : "var(--fg-3)",
                background: activeProduct === p.key ? "var(--surface-strong)" : "transparent",
                border: activeProduct === p.key ? "1px solid var(--surface-border)" : "1px solid transparent",
              }}
            >
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={`${activeProduct}-${tier.key}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
              className="relative flex flex-col rounded-2xl p-6"
              style={{ background: TIER_COLORS[tier.key], border: `1px solid ${TIER_BORDER[tier.key]}` }}
            >
              {/* Popular badge */}
              {TIER_BADGE[tier.key] && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full uppercase tracking-[0.2em]"
                  style={{ fontSize: "0.5rem", fontWeight: 800, background: "var(--fg-1)", color: "var(--app-bg)", whiteSpace: "nowrap" }}
                >
                  {TIER_BADGE[tier.key]}
                </div>
              )}

              {/* Tier label */}
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="uppercase tracking-[0.2em]"
                  style={{ fontSize: "0.58rem", fontWeight: 700, color: tier.key === "max" ? "var(--fg-2)" : "var(--fg-3)" }}
                >
                  {tier.label}
                </span>
                {tier.key !== "custom" && (
                  <span style={{ fontSize: "0.5rem", color: "var(--fg-4)", fontWeight: 500 }}>
                    {tier.note}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-1" style={{ fontSize: tier.key === "custom" ? "1.3rem" : "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)", lineHeight: 1 }}>
                {tier.price}
              </div>

              {/* For whom */}
              <p className="mt-2" style={{ fontSize: "0.68rem", lineHeight: 1.5, color: "var(--fg-4)" }}>
                {tier.for}
              </p>

              {/* Business value */}
              <p className="mt-2 pt-2" style={{ fontSize: "0.72rem", lineHeight: 1.55, color: "var(--fg-3)", borderTop: "1px solid var(--surface-border)" }}>
                {tier.value}
              </p>

              {/* Divider */}
              <div className="my-5" style={{ height: "1px", background: "var(--surface-border)" }} />

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <span style={{ marginTop: "0.15em", flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.2 7.5L8 2.5" stroke="var(--fg-2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--fg-3)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => {
                  const el = document.getElementById("contact-form");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: "instant" });
                  }
                }}
                className="mt-6 w-full py-3 rounded-xl uppercase tracking-[0.18em] transition-all duration-300"
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  background: tier.key === "max" ? "var(--fg-1)" : "var(--surface-strong)",
                  color: tier.key === "max" ? "var(--app-bg)" : "var(--fg-2)",
                  border: tier.key === "max" ? "none" : "1px solid var(--surface-border)",
                }}
              >
                {tier.key === "custom" ? t("pricing.cta.custom") : t("pricing.cta.default")}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Static extra cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Audit */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.2em]" style={{ fontSize: "0.58rem", fontWeight: 700, color: "var(--fg-3)" }}>
                {t("pricing.audit.label")}
              </span>
              <span
                className="px-2 py-0.5 rounded-md uppercase tracking-[0.15em]"
                style={{ fontSize: "0.48rem", fontWeight: 700, background: "var(--surface-strong)", color: "var(--fg-2)", border: "1px solid var(--surface-border)" }}
              >
                {t("pricing.fixed")}
              </span>
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)", lineHeight: 1 }}>
              {t("pricing.audit.price")}
            </div>
            <div style={{ height: "1px", background: "var(--surface-border)" }} />
            <ul className="flex flex-col gap-2">
              {[
                t("pricing.audit.f1"),
                t("pricing.audit.f2"),
                t("pricing.audit.f3"),
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: "0.15em", flexShrink: 0 }}>
                    <path d="M2 5L4.2 7.5L8 2.5" stroke="var(--fg-2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--fg-3)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                const el = document.getElementById("contact-form");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "instant" });
                }
              }}
              className="mt-auto w-full py-2.5 rounded-xl uppercase tracking-[0.18em] transition-all duration-300"
              style={{ fontSize: "0.58rem", fontWeight: 700, background: "var(--surface-strong)", color: "var(--fg-2)", border: "1px solid var(--surface-border)" }}
            >
              {t("pricing.cta.default")}
            </button>
          </div>

          {/* Hosting */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.2em]" style={{ fontSize: "0.58rem", fontWeight: 700, color: "var(--fg-3)" }}>
                {t("pricing.hosting.label")}
              </span>
              <span
                className="px-2 py-0.5 rounded-md uppercase tracking-[0.15em]"
                style={{ fontSize: "0.48rem", fontWeight: 700, background: "var(--surface-strong)", color: "var(--fg-2)", border: "1px solid var(--surface-border)" }}
              >
                {t("pricing.monthly")}
              </span>
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)", lineHeight: 1 }}>
              {t("pricing.hosting.price")}
            </div>
            <div style={{ height: "1px", background: "var(--surface-border)" }} />
            <ul className="flex flex-col gap-2">
              {[
                t("pricing.hosting.f1"),
                t("pricing.hosting.f2"),
                t("pricing.hosting.f3"),
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: "0.15em", flexShrink: 0 }}>
                    <path d="M2 5L4.2 7.5L8 2.5" stroke="var(--fg-2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--fg-3)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                const el = document.getElementById("contact-form");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "instant" });
                }
              }}
              className="mt-auto w-full py-2.5 rounded-xl uppercase tracking-[0.18em] transition-all duration-300"
              style={{ fontSize: "0.58rem", fontWeight: 700, background: "var(--surface-strong)", color: "var(--fg-2)", border: "1px solid var(--surface-border)" }}
            >
              {t("pricing.cta.default")}
            </button>
          </div>

          {/* Reserved */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.04 }}>
              <span style={{ fontSize: "4rem", fontWeight: 900, color: "var(--fg-1)", userSelect: "none" }}>?</span>
            </div>
            <span className="uppercase tracking-[0.2em]" style={{ fontSize: "0.58rem", fontWeight: 700, color: "var(--fg-4)" }}>
              {t("pricing.reserved.label")}
            </span>
            <div style={{ flex: 1 }} />
            <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "var(--fg-4)", fontStyle: "italic" }}>
              {t("pricing.reserved.hint")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
