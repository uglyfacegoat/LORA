import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

export function ContactSection() {
  const [ref, inView] = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { t } = useI18n();

  const fields = [
    { name: "name", placeholder: t("contact.name"), type: "text",
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="3" stroke="currentColor" strokeWidth="1"/><path d="M1 13C1 10 3.5 8 7 8C10.5 8 13 10 13 13" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: "phone", placeholder: t("contact.phone"), type: "tel",
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="1" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1"/><line x1="6" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: "email", placeholder: t("contact.email"), type: "email",
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M1 3L7 8L13 3" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: "company", placeholder: t("contact.company"), type: "text", optional: true,
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1"/><path d="M5 7H9M5 10H9M5 3V1H9V3" stroke="currentColor" strokeWidth="1"/></svg> },
  ];

  const fieldBox = (field: typeof fields[number]) => {
    const isFocused = focused === field.name;
    return (
      <div
        key={field.name}
        className="relative rounded-xl transition-all duration-300"
        style={{
          background: isFocused ? "var(--surface-mid)" : "var(--surface-soft)",
          border: `1px solid ${isFocused ? "var(--accent-border)" : "var(--surface-border)"}`,
        }}
      >
        <div className="flex items-center px-4 gap-3">
          <span className="shrink-0 transition-colors" style={{ color: isFocused ? "var(--fg-2)" : "var(--fg-4)" }}>
            {field.icon}
          </span>
          <input
            type={field.type}
            placeholder={field.placeholder}
            required={!field.optional}
            onFocus={() => setFocused(field.name)}
            onBlur={() => setFocused(null)}
            className="w-full bg-transparent py-4 px-0 outline-none"
            style={{ fontSize: "0.9rem", color: "var(--fg-1)", border: "none" }}
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={ref} id="contact" className="relative py-32 md:py-44 px-6 md:px-20">
      <SectionLabel word="CONNECT" />
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--surface-mid), transparent 55%)" }} />

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6 relative">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-white/40 uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {t("contact.eyebrow")}
          </span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 relative"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "var(--fg-1)" }}>
          {t("contact.title")}
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="mb-12 relative max-w-md"
          style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
          {t("contact.sub")}
        </motion.p>

        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden text-center py-20 rounded-3xl"
            style={{ border: "1px solid var(--surface-border)", background: "var(--surface-soft)" }}>
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: "var(--fg-1)", color: "var(--app-bg)" }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="uppercase tracking-[0.3em]" style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--fg-1)" }}>{t("contact.ok.t")}</p>
              <p className="mt-3" style={{ fontSize: "0.9rem", color: "var(--fg-3)" }}>{t("contact.ok.s")}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-3xl p-6 md:p-10 overflow-hidden"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--surface-border)",
              boxShadow: "0 40px 120px -40px var(--surface-strong)",
            }}>
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--fg-2), transparent)" }} />

            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "#10b981", opacity: 0.5 }} />
                  <span className="relative rounded-full w-2 h-2" style={{ background: "#10b981" }} />
                </span>
                <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-2)" }}>
                  {t("contact.slot")}
                </span>
              </div>
              <span className="px-3 py-1.5 rounded-lg uppercase"
                style={{ fontSize: "0.52rem", letterSpacing: "0.22em", fontWeight: 700,
                  background: "var(--surface-mid)", border: "1px solid var(--surface-border)", color: "var(--fg-3)" }}>
                {t("contact.spots")}
              </span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid md:grid-cols-2 gap-3 mb-3">{fields.slice(0, 2).map(fieldBox)}</div>
              <div className="space-y-3">{fields.slice(2).map(fieldBox)}</div>

              <button type="submit"
                className="w-full mt-5 py-5 uppercase tracking-[0.3em] cursor-pointer relative overflow-hidden transition-all duration-500 rounded-xl hover:scale-[1.005] active:scale-[0.995]"
                style={{ fontSize: "0.72rem", fontWeight: 800, background: "var(--fg-1)", color: "var(--app-bg)",
                  boxShadow: "0 20px 60px -20px var(--surface-strong)" }}>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t("contact.submit")}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <p className="text-center mt-5 uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.25em", fontWeight: 600, color: "var(--fg-4)" }}>
                {t("contact.guarantee")}
              </p>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
