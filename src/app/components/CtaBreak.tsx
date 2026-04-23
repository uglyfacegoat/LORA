import { motion } from "motion/react";
import { useInView } from "./useInView";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

export function CtaBreak() {
  const [ref, inView] = useInView(0.2);
  const { t } = useI18n();
  const bigLines = [t("cta.line1"), t("cta.line2")];

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-20 overflow-hidden">
      <SectionLabel word={t("label.choice")} />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent 60%)" }}
      />

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 uppercase"
          style={{ fontSize: "0.75rem", letterSpacing: "0.32em", fontWeight: 700, color: "var(--fg-4)" }}
        >
          {t("cta.eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
          style={{
            fontSize: "clamp(2.35rem, 5.55vw, 4.85rem)",
            fontWeight: 850,
            lineHeight: 1.14,
            letterSpacing: "-0.008em",
          }}
        >
          {bigLines.map((line, index) => (
            <span
              key={index}
              style={{
                display: "block",
                color: index === 0 ? "var(--fg-3)" : "var(--fg-1)",
                paddingBottom: index === 0 ? "0.12em" : 0,
              }}
            >
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto flex max-w-fit items-center justify-center gap-4"
        >
          <span className="h-px w-10 shrink-0" style={{ background: "var(--line-mid)" }} />
          <span
            className="uppercase"
            style={{
              fontSize: "clamp(0.74rem, 0.98vw, 0.86rem)",
              letterSpacing: "0.28em",
              fontWeight: 700,
              color: "var(--fg-3)",
              whiteSpace: "nowrap",
            }}
          >
            {t("cta.slogan")}
          </span>
          <span className="h-px w-10 shrink-0" style={{ background: "var(--line-mid)" }} />
        </motion.div>
      </div>
    </section>
  );
}
