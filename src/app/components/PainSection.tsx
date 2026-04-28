import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { useI18n } from "../i18n";

export function PainSection() {
  const { t } = useI18n();
  const pains = [
    { id: "01", text: t("pain.01.t"), sub: t("pain.01.s"), percent: "73%", percentLabel: t("pain.01.l"), src: t("pain.01.src"), color: "var(--surface-mid)" },
    { id: "02", text: t("pain.02.t"), sub: t("pain.02.s"), percent: "4.2x", percentLabel: t("pain.02.l"), src: t("pain.02.src"), color: "var(--surface-soft)" },
    { id: "03", text: t("pain.03.t"), sub: t("pain.03.s"), percent: "89%", percentLabel: t("pain.03.l"), src: t("pain.03.src"), color: "var(--surface-mid)" },
    { id: "04", text: t("pain.04.t"), sub: t("pain.04.s"), percent: "0%", percentLabel: t("pain.04.l"), src: t("pain.04.src"), color: "var(--surface-soft)" },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const current = pains[active];

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const normalized = Math.min(0.9999, Math.max(0, value));
    const next = Math.min(pains.length - 1, Math.floor(normalized * pains.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section ref={sectionRef} className="relative px-6 md:px-20">
      <div className="h-[360vh]">
        <div className="sticky top-0 flex min-h-screen items-center py-16 md:py-24">
          <div className="max-w-6xl mx-auto relative w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
              <ScrambleText
                as="span"
                text={t("pain.eyebrow")}
                trigger={inView}
                className="uppercase tracking-[0.35em]"
                style={{ fontSize: "0.65rem", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "var(--fg-3)" }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)", marginBottom: "1.5rem" }}
            >
              {t("pain.title")}
              <br />
              <span style={{ color: "var(--fg-3)" }}>{t("pain.titleAccent")}</span>
            </motion.h2>

            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16 mt-12 sm:mt-16">
              <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden p-6 sm:p-8 md:p-12"
                style={{ background: current.color, border: "1px solid var(--surface-border)" }}
              >
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-30">
                  <div className="w-1 h-1 rounded-full" style={{ background: "var(--fg-1)" }} />
                  <div className="w-6 h-px" style={{ background: "var(--fg-3)" }} />
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "clamp(5rem, 14vw, 10rem)",
                      fontWeight: 900,
                      lineHeight: 0.85,
                      letterSpacing: "-0.05em",
                      color: "var(--fg-1)",
                      textShadow: "0 0 80px var(--shadow-soft)",
                    }}
                  >
                    {current.percent}
                  </p>
                  <p className="uppercase tracking-[0.25em] mt-4" style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--fg-3)" }}>
                    {current.percentLabel}
                  </p>
                </div>

                <motion.div key={current.id + "-text"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 }} className="mt-10">
                  <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--fg-1)", marginBottom: "0.75rem" }}>
                    {current.text}
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 380, color: "var(--fg-3)", overflowWrap: "anywhere" }}>
                    {current.sub} <span style={{ color: "var(--fg-4)" }}>{current.src}.</span>
                  </p>
                </motion.div>

                <div className="flex gap-1.5 mt-10">
                  {pains.map((_, i) => (
                    <div key={i} className="h-[3px] rounded-full overflow-hidden flex-1" style={{ background: "var(--surface-strong)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--line-strong)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: i === active ? "100%" : i < active ? "100%" : "0%" }}
                        transition={{ duration: 0.3, ease: "linear" }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden md:flex flex-col justify-center gap-3"
              >
                {pains.map((pain, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={pain.id}
                      onClick={() => setActive(i)}
                      className="relative cursor-pointer transition-all duration-500 py-5 px-6 rounded-xl group"
                      style={{
                        background: isActive ? "var(--surface-mid)" : "transparent",
                        border: `1px solid ${isActive ? "var(--accent-border)" : "var(--surface-border)"}`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500"
                          style={{
                            background: isActive ? "var(--surface-strong)" : "var(--surface-soft)",
                            border: `1px solid ${isActive ? "var(--accent-border)" : "var(--surface-border)"}`,
                          }}
                        >
                          <span style={{ fontSize: "0.5rem", fontWeight: 800, color: isActive ? "var(--fg-2)" : "var(--fg-5)" }}>
                            {pain.id}
                          </span>
                        </div>
                        <p
                          className="transition-colors duration-400"
                          style={{
                            fontSize: "0.88rem",
                            fontWeight: 600,
                            color: isActive ? "var(--fg-1)" : "var(--fg-4)",
                          }}
                        >
                          {pain.text}
                        </p>
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 ml-11"
                          style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--fg-4)" }}
                        >
                          {pain.sub}
                        </motion.p>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
