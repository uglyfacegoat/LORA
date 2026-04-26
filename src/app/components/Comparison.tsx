import { motion } from "motion/react";
import { useInView } from "./useInView";

import { useI18n } from "../i18n";

export function Comparison() {
  const [ref, inView] = useInView(0.1);
  const { t } = useI18n();

  const rows = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    label: t(`cmp.r${i}.l`),
    them: t(`cmp.r${i}.t`),
    us: t(`cmp.r${i}.u`),
  }));

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-white/40 uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {t("cmp.eyebrow")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)" }}
        >
          {t("cmp.title")}<br />
          <span style={{ color: "var(--fg-3)" }}>{t("cmp.titleAccent")}</span>
        </motion.h2>

        <div className="relative grid md:grid-cols-2 gap-4">
          {/* THEM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3L9 9M9 3L3 9" stroke="var(--fg-4)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.28em", fontWeight: 700, color: "var(--fg-4)" }}>
                {t("cmp.them")}
              </span>
            </div>

            <ul className="space-y-0">
              {rows.map((r, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 py-3"
                  style={{ borderTop: i > 0 ? "1px solid var(--surface-border)" : undefined }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-1.5 shrink-0">
                    <path d="M2 2L8 8M8 2L2 8" stroke="var(--fg-4)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <div className="flex-1">
                    <p className="uppercase tracking-[0.12em]" style={{ fontSize: "0.52rem", fontWeight: 700, color: "var(--fg-4)", marginBottom: 2 }}>{r.label}</p>
                    <p style={{ fontSize: "0.9rem", color: "var(--fg-3)", lineHeight: 1.4, textDecoration: "line-through", textDecorationColor: "var(--fg-4)" }}>{r.them}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* US */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{ background: "var(--surface-mid)", border: "1px solid var(--accent-border)", boxShadow: "0 30px 100px -30px var(--surface-strong)" }}
          >
            <div className="absolute -top-24 -right-24 w-60 h-60 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--surface-strong), transparent 60%)" }} />
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--fg-2), transparent)" }} />

            <div className="flex items-center justify-between mb-8 relative">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--fg-1)", color: "var(--app-bg)" }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.3em", fontWeight: 800, color: "var(--fg-1)" }}>
                  {t("cmp.us")}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md uppercase"
                style={{ fontSize: "0.48rem", letterSpacing: "0.2em", fontWeight: 800, background: "var(--fg-1)", color: "var(--app-bg)" }}>
                {t("cmp.badge")}
              </span>
            </div>

            <ul className="space-y-0 relative">
              {rows.map((r, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                  className="flex items-start gap-3 py-3"
                  style={{ borderTop: i > 0 ? "1px solid var(--surface-border)" : undefined }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-1.5 shrink-0">
                    <path d="M1 5L4 8L9 2" stroke="var(--fg-1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex-1">
                    <p className="uppercase tracking-[0.12em]" style={{ fontSize: "0.52rem", fontWeight: 700, color: "var(--fg-3)", marginBottom: 2 }}>{r.label}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--fg-1)", lineHeight: 1.35 }}>{r.us}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
