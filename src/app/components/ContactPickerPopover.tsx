import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type ContactPickerPopoverProps = {
  anchorRect: DOMRect | null;
  maxHeight: number;
  open: boolean;
  triggerSelector: string;
  width: number;
  onClose: () => void;
  children: ReactNode;
};

export function useContactPickerDismiss(open: boolean, onClose: () => void, triggerSelector: string) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const onClick = (event: MouseEvent) => {
      if (!popoverRef.current) return;
      const target = event.target as HTMLElement;
      if (popoverRef.current.contains(target)) return;
      if (target.closest?.(triggerSelector)) return;
      onClose();
    };

    const closeOnViewportChange = () => onClose();

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("scroll", closeOnViewportChange);
    window.addEventListener("resize", closeOnViewportChange);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("scroll", closeOnViewportChange);
      window.removeEventListener("resize", closeOnViewportChange);
    };
  }, [open, onClose, triggerSelector]);

  return popoverRef;
}

export function ContactPickerPopover({
  anchorRect,
  children,
  maxHeight,
  open,
  triggerSelector,
  width,
  onClose,
}: ContactPickerPopoverProps) {
  const popoverRef = useContactPickerDismiss(open, onClose, triggerSelector);

  if (!open || !anchorRect) return null;

  const popoverWidth = Math.min(width, window.innerWidth - 32);

  return (
    <AnimatePresence>
      <motion.div
        ref={popoverRef}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.99 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[70] rounded-3xl p-3"
        style={{
          top: Math.min(anchorRect.bottom + 8, window.innerHeight - maxHeight),
          left: Math.max(16, Math.min(anchorRect.left, window.innerWidth - popoverWidth - 16)),
          width: popoverWidth,
          background: "var(--app-bg)",
          border: "1px solid var(--modal-border)",
          boxShadow: "0 24px 90px rgba(0,0,0,0.16)",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
