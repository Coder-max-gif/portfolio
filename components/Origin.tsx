"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { origin } from "@/content.config";

function Word({ children, range, progress, accent }: { children: string; range: [number, number]; progress: MotionValue<number>; accent?: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block pr-[0.26em] ${accent ? "serif italic text-gold-deep" : ""}`}>
      {children}
    </motion.span>
  );
}

/** Pinned paragraph; each word fills from faint to ink as you scroll through it. */
export default function Origin() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // flatten the five lines into words, remembering where each line starts
  const words = origin.flatMap((line, li) =>
    line.split(" ").map((w, wi) => ({ w, li, first: wi === 0 && li > 0 }))
  );
  const n = words.length;
  const lastLine = origin.length - 1;

  return (
    <section id="origin" ref={ref} className={reduce ? "py-32" : "h-[320svh]"} aria-label="Origin">
      <div className={`${reduce ? "" : "sticky top-0 h-[100svh]"} flex items-center`}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="eyebrow">Where it started</span>
            <span className="relative h-px w-24 overflow-hidden bg-ink/10">
              <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: reduce ? 1 : bar }} />
            </span>
          </div>
          <p className="headline max-w-[22ch] text-[clamp(2.1rem,5.6vw,5rem)]" aria-label={origin.join(" ")}>
            {words.map(({ w, li, first }, i) => {
              const start = (i / n) * 0.85;
              return (
                <span key={i} aria-hidden>
                  {first && li >= 3 && <br className="hidden md:block" />}
                  {reduce ? (
                    <span className={`inline-block pr-[0.26em] ${li === lastLine && /scratch|opportunities/.test(w) ? "serif italic text-gold-deep" : ""}`}>{w}</span>
                  ) : (
                    <Word progress={scrollYProgress} range={[start, start + 0.85 / n + 0.04]} accent={li === lastLine && /scratch|opportunities/.test(w)}>
                      {w}
                    </Word>
                  )}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
