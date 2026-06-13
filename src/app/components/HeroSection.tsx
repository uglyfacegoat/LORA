import { motion } from "motion/react";
import { useEffect, useState } from "react";
import heroMoon from "../../assets/hero-moon.png";
import { HERO_STARS } from "../data/heroStars";
import { trackEvent } from "../analytics";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";

export function HeroSection() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const starColor = theme === "dark" ? "255,255,255" : "10,10,10";
  const titleLines = t("hero.title").split("\n");

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
      const offsetHours = Math.floor(absOffset / 60)
        .toString()
        .padStart(2, "0");
      const offsetRemainder = (absOffset % 60).toString().padStart(2, "0");
      setClock(`${h}:${m}:${s} GMT${sign}${offsetHours}:${offsetRemainder}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative z-20 min-h-screen overflow-visible px-8 sm:px-12 lg:px-16 xl:px-20 pb-4 sm:pb-6 pt-32 sm:pt-36 md:pt-40">
      <div className="absolute inset-0 z-0" style={{ background: "var(--app-bg)" }} />
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {HERO_STARS.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: theme === "dark" ? star.opacity : star.opacity * 0.32,
              background: `rgba(${starColor}, 1)`,
              filter: star.blur ? `blur(${star.blur}px)` : "none",
              boxShadow:
                star.size >= 2
                  ? `0 0 ${Math.max(4, star.size * 2.5)}px rgba(${starColor}, ${theme === "dark" ? 0.25 : 0.08})`
                  : "none",
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 42%, var(--app-bg) 100%)",
          }}
        />
      </div>

      <motion.img
        src={heroMoon}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: 14, y: 0, rotate: -0.2 }}
        animate={{
          opacity: 1,
          x: [0, -18, -6, 0],
          y: [0, -10, 7, 0],
          rotate: [-0.2, 0.35, 0.08, -0.2],
        }}
        transition={{
          opacity: { duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 32, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none select-none absolute z-[0] hidden max-w-none object-contain sm:block"
        draggable={false}
        style={{
          width: "clamp(805px, 67.6vw, 1378px)",
          right: "clamp(-620px, -27vw, -430px)",
          top: "clamp(-48px, -1vw, 8px)",
          filter: "none",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(90deg, var(--app-bg) 0%, rgba(0,0,0,0.82) 28%, rgba(0,0,0,0.22) 58%, transparent 82%)"
              : "linear-gradient(90deg, var(--app-bg) 0%, rgba(245,243,239,0.86) 34%, rgba(245,243,239,0.4) 62%, transparent 86%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-8 top-24 z-10 hidden uppercase sm:block sm:left-12 lg:left-16 xl:left-20"
        style={{ fontSize: "0.55rem", letterSpacing: "0.3em", fontWeight: 700, color: "var(--fg-3)" }}
      >
        <span className="block">{clock.slice(0, 8)}</span>
        <span className="mt-1 block">{clock.slice(9)}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex min-h-[calc(100vh-10rem)] w-full max-w-[820px] flex-col justify-center lg:ml-10 xl:ml-16 2xl:ml-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mb-5 flex items-center gap-4 uppercase"
          style={{ color: "var(--fg-3)" }}
        >
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.28em", fontWeight: 700 }}>{t("hero.eyebrow")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[650px]"
          style={{
            fontSize: "clamp(3rem, 4.8vw, 4.75rem)",
            lineHeight: 0.98,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "var(--fg-1)",
          }}
        >
          {titleLines.map((line, index) => {
            const normalizedLine = line.replace(/[.!?。]+$/u, "");
            const words = normalizedLine.split(" ");
            const hasWords = words.length > 1;
            const mutedCount = Math.min(2, words.length);
            const muted = words.slice(0, mutedCount).join(" ");
            const rest = words.slice(mutedCount).join(" ");
            const isLastLine = index === titleLines.length - 1;
            const lastWord = words[words.length - 1] ?? "";
            const beforeLastWord = words.slice(0, -1).join(" ");

            return (
              <span
                key={line + index}
                className="block"
                style={{
                  transform:
                    index === 1
                      ? "translateX(clamp(1.85rem, 4.2vw, 4.9rem))"
                      : index === 2
                        ? "translateX(clamp(0.35rem, 1.1vw, 1.15rem))"
                        : "none",
                }}
              >
                {index === 1 ? (
                  hasWords ? (
                    <>
                      <span style={{ opacity: theme === "dark" ? 0.66 : 0.58 }}>{muted}</span>
                      {rest ? ` ${rest}` : null}
                    </>
                  ) : (
                    <span style={{ opacity: theme === "dark" ? 0.66 : 0.58 }}>{normalizedLine}</span>
                  )
                ) : isLastLine && hasWords ? (
                  <>
                    {beforeLastWord}{" "}
                    <span
                      style={{
                        display: "inline-block",
                        opacity: 1,
                      }}
                    >
                      {lastWord}
                    </span>
                  </>
                ) : (
                  normalizedLine
                )}
              </span>
            );
          })}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[36rem]"
        >
          <p
            className="relative max-w-[31rem]"
            style={{ fontSize: "0.86rem", lineHeight: 1.68, letterSpacing: "0.01em", color: "var(--fg-3)" }}
          >
            <span className="mb-3 block h-px w-14" style={{ background: "var(--line-soft)" }} />
            {t("hero.subline")}
          </p>

          <p
            className="mt-4 max-w-[31rem] sm:ml-12"
            style={{
              fontSize: "0.82rem",
              lineHeight: 1.7,
              letterSpacing: "0.01em",
              color: "var(--fg-3)",
            }}
          >
            {t("hero.tagline")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.16 }}
          className="mt-9 flex w-full max-w-[28rem] flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <button
            onClick={() => {
              trackEvent("open_brief", { location: "hero_primary" });
              const el = document.getElementById("contact-form");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "instant" });
              }
            }}
            className="group relative flex w-full sm:w-auto justify-center px-7 sm:px-10 py-3.5 uppercase tracking-[0.22em] cursor-pointer overflow-hidden transition-all duration-500 rounded-xl hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontSize: "0.58rem",
              fontWeight: 800,
              background: "var(--cta-bg)",
              color: "var(--cta-fg)",
              boxShadow: `0 0 48px ${"var(--button-shadow)"}`,
            }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              {t("hero.cta.primary")}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-y-1"
              >
                <path
                  d="M6 1V11M6 11L2 7M6 11L10 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <button
            onClick={() => {
              trackEvent("click_cta", { location: "hero_secondary" });
              const el = document.getElementById("contact-form");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "instant" });
              }
            }}
            className="group relative flex w-full sm:w-auto justify-center px-7 sm:px-10 py-3.5 uppercase tracking-[0.22em] cursor-pointer overflow-hidden transition-all duration-500 rounded-xl"
            style={{
              fontSize: "0.58rem",
              fontWeight: 600,
              border: "1px solid var(--accent-border)",
              color: "var(--fg-2)",
              background: "transparent",
            }}
          >
            <span className="relative z-10">{t("hero.cta.secondary")}</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
