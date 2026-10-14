"use client";

import { useEffect, useRef } from "react";
import { beliefs } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Three full-screen statements; words light up one by one as you scroll. */
export default function Beliefs() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-belief]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-index="07 / Beliefs" className="relative">
      {beliefs.map((b, i) => (
        <div key={i} className="flex min-h-[100svh] items-center px-6 md:px-14">
          <p
            data-belief
            className={`display mx-auto max-w-[1280px] text-[clamp(2.6rem,7vw,7.6rem)] ${
              i === 1 ? "text-center" : i === 2 ? "md:pl-[16%]" : "md:pr-[20%]"
            }`}
          >
            {b.text.split(" ").map((w, j) => (
              <span key={j} data-word className={`inline-block pr-[0.25em] ${w === b.key ? "italic text-gold" : ""}`}>
                {w}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  );
}
