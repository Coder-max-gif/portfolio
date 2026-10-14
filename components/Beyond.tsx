"use client";

import { useEffect, useRef } from "react";
import { beyond } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Pinned horizontal gallery. Panels are typographic until real photography lands in content.config. */
export default function Beyond() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      // slow inner parallax on each panel's image
      gsap.utils.toArray<HTMLElement>("[data-inner]").forEach((el) => {
        gsap.fromTo(el, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: el.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-index="08 / Beyond" className="relative overflow-hidden py-32 md:flex md:h-[100svh] md:items-center md:py-0">
      <div ref={track} className="flex flex-col gap-16 px-6 md:flex-row md:items-center md:gap-24 md:px-14 md:will-change-transform">
        <div className="shrink-0 md:w-[38vw]">
          <p className="label mb-8">{beyond.label}</p>
          <p className="display text-[clamp(2.2rem,4vw,4rem)]">
            Entrepreneurship is a <em className="text-gold">psychological</em> journey.
          </p>
          <p className="prose-col mt-10 text-ivory-dim">{beyond.body}</p>
        </div>

        {beyond.items.map((item, i) => (
          <figure key={item.caption} className={`relative shrink-0 md:w-[30vw] ${i % 2 ? "md:mt-32" : "md:-mt-24"}`}>
            <div className="relative">
            <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/50" />
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-inner src={item.src} alt={item.caption} loading="lazy" className="h-full w-[116%] max-w-none object-cover" />
              ) : (
                <div
                  data-inner
                  aria-hidden
                  className="flex h-full w-[116%] items-end p-8 [background:radial-gradient(70%_60%_at_35%_30%,rgba(201,169,110,0.22),transparent_70%),linear-gradient(160deg,#151922,#0A0C10)]"
                >
                  <span className="display text-[9rem] leading-none text-gold/10">0{i + 1}</span>
                </div>
              )}
            </div>
            </div>
            <figcaption className="mt-6 flex items-baseline gap-4">
              <span className="font-display text-gold">0{i + 1}</span>
              <span className="display text-3xl">{item.caption}</span>
            </figcaption>
          </figure>
        ))}
        <div aria-hidden className="hidden w-[8vw] shrink-0 md:block" />
      </div>
    </section>
  );
}
