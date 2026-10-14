"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  strength?: number;
};

/** Pill button: magnetic pull (8-12px) + gold fill that grows from the cursor point. */
export default function MagneticButton({ children, href, type = "button", className = "", disabled, strength = 10 }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--bx", `${x}px`);
    el.style.setProperty("--by", `${y}px`);
    gsap.to(el, {
      x: ((x - r.width / 2) / r.width) * strength * 2,
      y: ((y - r.height / 2) / r.height) * strength * 2,
      duration: 0.6,
    });
  };
  const enter = (e: React.PointerEvent) => move(e);
  const leave = () => ref.current && gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.6)" });

  const props = { ref, onPointerMove: move, onPointerEnter: enter, onPointerLeave: leave, className: `btn ${className}` };
  return href ? (
    <a href={href} {...props}>{children}</a>
  ) : (
    <button type={type} disabled={disabled} {...props}>{children}</button>
  );
}
