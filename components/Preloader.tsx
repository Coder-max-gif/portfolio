"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Gold hairline draws, name fades in, screen lifts away. Once per session, 2.2s max. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      setDone(true);
      window.dispatchEvent(new Event("intro:done"));
    };
    if (sessionStorage.getItem("lc-intro") || prefersReducedMotion()) {
      (window as unknown as { __introDone?: boolean }).__introDone = true;
      finish();
      return;
    }
    sessionStorage.setItem("lc-intro", "1");
    const tl = gsap.timeline({
      onComplete: () => {
        (window as unknown as { __introDone?: boolean }).__introDone = true;
        finish();
      },
    });
    tl.fromTo("[data-pl-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" })
      .fromTo("[data-pl-text]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power3.inOut" }, "+=0.15");
    return () => { tl.kill(); };
  }, []);

  if (done) return null;
  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <span data-pl-line className="block h-px w-[min(40vw,320px)] origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
      <span data-pl-text className="label opacity-0">Lighthouse Capital</span>
    </div>
  );
}
