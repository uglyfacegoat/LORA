import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState, useEffect } from "react";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

const terminalLines = [
  { delay: 0, text: "$ lora diagnose --target funnel", type: "cmd" as const },
  { delay: 0.6, text: "→ Scanning 247 touchpoints...", type: "info" as const },
  { delay: 1.2, text: "→ 12 critical leaks identified", type: "warn" as const },
  { delay: 1.8, text: "→ Est. revenue loss: $340K/month", type: "error" as const },
  { delay: 2.4, text: "$ lora fix --priority critical", type: "cmd" as const },
  { delay: 3.0, text: "→ Deploying conversion patches...", type: "info" as const },
  { delay: 3.6, text: "→ A/B tests configured: 8", type: "info" as const },
  { delay: 4.2, text: "✓ System online. Monitoring active.", type: "success" as const },
];

const metrics = [
  { label: "Funnel Health", value: 94, prev: 31 },
  { label: "Conv. Rate", value: 8.4, prev: 1.9 },
  { label: "Revenue/Visit", value: 4.2, prev: 0.8 },
  { label: "Lead Quality", value: 92, prev: 34 },
];

export function LiveSystem() {
  const [ref, inView] = useInView(0.15);
  const [visibleLines, setVisibleLines] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalLines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay * 1000));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const typeColor = {
    cmd: "rgba(255,255,255,0.7)",
    info: "rgba(255,255,255,0.35)",
    warn: "rgba(255,200,100,0.6)",
    error: "rgba(255,120,120,0.6)",
    success: "rgba(120,255,150,0.6)",
  };

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">
      <SectionLabel word="TERMINAL" index="05" label="Live System" side="right" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-white/40 uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{t("live.eyebrow")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          See the system<br />
          <span className="text-white/30">in action.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/25 max-w-lg mb-14"
          style={{ fontSize: "0.92rem", lineHeight: 1.7 }}
        >
          This is what happens when we plug into your funnel. Real diagnostics. Real fixes. Real growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-[1.4fr_1fr] gap-4"
        >
          {/* Terminal */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Terminal header */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="text-white/15 uppercase tracking-[0.15em]" style={{ fontSize: "0.5rem", fontWeight: 700 }}>LORA TERMINAL</span>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400/30 animate-ping" />
                </div>
                <span className="text-white/20" style={{ fontSize: "0.5rem" }}>LIVE</span>
              </div>
            </div>

            {/* Terminal body */}
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
              {/* Cursor */}
              {visibleLines < terminalLines.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-white/30"
                />
              )}
            </div>
          </div>

          {/* Metrics panel */}
          <div className="space-y-3">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="rounded-xl p-5 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/30 uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", fontWeight: 700 }}>{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/15 line-through" style={{ fontSize: "0.65rem" }}>{m.prev}</span>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4H9M9 4L6 1M9 4L6 7" stroke="rgba(255,255,255,0.2)" strokeWidth="1" /></svg>
                    <span className="text-white/70" style={{ fontSize: "0.75rem", fontWeight: 700 }}>{m.value}{typeof m.value === "number" && m.value > 10 ? "%" : "×"}</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.3))" }}
                    initial={{ width: `${(m.prev / Math.max(m.value, 100)) * 100}%` }}
                    animate={inView ? { width: `${(m.value / Math.max(m.value, 100)) * 100}%` } : {}}
                    transition={{ duration: 1.5, delay: 1 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
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
