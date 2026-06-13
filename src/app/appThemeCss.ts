export const appThemeCss = `
  :root, [data-theme="dark"] {
    --app-bg: #000;
    --fg-1: #fff;
    --fg-2: rgba(255,255,255,0.56);
    --fg-3: rgba(255,255,255,0.34);
    --fg-4: rgba(255,255,255,0.22);
    --fg-5: rgba(255,255,255,0.14);
    --surface-soft: rgba(255,255,255,0.02);
    --surface-mid: rgba(255,255,255,0.04);
    --surface-strong: rgba(255,255,255,0.08);
    --surface-border: rgba(255,255,255,0.06);
    --accent-soft: rgba(255,255,255,0.08);
    --accent-strong: rgba(255,255,255,0.15);
    --accent-border: rgba(255,255,255,0.2);
    --line-soft: rgba(255,255,255,0.2);
    --line-mid: rgba(255,255,255,0.12);
    --line-strong: rgba(255,255,255,0.4);
    --glow-soft: rgba(255,255,255,0.04);
    --glow-mid: rgba(255,255,255,0.08);
    --shadow-soft: rgba(255,255,255,0.1);
    --button-shadow: rgba(255,255,255,0.2);
    --icon-stroke: rgba(255,255,255,0.4);
    --icon-stroke-soft: rgba(255,255,255,0.12);
    --terminal-live: rgba(120,255,150,0.6);
    --terminal-live-glow: rgba(120,255,150,0.3);
    --modal-bg: rgba(12,12,12,0.9);
    --modal-border: rgba(255,255,255,0.08);
    --cta-bg: #fff;
    --cta-fg: #000;
    --nav-bg-scrolled: rgba(0,0,0,0.75);
    --nav-border: rgba(255,255,255,0.04);
  }
  [data-theme="light"] {
    --color-white: oklch(0.18 0 0);
    --color-black: oklch(0.97 0.005 90);
    --app-bg: #f5f3ef;
    --fg-1: #0a0a0a;
    --fg-2: rgba(10,10,10,0.6);
    --fg-3: rgba(10,10,10,0.42);
    --fg-4: rgba(10,10,10,0.29);
    --fg-5: rgba(10,10,10,0.19);
    --surface-soft: rgba(10,10,10,0.008);
    --surface-mid: rgba(10,10,10,0.018);
    --surface-strong: rgba(10,10,10,0.04);
    --surface-border: rgba(10,10,10,0.12);
    --accent-soft: rgba(10,10,10,0.02);
    --accent-strong: rgba(10,10,10,0.07);
    --accent-border: rgba(10,10,10,0.24);
    --line-soft: rgba(10,10,10,0.24);
    --line-mid: rgba(10,10,10,0.16);
    --line-strong: rgba(10,10,10,0.38);
    --glow-soft: rgba(10,10,10,0.022);
    --glow-mid: rgba(10,10,10,0.05);
    --shadow-soft: rgba(10,10,10,0.06);
    --button-shadow: rgba(10,10,10,0.14);
    --icon-stroke: rgba(10,10,10,0.5);
    --icon-stroke-soft: rgba(10,10,10,0.22);
    --terminal-live: rgba(18,122,66,0.7);
    --terminal-live-glow: rgba(18,122,66,0.24);
    --modal-bg: rgba(245,243,239,0.94);
    --modal-border: rgba(10,10,10,0.08);
    --cta-bg: #0a0a0a;
    --cta-fg: #f5f3ef;
    --nav-bg-scrolled: rgba(245,243,239,0.8);
    --nav-border: rgba(10,10,10,0.06);
  }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  html, body {
    overflow-x: clip;
    background: var(--app-bg);
    scrollbar-width: thin;
    scrollbar-color: var(--line-strong) var(--surface-soft);
  }
  html { scroll-behavior: auto; }
  *::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  *::-webkit-scrollbar-track {
    background: var(--surface-soft);
  }
  *::-webkit-scrollbar-thumb {
    background: var(--line-strong);
    border-radius: 999px;
    border: 2px solid var(--app-bg);
  }
  *::-webkit-scrollbar-thumb:hover {
    background: var(--fg-3);
  }
  ::selection { background: rgba(125,125,125,0.25); color: var(--fg-1); }
  @media (max-width: 480px) {
    html {
      font-size: 15px;
    }
  }
`;
