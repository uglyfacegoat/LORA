import { useEffect, useRef } from "react";
import { useTheme } from "../theme";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      cx += (x - cx) * 0.06;
      cy += (y - cy) * 0.06;
      el.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[1] hidden md:block"
      style={{
        width: 500,
        height: 500,
        background:
          theme === "dark"
            ? "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 55%)"
            : "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 55%)",
        willChange: "transform",
        top: 0,
        left: 0,
      }}
    />
  );
}
