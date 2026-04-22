import { motion } from "motion/react";
import { useInView } from "./useInView";
import { SectionLabel } from "./SectionLabel";

export function CtaBreak() {
  const [ref, inView] = useInView(0.2);
  const bigLines = ["Если вы тут,", "то ваши конкуренты уже позади"];

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-20 overflow-hidden">
      <SectionLabel word="CHOICE" />

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
          LEAVE OLD RULES AHEAD
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.3rem)",
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.05em",
          }}
        >
          {bigLines.map((line, index) => (
            <span
              key={index}
              style={{
                display: "block",
                color: index === 0 ? "var(--fg-3)" : "var(--fg-1)",
              }}
            >
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto max-w-3xl"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", lineHeight: 1.8, color: "var(--fg-3)" }}
        >
          LEAVE OLD RULES AHEAD
        </motion.p>
      </div>
    </section>
  );
}
