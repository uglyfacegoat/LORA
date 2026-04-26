import { motion } from "motion/react";
import { useInView } from "./useInView";

import { useI18n } from "../i18n";

export function StorySection() {
  const [ref, inView] = useInView(0.08);
  const { t } = useI18n();

  const steps = [
    { year: t("story.s1.year"), text: t("story.s1.text") },
    { year: t("story.s2.year"), text: t("story.s2.text") },
    { year: t("story.s3.year"), text: t("story.s3.text") },
    { year: t("story.s4.year"), text: t("story.s4.text") },
  ];

  const stats = [
    { value: t("story.stat1.value"), label: t("story.stat1.label") },
    { value: t("story.stat2.value"), label: t("story.stat2.label") },
    { value: t("story.stat3.value"), label: t("story.stat3.label") },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">


      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
          <span className="uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}>
            {t("story.eyebrow")}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)" }}
          >
            {t("story.title")}
            <br />
            <span style={{ color: "var(--fg-3)" }}>{t("story.titleAccent")}</span>
          </motion.h2>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-0"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="px-6 py-3 text-center">
                  <p style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--fg-1)", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p className="uppercase tracking-[0.15em] mt-1" style={{ fontSize: "0.48rem", fontWeight: 700, color: "var(--fg-4)" }}>
                    {s.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8" style={{ background: "var(--surface-border)" }} />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="relative p-8 md:p-10"
              style={{
                borderTop: "1px solid var(--surface-border)",
                borderRight: i % 2 === 0 ? "1px solid var(--surface-border)" : undefined,
              }}
            >
              {/* Number */}
              <span
                className="absolute top-8 right-8 md:right-10"
                style={{ fontSize: "0.48rem", fontWeight: 800, letterSpacing: "0.2em", color: "var(--fg-5)" }}
              >
                0{i + 1}
              </span>

              {/* Year tag */}
              <p
                className="uppercase tracking-[0.25em] mb-4"
                style={{ fontSize: "0.52rem", fontWeight: 700, color: "var(--fg-4)" }}
              >
                {step.year}
              </p>

              {/* Text */}
              <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--fg-3)", maxWidth: "44ch" }}>
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom closing line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-0 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ borderTop: "1px solid var(--surface-border)" }}
        >
          <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "60ch" }}>
            {t("story.closing")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
