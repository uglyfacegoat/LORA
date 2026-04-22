import { createElement, useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  iterations?: number;
  trigger?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%*";

export function ScrambleText({
  text,
  className,
  style,
  speed = 35,
  iterations = 6,
  trigger = true,
  as = "span",
}: Props) {
  const [out, setOut] = useState("");
  const fired = useRef(false);

  useEffect(() => {
    if (!trigger || fired.current) return;
    fired.current = true;

    let revealed = 0;
    let iter = 0;
    const chars = text.split("");

    const step = () => {
      const next = chars
        .map((c, i) => {
          if (i < revealed) return c;
          if (c === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOut(next);

      iter++;
      if (iter >= iterations) {
        iter = 0;
        revealed++;
      }
      if (revealed <= chars.length) {
        setTimeout(step, speed);
      } else {
        setOut(text);
      }
    };

    step();
  }, [trigger, text, speed, iterations]);

  return createElement(as, { className, style }, out || text.replace(/./g, " "));
}
