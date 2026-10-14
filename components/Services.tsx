"use client";

import { useEffect, useRef } from "react";
import { services } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Asymmetric placement: [grid classes, parallax speed]
const layout: [string, number][] = [
  ["md:col-span-6 md:col-start-1 md:mt-0", 0.9],
  ["md:col-span-5 md:col-start-8 md:mt-40", 1.1],
  ["md:col-span-5 md:col-start-2 md:-mt-10", 1.0],
  ["md:col-span-6 md:col-start-7 md:mt-24", 0.9],
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0% round 20px)" },
          { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.4, delay: (i % 2) * 0.15, scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
        const speed = layout[i][1];
        if (speed !== 1 && window.innerWidth >= 768) {
          gsap.to(el, {
            yPercent: (1 - speed) * 60,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="work" ref={root} data-index="04 / Work" className="relative mx-auto max-w-[1280px] px-6 py-40 md:px-14 md:py-56">
      <div className="mb-24 md:mb-32">
        <p className="label mb-8" data-reveal>{services.label}</p>
        <h2 data-reveal className="display max-w-[14ch] text-[clamp(2.6rem,6vw,6rem)]">
          Credibility, capital and <em className="text-gold">connections</em>.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-12 md:gap-x-8">
        {services.items.map((s, i) => (
          <article
            key={s.title}
            data-panel
            onPointerMove={track}
            className={`glass glass-light group p-8 md:p-12 ${layout[i][0]}`}
          >
            <div className="transition-transform duration-500 ease-expo group-hover:-translate-y-1">
              <span className="font-display text-xl text-gold">0{i + 1}</span>
              <h3 className="display mt-14 text-[clamp(2rem,3.4vw,3.2rem)]">{s.title}</h3>
              <p className="mt-5 max-w-[34ch] text-ivory-dim">{s.body}</p>
            </div>
          </article>
        ))}
      </div>

      <p data-reveal className="prose-col mt-28 font-display text-2xl italic leading-snug text-ivory/80 md:ml-[42%] md:text-3xl">
        {services.supporting}
      </p>
    </section>
  );
}
