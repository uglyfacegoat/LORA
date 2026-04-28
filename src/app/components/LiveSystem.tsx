import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState, useEffect, useMemo } from "react";

import { useI18n } from "../i18n";

export function LiveSystem() {
  const [ref, inView] = useInView(0.15);
  const [visibleLines, setVisibleLines] = useState(0);
  const { t } = useI18n();

  const terminalLines = useMemo(() => [
    { delay: 0, text: t("live.line1"), type: "cmd" as const },
    { delay: 0.6, text: t("live.line2"), type: "info" as const },
    { delay: 1.2, text: t("live.line3"), type: "warn" as const },
    { delay: 1.8, text: t("live.line4"), type: "error" as const },
    { delay: 2.4, text: t("live.line5"), type: "cmd" as const },
    { delay: 3.0, text: t("live.line6"), type: "info" as const },
    { delay: 3.6, text: t("live.line7"), type: "info" as const },
    { delay: 4.2, text: t("live.line8"), type: "success" as const },
  ], [t]);

  const metrics = [
    { label: t("live.metric1"), value: 94, prev: 31, suffix: "%" },
    { label: t("live.metric2"), value: 8.4, prev: 1.9, suffix: "%" },
    { label: t("live.metric3"), value: 4.2, prev: 0.8, suffix: "x" },
    { label: t("live.metric4"), value: 92, prev: 34, suffix: "%" },
  ];

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalLines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay * 1000));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, terminalLines]);

  const typeColor = {
    cmd: "var(--fg-2)",
    info: "var(--fg-3)",
    warn: "rgba(255,200,100,0.6)",
    error: "rgba(255,120,120,0.6)",
    success: "rgba(120,255,150,0.6)",
  };

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
          <span className="uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}>
            {t("live.eyebrow")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)", marginBottom: "1rem" }}
        >
          {t("live.title")}
          <br />
          <span style={{ color: "var(--fg-3)" }}>{t("live.titleAccent")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-lg mb-14"
          style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--fg-4)" }}
        >
          {t("live.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-[1.4fr_1fr] gap-4"
        >
          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--surface-border)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--surface-border)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--surface-border)" }} />
              </div>
              <span className="uppercase tracking-[0.15em]" style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--fg-5)" }}>LORA TERMINAL</span>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--terminal-live)" }} />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping" style={{ background: "var(--terminal-live-glow)" }} />
                </div>
                <span style={{ fontSize: "0.5rem", color: "var(--fg-4)" }}>LIVE</span>
              </div>
            </div>

            <div className="p-5 md:p-6 font-mono space-y-2 min-h-[280px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <span style={{ color: typeColor[line.type], fontSize: "0.75rem", lineHeight: 1.8 }}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              {visibleLines < terminalLines.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4"
                  style={{ background: "var(--line-strong)" }}
                />
              )}
            </div>
          </div>

          <div className="space-y-3">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="rounded-xl px-5 py-4 relative overflow-hidden"
                style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
              >
                {/* label + old value */}
                <div className="flex items-center justify-between mb-2">
                  <span className="uppercase tracking-[0.2em]" style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--fg-4)" }}>
                    {m.label}
                  </span>
                  <span style={{ fontSize: "1.35rem", color: "var(--fg-2)", textDecoration: "line-through", textDecorationColor: "var(--fg-3)", letterSpacing: "0.05em", fontWeight: 600 }}>
                    {m.prev}{m.suffix}
                  </span>
                </div>

                {/* big number */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  style={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--fg-1)", marginBottom: "0.6rem" }}
                >
                  {m.value}{m.suffix}
                </motion.p>

                {/* 1px progress bar */}
                <div className="h-px w-full" style={{ background: "var(--surface-border)" }}>
                  <motion.div
                    className="h-full"
                    initial={{ width: `${(m.prev / 100) * 100}%` }}
                    animate={inView ? { width: `${Math.min(m.value, 100)}%` } : {}}
                    transition={{ duration: 1.5, delay: 1 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: "var(--fg-2)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
