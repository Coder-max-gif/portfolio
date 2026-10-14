"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "dark" | "ghost";
  className?: string;
  disabled?: boolean;
  external?: boolean;
};

/** Pill button. On a mouse: magnetic pull + fill that grows from the cursor. On touch: a soft press. */
export default function MagneticButton({ children, href, type = "button", variant = "dark", className = "", disabled, external }: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    ref.current.style.setProperty("--bx", `${px}px`);
    ref.current.style.setProperty("--by", `${py}px`);
    x.set((px / r.width - 0.5) * 18);
    y.set((py / r.height - 0.5) * 14);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const common = {
    onPointerMove: move,
    onPointerEnter: move,
    onPointerLeave: leave,
    whileTap: { scale: 0.96 },
    style: { x, y },
    className: `btn btn-${variant} ${className}`,
  };

  return href ? (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      {...common}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type={type} disabled={disabled} {...common}>
      {children}
    </motion.button>
  );
}
