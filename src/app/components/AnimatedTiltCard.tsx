import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { TiltCard } from "./TiltCard";

type AnimatedTiltCardProps = {
  inView: boolean;
  delay: number;
  wrapperClassName: string;
  cardClassName: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function AnimatedTiltCard({
  inView,
  delay,
  wrapperClassName,
  cardClassName,
  style,
  children,
}: AnimatedTiltCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={wrapperClassName}
    >
      <TiltCard className={cardClassName} style={style}>
        {children}
      </TiltCard>
    </motion.div>
  );
}
