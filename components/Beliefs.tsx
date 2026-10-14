"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { beliefs } from "@/content.config";
import { ease } from "@/lib/motion";

/**
 * The one night-time section: the lighthouse moment.
 * A warm beam follows the pointer on desktop and drifts slowly on its own on phones.
 */
export default function Beliefs() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useSpring(useMotionValue(30), { stiffness: 40, damping: 18 });
  const my = useSpring(useMotionValue(30), { stiffness: 40, damping: 18 });
  const bg = useMotionTemplate`radial-gradient(55vmax 40vmax at ${mx}% ${my}%, rgba(201,169,110,0.20), rgba(201,169,110,0.05) 45%, transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current!;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    }
    // touch: slow lighthouse sweep
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      mx.set(50 + Math.sin(t / 3) * 40);
      my.set(35 + Math.cos(t / 4) * 20);
    }, 900);
    return () => window.clearInterval(id);
  }, [mx, my, reduce]);

  return (
    <section
      ref={ref}
      aria-label="Beliefs"
      className="relative overflow-hidden rounded-t-[36px] bg-night text-cream md:rounded-t-[56px]"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-8">
        <p className="eyebrow pt-24 !text-cream/60 md:pt-36">What I believe</p>
        {beliefs.map((b, i) => (
          <div key={i} className="flex min-h-[70svh] items-center py-16 md:min-h-[85vh]">
            <motion.p
              className={`serif text-[clamp(2.6rem,7.4vw,7rem)] leading-[1] ${i === 1 ? "md:ml-[18%]" : i === 2 ? "md:ml-[6%]" : ""}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.07 }}
            >
              {b.text.split(" ").map((w, j) => (
                <motion.span
                  key={j}
                  className={`inline-block pr-[0.24em] ${w === b.key ? "italic text-[#D9BC86]" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: "0.4em", filter: "blur(10px)" },
                    show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 1, ease } },
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.p>
          </div>
        ))}
        <div className="h-16 md:h-24" />
      </div>
    </section>
  );
}
