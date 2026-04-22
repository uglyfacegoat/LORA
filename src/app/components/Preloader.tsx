import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import logoSmallDark from "../../assets/logo-small-dark.svg";
import logoSmallLight from "../../assets/logo-small-light.svg";
import { useTheme } from "../theme";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const logoSrc = theme === "dark" ? logoSmallDark : logoSmallLight;

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 2300);
    const t2 = setTimeout(() => onComplete(), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--app-bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={logoSrc} alt="LORA" width={130} height={130} className="block select-none" draggable={false} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
