"use client";

import { useEffect, useRef } from "react";
import { origin } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Pinned, Apple-style: one sentence per screen, scrubbed by scroll. */
export default function Origin() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
      gsap.set(lines, { opacity: 0, y: 40, filter: "blur(12px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * origin.length}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      lines.forEach((line, i) => {
        tl.to(line, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, i === 0 ? 0 : "-=0.5");
        if (i < lines.length - 1) {
          tl.to(line, { opacity: 0, y: -40, filter: "blur(8px)", duration: 1 }, "+=0.6");
          // background breathes between lines
          tl.to(root.current, { backgroundColor: i % 2 ? "#0A0C10" : "#0E1116", duration: 1 }, "<");
        } else {
          tl.to("[data-origin-beam]", { opacity: 1, duration: 1 }, "<");
        }
      });
      tl.to({}, { duration: 0.6 });
      tl.fromTo("[data-origin-progress]", { scaleY: 0 }, { scaleY: 1, duration: tl.duration() }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="origin"
      ref={root}
      data-index="02 / Origin"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink motion-reduce:h-auto motion-reduce:py-40"
    >
      <div aria-hidden className="absolute left-6 top-1/2 h-[40vh] w-px -translate-y-1/2 bg-ivory/10 md:left-14">
        <span data-origin-progress className="block h-full w-full origin-top bg-gold" />
      </div>
      <div
        data-origin-beam
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen [background:radial-gradient(40vmax_22vmax_at_50%_55%,rgba(201,169,110,0.16),transparent_70%)]"
      />

      {/* Reduced-motion / no-JS: lines stack as normal text */}
      <div className="relative grid w-full max-w-[1100px] place-items-center px-8">
        {origin.map((line, i) => {
          const isLast = i === origin.length - 1;
          return (
            <p
              key={line}
              data-line
              className={`display col-start-1 row-start-1 text-center text-ivory motion-reduce:row-auto motion-reduce:mb-16 ${
                isLast ? "text-[clamp(2.2rem,5.6vw,5.4rem)] italic" : "text-[clamp(2.6rem,7vw,7rem)]"
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
}
