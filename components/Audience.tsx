"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { split } from "@/content.config";
import { ease } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

type Key = "founders" | "investors";
const keys: Key[] = ["founders", "investors"];

/** iOS-style segmented control; works the same with a mouse or a thumb. */
export default function Audience() {
  const [active, setActive] = useState<Key>("founders");
  const s = split[active];

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-24 md:px-8 md:py-36" aria-label="Who it's for">
      <div className="card relative overflow-hidden !rounded-[36px] px-6 py-12 md:px-16 md:py-20">
        {/* soft beam of light across the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-1/4 top-0 h-full w-[150%] opacity-60 [background:conic-gradient(from_96deg_at_0%_40%,transparent_0deg,rgba(201,169,110,0.22)_8deg,transparent_18deg)]"
        />
        <div className="relative">
          <div role="tablist" aria-label="Choose" className="relative mx-auto mb-14 flex w-full max-w-[360px] rounded-full bg-cream-2 p-1 md:mb-20">
            {keys.map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={active === k}
                aria-controls="audience-panel"
                onClick={() => setActive(k)}
                className={`relative z-10 h-11 flex-1 rounded-full text-[15px] font-medium transition-colors duration-500 ${
                  active === k ? "text-cream" : "text-ink-soft"
                }`}
              >
                {active === k && (
                  <motion.span
                    layoutId="seg-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                {split[k].label}
              </button>
            ))}
          </div>

          <div id="audience-panel" role="tabpanel" className="min-h-[300px] text-center md:min-h-[320px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease }}
              >
                <h2 className="serif text-[clamp(3.4rem,10vw,8rem)]">
                  {s.label.replace("For ", "").replace(/^./, (c) => c.toUpperCase())}
                  <span className="text-gold">.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[36ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.5] text-ink-soft">{s.body}</p>
                <div className="mt-10">
                  <MagneticButton href="#contact">{s.cta}</MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Reveal as="p" className="serif mx-auto mt-16 max-w-[26ch] text-center text-[clamp(1.7rem,3.2vw,2.6rem)] italic leading-[1.2] text-ink-soft md:mt-24">
        {split.closing}
      </Reveal>
    </section>
  );
}
