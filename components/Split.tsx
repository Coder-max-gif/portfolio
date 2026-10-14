"use client";

import { useState } from "react";
import { split } from "@/content.config";
import MagneticButton from "./MagneticButton";

type Side = "founders" | "investors" | null;

/** Founders / Investors. Hover (or tap on mobile) one side: it widens to 62%, the other dims. */
export default function Split() {
  const [active, setActive] = useState<Side>(null);
  const sides: Exclude<Side, null>[] = ["founders", "investors"];

  return (
    <section data-index="06 / Who it's for" className="relative py-32 md:py-0">
      <div className="flex min-h-[100svh] flex-col md:flex-row" onPointerLeave={() => setActive(null)}>
        {sides.map((side, i) => {
          const s = split[side];
          const isActive = active === side;
          const dim = active !== null && !isActive;
          return (
            <div
              key={side}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(side)}
              onClick={() => setActive(isActive ? null : side)}
              className={`relative flex flex-col justify-end overflow-hidden px-6 py-20 transition-[flex-basis,opacity] duration-[800ms] ease-expo md:px-14 md:py-28 ${
                i === 0 ? "md:border-r md:border-ivory/10" : "border-t border-ivory/10 md:border-t-0"
              } ${dim ? "opacity-35" : "opacity-100"}`}
              style={{ flexBasis: active ? (isActive ? "62%" : "38%") : "50%" }}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 transition-opacity duration-700 [background:radial-gradient(60%_50%_at_30%_80%,rgba(201,169,110,0.12),transparent_70%)] ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <p className="label relative mb-10">0{i + 1} / {s.label}</p>
              <h2 className="display relative mb-10 text-[clamp(3rem,7vw,7.5rem)]">
                {s.label.replace("For ", "").replace(/^./, (c) => c.toUpperCase())}
                <span className="text-gold">.</span>
              </h2>
              <p className="relative mb-12 max-w-[38ch] text-lg text-ivory-dim">{s.body}</p>
              <div className="relative">
                <MagneticButton href="#contact">{s.cta}</MagneticButton>
              </div>
            </div>
          );
        })}
      </div>
      <p data-reveal className="mx-auto max-w-[1280px] px-6 pt-24 font-display text-2xl italic text-ivory/80 md:px-14 md:py-28 md:text-3xl">
        {split.closing}
      </p>
    </section>
  );
}
