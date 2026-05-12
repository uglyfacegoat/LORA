import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import logoLargeDark from "../../assets/logo-large-dark.svg";
import logoSmallDark from "../../assets/logo-small-dark.svg";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";

const FIELD_STARS = Array.from({ length: 92 }, (_, index) => ({
  left: (index * 37) % 100,
  top: 4 + ((index * 23) % 86),
  size: index % 11 === 0 ? 2.2 : index % 7 === 0 ? 1.5 : 0.9,
  opacity: index % 9 === 0 ? 0.76 : index % 5 === 0 ? 0.48 : 0.28,
}));

function scrollToContact() {
  const el = document.getElementById("contact-form");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "instant" });
}

export function HeroSectionReference() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const [clock, setClock] = useState("");

  const heroText = useMemo(
    () =>
      "Мы проектируем системы конверсии: точки входа, посадочные страницы, приложения, CRM системы, аналитические приложения и digital продукты, которые превращают ваш трафик в предсказуемую и масштабируемую выручку.",
    [],
  );

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      const s = d.getSeconds().toString().padStart(2, "0");
      setClock(`${h}:${m}:${s}`);
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="hero-ref" aria-label="LORA reference hero">
      <style>{`
        .hero-ref {
          --ref-white: rgba(255,255,255,0.94);
          --ref-muted: rgba(255,255,255,0.48);
          --ref-faint: rgba(255,255,255,0.2);
          position: relative;
          min-height: 100svh;
          height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 9%, rgba(255,255,255,0.13), transparent 19rem),
            radial-gradient(circle at 8% 78%, rgba(255,255,255,0.055), transparent 16rem),
            radial-gradient(circle at 91% 84%, rgba(255,255,255,0.06), transparent 15rem),
            #000;
          color: #fff;
          isolation: isolate;
        }
        .hero-ref::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 50% 45%, transparent 0 38%, rgba(255,255,255,0.018) 39%, transparent 41%),
            radial-gradient(circle, rgba(255,255,255,0.09) 0 0.7px, transparent 0.9px);
          background-size: 100% 100%, 6px 6px;
          opacity: 0.28;
          mix-blend-mode: screen;
        }
        .hero-ref::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 9;
          pointer-events: none;
          background:
            linear-gradient(to bottom, rgba(0,0,0,0.24), transparent 18%, transparent 72%, rgba(0,0,0,0.3)),
            radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.48) 100%);
        }
        .hero-ref__star {
          position: absolute;
          z-index: 2;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 11px rgba(255,255,255,0.45);
        }
        .hero-ref__nav {
          position: absolute;
          inset: 36px 64px auto;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .hero-ref__brand,
        .hero-ref__actions,
        .hero-ref__brand-lockup {
          display: flex;
          align-items: center;
        }
        .hero-ref__brand {
          gap: 42px;
        }
        .hero-ref__brand-lockup {
          gap: 14px;
        }
        .hero-ref__brand img {
          display: block;
          width: 34px;
          height: 34px;
        }
        .hero-ref__brand-name {
          font-size: 26px;
          line-height: 1;
          font-weight: 850;
          letter-spacing: -0.045em;
        }
        .hero-ref__agency {
          color: var(--ref-muted);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.54em;
          white-space: nowrap;
        }
        .hero-ref__actions {
          gap: 18px;
        }
        .hero-ref__mini-button,
        .hero-ref__contact-top,
        .hero-ref__button {
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.025);
          color: #fff;
          cursor: pointer;
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
        }
        .hero-ref__mini-button:hover,
        .hero-ref__contact-top:hover,
        .hero-ref__button:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.48);
          background: rgba(255,255,255,0.055);
        }
        .hero-ref__mini-button {
          height: 48px;
          min-width: 48px;
          padding: 0 16px;
          border-radius: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }
        .hero-ref__contact-top {
          height: 52px;
          padding: 0 32px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 850;
          letter-spacing: 0.34em;
        }
        .hero-ref__center {
          position: relative;
          z-index: 14;
          min-height: 100%;
          width: 100%;
          display: grid;
          place-items: center;
          padding: 145px 32px 72px;
          text-align: center;
        }
        .hero-ref__content {
          position: relative;
          width: min(900px, 62vw);
          margin-top: 44px;
        }
        .hero-ref__kicker {
          margin-bottom: 82px;
          color: rgba(255,255,255,0.42);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.58em;
        }
        .hero-ref__logo {
          display: block;
          width: min(840px, 48vw);
          margin: 0 auto;
          filter: drop-shadow(0 0 24px rgba(255,255,255,0.22));
          user-select: none;
          pointer-events: none;
        }
        .hero-ref__copy {
          width: min(680px, 46vw);
          margin: 34px auto 0;
          color: rgba(255,255,255,0.56);
          font-size: 22px;
          line-height: 1.55;
          letter-spacing: -0.02em;
        }
        .hero-ref__buttons {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-top: 82px;
        }
        .hero-ref__button {
          width: 416px;
          height: 82px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          font-size: 17px;
          font-weight: 850;
          letter-spacing: 0.42em;
          text-transform: uppercase;
        }
        .hero-ref__button--primary {
          background: #fff;
          border-color: #fff;
          color: #050505;
          box-shadow: 0 0 55px rgba(255,255,255,0.24);
        }
        .hero-ref__button--primary:hover {
          background: #fff;
          color: #000;
        }
        .hero-ref__space {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }
        .hero-ref__eclipse {
          position: absolute;
          top: 122px;
          left: 50%;
          width: min(770px, 47vw);
          aspect-ratio: 1;
          transform: translateX(-50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 47%, #020202 0 58%, rgba(255,255,255,0.14) 58.4%, rgba(255,255,255,0.78) 59.1%, rgba(255,255,255,0.08) 60%, transparent 62%),
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 42%);
          box-shadow:
            0 -21px 58px rgba(255,255,255,0.62),
            0 -4px 16px rgba(255,255,255,0.8),
            inset 0 0 90px rgba(255,255,255,0.035);
          opacity: 0.93;
        }
        .hero-ref__eclipse::before {
          content: "";
          position: absolute;
          inset: -86px;
          border-radius: inherit;
          background: radial-gradient(circle, rgba(255,255,255,0.16), rgba(255,255,255,0.055) 23%, transparent 58%);
          filter: blur(22px);
          opacity: 0.7;
        }
        .hero-ref__orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(1440px, 86vw);
          height: min(300px, 19vw);
          border: 1px solid rgba(255,255,255,0.32);
          border-radius: 50%;
          transform: translate(-50%, -34%) rotate(-10deg);
          opacity: 0.64;
          box-shadow: 0 0 28px rgba(255,255,255,0.04);
        }
        .hero-ref__orbit--back {
          width: min(1220px, 74vw);
          height: min(250px, 16vw);
          transform: translate(-50%, -28%) rotate(-10deg);
          border-color: rgba(255,255,255,0.16);
          opacity: 0.56;
        }
        .hero-ref__spark {
          position: absolute;
          z-index: 5;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 22px rgba(255,255,255,0.9);
        }
        .hero-ref__spark::before,
        .hero-ref__spark::after {
          content: "";
          position: absolute;
          inset: 50% auto auto 50%;
          background: #fff;
          transform: translate(-50%, -50%);
        }
        .hero-ref__spark::before {
          width: 34px;
          height: 1px;
        }
        .hero-ref__spark::after {
          width: 1px;
          height: 34px;
        }
        .hero-ref__spark--one { left: 73%; top: 32%; }
        .hero-ref__spark--two { left: 26%; top: 68%; transform: scale(0.75); }
        .hero-ref__spark--three { left: 78%; top: 61%; transform: scale(0.55); }
        .hero-ref__hud {
          position: absolute;
          z-index: 16;
          color: var(--ref-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.22em;
          pointer-events: none;
        }
        .hero-ref__hud--time {
          top: 198px;
          left: 64px;
          font-size: 14px;
          line-height: 1.7;
        }
        .hero-ref__hud--coords {
          top: 196px;
          right: 64px;
          text-align: right;
          font-size: 14px;
          line-height: 1.7;
        }
        .hero-ref__hud--left-note {
          left: 272px;
          bottom: 116px;
          width: 310px;
          font-size: 13px;
          line-height: 1.65;
          text-align: left;
        }
        .hero-ref__hud--left-note strong {
          display: block;
          margin-top: 24px;
          color: rgba(255,255,255,0.52);
          font-size: 12px;
          letter-spacing: 0.36em;
        }
        .hero-ref__hud--right-note {
          right: 208px;
          top: 54%;
          font-size: 13px;
          line-height: 1.45;
          text-align: left;
        }
        .hero-ref__analytics {
          right: 66px;
          bottom: 100px;
          display: grid;
          grid-template-columns: 1fr 1px 18px;
          gap: 20px;
          align-items: stretch;
          font-size: 13px;
          line-height: 2.15;
          text-align: right;
        }
        .hero-ref__analytics-line {
          width: 1px;
          background: rgba(255,255,255,0.42);
          box-shadow: 0 0 20px rgba(255,255,255,0.42);
        }
        .hero-ref__analytics-ticks {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .hero-ref__analytics-ticks span {
          width: 12px;
          height: 1px;
          background: rgba(255,255,255,0.45);
        }
        .hero-ref__radar {
          position: absolute;
          z-index: 16;
          left: 64px;
          bottom: 70px;
          width: 172px;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.17);
          background:
            radial-gradient(circle, rgba(255,255,255,0.82) 0 4px, transparent 5px),
            repeating-radial-gradient(circle, transparent 0 27px, rgba(255,255,255,0.13) 28px 29px),
            linear-gradient(90deg, transparent calc(50% - 0.5px), rgba(255,255,255,0.13) calc(50% - 0.5px) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
            linear-gradient(0deg, transparent calc(50% - 0.5px), rgba(255,255,255,0.13) calc(50% - 0.5px) calc(50% + 0.5px), transparent calc(50% + 0.5px));
          opacity: 0.82;
        }
        .hero-ref__plus {
          position: absolute;
          z-index: 16;
          width: 18px;
          height: 18px;
          color: rgba(255,255,255,0.38);
        }
        .hero-ref__plus::before,
        .hero-ref__plus::after {
          content: "";
          position: absolute;
          background: currentColor;
        }
        .hero-ref__plus::before {
          left: 8px;
          top: 0;
          width: 1px;
          height: 18px;
        }
        .hero-ref__plus::after {
          top: 8px;
          left: 0;
          width: 18px;
          height: 1px;
        }
        .hero-ref__plus--a { left: 64px; top: 132px; }
        .hero-ref__plus--b { right: 64px; top: 132px; }
        .hero-ref__plus--c { left: 64px; bottom: 256px; }
        .hero-ref__plus--d { right: 64px; bottom: 72px; }
        .hero-ref__scanline {
          position: absolute;
          z-index: 4;
          left: 50%;
          bottom: 77px;
          width: 86%;
          height: 1px;
          transform: translateX(-50%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          opacity: 0.45;
        }
        @media (max-width: 1280px) {
          .hero-ref__nav { inset-inline: 32px; }
          .hero-ref__hud--left-note,
          .hero-ref__radar,
          .hero-ref__analytics,
          .hero-ref__hud--right-note { display: none; }
          .hero-ref__button { width: 320px; }
        }
        @media (max-width: 820px) {
          .hero-ref {
            height: auto;
            min-height: 100svh;
          }
          .hero-ref__nav {
            inset: 24px 18px auto;
          }
          .hero-ref__agency,
          .hero-ref__mini-button:first-child,
          .hero-ref__hud,
          .hero-ref__plus,
          .hero-ref__radar {
            display: none;
          }
          .hero-ref__brand { gap: 0; }
          .hero-ref__brand-name { font-size: 22px; }
          .hero-ref__brand img { width: 30px; height: 30px; }
          .hero-ref__contact-top { display: none; }
          .hero-ref__center { padding: 118px 18px 52px; }
          .hero-ref__content { width: 100%; margin-top: 0; }
          .hero-ref__eclipse {
            top: 122px;
            width: min(620px, 96vw);
          }
          .hero-ref__orbit {
            width: 116vw;
            height: 30vw;
            top: 42%;
          }
          .hero-ref__kicker {
            margin-bottom: 56px;
            font-size: 11px;
            letter-spacing: 0.42em;
          }
          .hero-ref__logo {
            width: min(92vw, 560px);
          }
          .hero-ref__copy {
            width: min(94vw, 560px);
            font-size: 16px;
            line-height: 1.55;
          }
          .hero-ref__buttons {
            width: min(94vw, 420px);
            margin-inline: auto;
            margin-top: 48px;
            flex-direction: column;
            gap: 14px;
          }
          .hero-ref__button {
            width: 100%;
            height: 62px;
            border-radius: 14px;
            font-size: 12px;
            letter-spacing: 0.3em;
          }
        }
      `}</style>

      {FIELD_STARS.map((star, index) => (
        <span
          className="hero-ref__star"
          key={index}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      <header className="hero-ref__nav">
        <div className="hero-ref__brand">
          <div className="hero-ref__brand-lockup">
            <img src={logoSmallDark} alt="" draggable={false} />
            <span className="hero-ref__brand-name">LORA</span>
          </div>
          <span className="hero-ref__agency">СИСТЕМНОЕ АГЕНТСТВО</span>
        </div>

        <div className="hero-ref__actions">
          <button className="hero-ref__mini-button" type="button" aria-label="Language">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
              <path d="M1.75 8h12.5M8 1.75c2.1 2.35 2.1 10.15 0 12.5M8 1.75c-2.1 2.35-2.1 10.15 0 12.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
            </svg>
            RU
          </button>
          <button className="hero-ref__mini-button" type="button" onClick={toggle} aria-label={t("nav.themeAria")}>
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M14.8 10.8A5.9 5.9 0 0 1 7.2 3.2 6.5 6.5 0 1 0 14.8 10.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <button className="hero-ref__contact-top" type="button" onClick={scrollToContact}>
            СВЯЗАТЬСЯ
          </button>
        </div>
      </header>

      <div className="hero-ref__space" aria-hidden="true">
        <div className="hero-ref__eclipse" />
        <div className="hero-ref__orbit hero-ref__orbit--back" />
        <div className="hero-ref__orbit" />
        <span className="hero-ref__spark hero-ref__spark--one" />
        <span className="hero-ref__spark hero-ref__spark--two" />
        <span className="hero-ref__spark hero-ref__spark--three" />
        <span className="hero-ref__scanline" />
      </div>

      <span className="hero-ref__plus hero-ref__plus--a" aria-hidden="true" />
      <span className="hero-ref__plus hero-ref__plus--b" aria-hidden="true" />
      <span className="hero-ref__plus hero-ref__plus--c" aria-hidden="true" />
      <span className="hero-ref__plus hero-ref__plus--d" aria-hidden="true" />

      <div className="hero-ref__hud hero-ref__hud--time">
        <div>{clock}</div>
        <div>GMT+03:00</div>
      </div>
      <div className="hero-ref__hud hero-ref__hud--coords">
        <div>LORA_v04.26</div>
        <div>N 40.7128 / W 74.0060</div>
      </div>
      <div className="hero-ref__hud hero-ref__hud--right-note">
        DIGITAL GROWTH
        <br />
        ARCHITECTS
      </div>
      <div className="hero-ref__radar" aria-hidden="true" />
      <div className="hero-ref__hud hero-ref__hud--left-note">
        WE DESIGN SYSTEMS
        <br />
        THAT TURN TRAFFIC
        <br />
        INTO PREDICTABLE
        <br />
        REVENUE.
        <strong>SCALABLE. PRECISE. RELIABLE.</strong>
      </div>
      <div className="hero-ref__hud hero-ref__analytics">
        <div>
          ANALYTICS
          <br />
          UX / UI
          <br />
          CRM SYSTEMS
          <br />
          AUTOMATION
          <br />
          GROWTH
        </div>
        <span className="hero-ref__analytics-line" />
        <div className="hero-ref__analytics-ticks">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="hero-ref__center">
        <motion.div
          className="hero-ref__content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-ref__kicker">LEAVE OLD RULES AHEAD</div>
          <img className="hero-ref__logo" src={logoLargeDark} alt="LORA" draggable={false} />
          <p className="hero-ref__copy">{heroText}</p>
          <div className="hero-ref__buttons">
            <button className="hero-ref__button hero-ref__button--primary" type="button" onClick={scrollToContact}>
              ПОЛУЧИТЬ РАЗБОР
              <span aria-hidden="true">↗</span>
            </button>
            <button className="hero-ref__button" type="button" onClick={scrollToContact}>
              СВЯЗАТЬСЯ
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
