"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { beyond } from "@/content.config";
import { ease } from "@/lib/motion";

/**
 * Swipeable rail. Native scroll-snap so it feels right under a thumb on iPhone/Android;
 * on desktop it can also be dragged with the mouse or stepped with the arrows.
 */
export default function Beyond() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };

  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, left: rail.current!.scrollLeft };
    rail.current!.style.scrollSnapType = "none";
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current) return;
    rail.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const up = () => {
    if (!drag.current) return;
    drag.current = null;
    rail.current!.style.scrollSnapType = "";
  };

  return (
    <section className="relative bg-night pb-28 text-cream md:pb-40" aria-label={beyond.label}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-6 !text-cream/60">{beyond.label}</p>
            <h2 className="headline max-w-[14ch] text-[clamp(2.4rem,5.6vw,5rem)]">
              Entrepreneurship is a <span className="serif font-normal italic text-[#D9BC86]">psychological</span> journey.
            </h2>
          </div>
          <div className={beyond.items.length > 2 ? "hidden gap-3 md:flex" : "hidden"}>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => step(d)}
                aria-label={d < 0 ? "Previous" : "Next"}
                className="grid h-12 w-12 place-items-center rounded-full border border-cream/25 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d={d < 0 ? "M10 3 L5 8 L10 13" : "M6 3 L11 8 L6 13"} stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.7] text-cream/70">{beyond.body}</p>
      </div>

      <div
        ref={rail}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 md:mt-20 md:cursor-grab md:px-[var(--rail-pad)] md:active:cursor-grabbing"
        style={{ scrollPaddingLeft: "var(--rail-pad, 1.5rem)", ["--rail-pad" as string]: "max(2rem, calc((100vw - 1200px) / 2 + 2rem))" }}
      >
        {beyond.items.map((item, i) => (
          <motion.figure
            key={item.caption}
            data-card
            className="relative w-[78vw] shrink-0 snap-start select-none sm:w-[46vw] md:w-[340px] lg:w-[380px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease, delay: i * 0.08 }}
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[26px] bg-[#211d18]">
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between p-7 [background:radial-gradient(80%_60%_at_20%_15%,rgba(201,169,110,0.28),transparent_65%),linear-gradient(160deg,#2a241d,#16130f)]">
                  <span className="text-[13px] tracking-[0.18em] text-cream/50">0{i + 1}</span>
                  <span className="serif text-[5.5rem] leading-none text-cream/15">{item.caption.split(" ")[0]}</span>
                </div>
              )}
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,16,13,0.6),transparent_40%)]" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between p-6">
                <span className="headline text-[1.6rem]">{item.caption}</span>
                <span className="text-[13px] text-cream/60">0{i + 1}</span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </div>
    </section>
  );
}
