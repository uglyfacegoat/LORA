import { motion } from "motion/react";
import { useInView } from "./useInView";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

export function Manifesto() {
  const [ref, inView] = useInView(0.15);
  const { t } = useI18n();
  const lines = [
    { text: t("manifesto.l1"), opacity: 0.15 },
    { text: t("manifesto.l2"), opacity: 0.2 },
    { text: t("manifesto.l3"), opacity: 0.25 },
    { text: "", opacity: 0 },
    { text: t("manifesto.l4"), opacity: 0.7 },
    { text: t("manifesto.l5"), opacity: 1 },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-52 px-6 md:px-20">
      <SectionLabel word={t("label.manifesto")} index="01" label="Manifesto" side="right" />
      {/* Large ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 55%)" }} />

      <div className="max-w-5xl mx-auto relative">
        {/* Decorative quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-8 -left-4 md:-left-16 pointer-events-none select-none"
        >
          <svg width="60" height="45" viewBox="0 0 60 45" fill="rgba(255,255,255,0.03)">
            <path d="M22.5 0L11.25 22.5H22.5V45H0V22.5L11.25 0H22.5ZM60 0L48.75 22.5H60V45H37.5V22.5L48.75 0H60Z" />
          </svg>
        </motion.div>

        {/* Sparkle decoration */}
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="white"
          className="absolute -top-4 right-8 md:right-20"
          animate={{ opacity: [0.05, 0.2, 0.05], scale: [0.9, 1.1, 0.9], rotate: [0, 45, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M8 0C8 0 8.8 5.2 8 8C7.2 5.2 8 0 8 0ZM16 8C16 8 10.8 8.8 8 8C10.8 7.2 16 8 16 8ZM8 16C8 16 7.2 10.8 8 8C8.8 10.8 8 16 8 16ZM0 8C0 8 5.2 7.2 8 8C5.2 8.8 0 8 0 8Z" />
        </motion.svg>

        <div className="space-y-2 md:space-y-3">
          {lines.map((line, i) => {
            if (!line.text) return <div key={i} className="h-6 md:h-10" />;

            const isBold = line.opacity > 0.5;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p
                  style={{
                    fontSize: isBold ? "clamp(2rem, 5vw, 4rem)" : "clamp(1.3rem, 3.5vw, 2.5rem)",
                    fontWeight: isBold ? 900 : 500,
                    lineHeight: 1.15,
                    letterSpacing: isBold ? "-0.04em" : "-0.02em",
                    color: `color-mix(in srgb, var(--fg-1) ${line.opacity * 100}%, transparent)`,
                    textShadow: isBold ? "0 0 60px var(--surface-strong)" : "none",
                  }}
                >
                  {line.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Horizontal rule after */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px origin-left"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.02))" }}
        />
      </div>
    </section>
  );
}
