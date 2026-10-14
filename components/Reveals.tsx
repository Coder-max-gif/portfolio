"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Shared scroll reveals, driven by data attributes:
 *  [data-reveal]   fade + rise 24px
 *  [data-hairline] gold line draws left to right
 *  [data-img]      image settles from 1.12 -> 1.0
 */
export default function Reveals() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 1.2,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-hairline]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-img]").forEach((el) => {
        gsap.fromTo(el, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    });
    // Fonts/images can shift layout after load
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);
  return null;
}
