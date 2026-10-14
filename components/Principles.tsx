"use client";

import { useEffect, useRef } from "react";
import { principles } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** The one light "paper" section. Huge numbered rows; hovering one dims the rest. */
export default function Principles() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } });
        tl.fromTo(row.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut" })
          .from(row.querySelector("[data-num]"), { opacity: 0, x: -30, duration: 1.2 }, 0.2)
          .from(row.querySelector("[data-title]"), { yPercent: 110, duration: 1.2 }, 0.35);
        const desc = row.querySelector("[data-desc]");
        if (desc) tl.from(desc, { opacity: 0, duration: 1 }, 0.7);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="principles"
      ref={root}
      data-index="05 / Principles"
      className="relative bg-paper py-40 text-ink md:py-60"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-14">
        <p className="label mb-20 !text-bronze" data-reveal>The approach</p>
        <ol className="group/list">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-row
              className="relative py-10 transition-opacity duration-500 ease-expo group-hover/list:opacity-30 hover:!opacity-100 md:py-14"
            >
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 block h-px origin-left bg-bronze/50" />
              <div className="grid items-baseline gap-4 md:grid-cols-12">
                <span
                  data-num
                  className="display text-[clamp(4rem,10vw,10rem)] text-transparent [-webkit-text-stroke:1px_var(--color-bronze)] md:col-span-3"
                >
                  0{i + 1}
                </span>
                <div className="overflow-hidden pb-2 md:col-span-9">
                  <h3 data-title className="display text-[clamp(2.4rem,6vw,6.2rem)]">
                    {p.title.split(" over ")[0]} <em className="text-bronze">over</em> {p.title.split(" over ")[1]}
                  </h3>
                </div>
                {p.descriptor && (
                  <p data-desc className="prose-col text-ink/70 md:col-span-6 md:col-start-4">{p.descriptor}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
