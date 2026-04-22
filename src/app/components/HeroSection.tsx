import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logoLargeDark from "../../assets/logo-large-dark.svg";
import logoLargeLight from "../../assets/logo-large-light.svg";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";

export function HeroSection() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const heroLogo = theme === "dark" ? logoLargeDark : logoLargeLight;

  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      const s = d.getSeconds().toString().padStart(2, "0");
      const offsetMinutes = -d.getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? "+" : "-";
      const absOffset = Math.abs(offsetMinutes);
      const offsetHours = Math.floor(absOffset / 60).toString().padStart(2, "0");
      const offsetRemainder = (absOffset % 60).toString().padStart(2, "0");
      setClock(`${h}:${m}:${s} GMT${sign}${offsetHours}:${offsetRemainder}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "var(--app-bg)" }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-24 left-6 md:left-10 z-10 uppercase"
        style={{ fontSize: "0.55rem", letterSpacing: "0.3em", fontWeight: 600, color: "var(--fg-3)" }}
      >
        {clock}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-24 right-6 md:right-10 z-10 flex flex-col items-end gap-1 uppercase"
        style={{ fontSize: "0.55rem", letterSpacing: "0.3em", fontWeight: 600, color: "var(--fg-3)" }}
      >
        <span>LORA_v04.26</span>
        <span style={{ color: "var(--fg-4)" }}>N 40.7128 / W 74.0060</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <img src={heroLogo} alt="LORA" className="w-[clamp(280px,58vw,720px)] h-auto select-none" draggable={false} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md mt-10 mb-16"
          style={{ fontSize: "1rem", lineHeight: 1.85, letterSpacing: "0.01em", color: "var(--fg-3)" }}
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="group relative px-14 py-4.5 uppercase tracking-[0.25em] cursor-pointer overflow-hidden transition-all duration-500 rounded-xl hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontSize: "0.68rem", fontWeight: 700, background: "var(--cta-bg)", color: "var(--cta-fg)", boxShadow: `0 0 60px ${"var(--button-shadow)"}` }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              {t("hero.cta.primary")}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            className="group relative px-14 py-4.5 uppercase tracking-[0.25em] cursor-pointer overflow-hidden transition-all duration-500 rounded-xl"
            style={{ fontSize: "0.68rem", fontWeight: 500, border: "1px solid var(--surface-border)", color: "var(--fg-2)", background: "transparent" }}
          >
            <span className="relative z-10">{t("hero.cta.secondary")}</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 uppercase"
        style={{ fontSize: "0.5rem", letterSpacing: "0.3em", fontWeight: 600, color: "var(--fg-4)" }}
      >
        <span>{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M5 1V13M5 13L1 9M5 13L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
