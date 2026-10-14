"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** 8px gold dot + 40px ring that grows over interactive items. Desktop only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.6, ease: "expo.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.6, ease: "expo.out" });

    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4, overwrite: "auto" });
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, input, textarea, select, label, [data-cursor]");
      gsap.to(ring.current, { scale: hit ? 1.8 : 1, borderColor: hit ? "rgba(201,169,110,0.9)" : "rgba(201,169,110,0.45)", duration: 0.4 });
      gsap.to(dot.current, { scale: hit ? 0.5 : 1, duration: 0.4 });
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.4 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  const base = "pointer-events-none fixed left-0 top-0 z-[80] rounded-full opacity-0 hidden [@media(hover:hover)_and_(pointer:fine)]:block";
  return (
    <>
      <div ref={ring} aria-hidden className={`${base} -ml-5 -mt-5 h-10 w-10 border border-gold/45`} />
      <div ref={dot} aria-hidden className={`${base} -ml-1 -mt-1 h-2 w-2 bg-gold`} />
    </>
  );
}
