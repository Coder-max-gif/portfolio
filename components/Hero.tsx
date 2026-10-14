"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { hero } from "@/content.config";
import { ease } from "@/lib/motion";

/**
 * Signature moment. The portrait sits in a small rounded window behind her name;
 * as you scroll the window opens to full-bleed (Apple product-film style) while the
 * name, set in cream with mix-blend-mode: difference, inverts wherever it crosses the photo.
 */
/** Desktop starting window, as rendered on the server. */
const CLIP_TOP = "inset(14.00% 31.00% 14.00% 31.00% round 28.00px)";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  // The server always renders the top of the page with motion on. Match that on the first
  // client render (scroll may already be restored mid-page), then hand over to the live values.
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  const reduce = live && prefersReduced;
  const at = <T,>(mv: MotionValue<T>, top: T, still: T) => (!live ? top : reduce ? still : mv);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Starting window: tall and narrow on desktop, nearly full-width on a phone.
  const phone = useMotionValue(0);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => phone.set(mq.matches ? 1 : 0);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [phone]);
  const clip = useTransform([p, phone], ([v, m]: number[]) => {
    const win = m ? { t: 17, b: 24, x: 8 } : { t: 14, b: 14, x: 31 };
    const k = 1 - Math.pow(1 - Math.min(v / 0.75, 1), 2); // ease-out
    const r = (n: number) => (n * (1 - k)).toFixed(2);
    return `inset(${r(win.t)}% ${r(win.x)}% ${r(win.b)}% ${r(win.x)}% round ${r(28)}px)`;
  });
  const imgScale = useTransform(p, [0, 0.8], [1.18, 1]);
  const nameY = useTransform(p, [0, 0.6], ["0%", "-38%"]);
  const nameScale = useTransform(p, [0, 0.6], [1, 0.82]);
  const nameOpacity = useTransform(p, [0.35, 0.62], [1, 0]);
  const tagOpacity = useTransform(p, [0.62, 0.82], [0, 1]);
  const tagY = useTransform(p, [0.62, 0.82], [30, 0]);
  const shade = useTransform(p, [0.5, 0.85], [0, 1]);
  const cueOpacity = useTransform(p, [0, 0.08], [1, 0]);

  const [first, last] = hero.name.split(" ");
  const letters = (word: string, offset: number) =>
    word.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.2, ease, delay: 0.25 + (offset + i) * 0.045 }}
        >
          {ch}
        </motion.span>
      </span>
    ));

  return (
    <section
      id="top"
      ref={ref}
      className={`relative ${reduce ? "h-[100svh]" : "h-[230svh]"}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-cream">
        {/* Portrait window */}
        <motion.div
          className="absolute inset-0 will-change-[clip-path]"
          style={{ clipPath: at(clip, CLIP_TOP, "inset(0)"), WebkitClipPath: at(clip, CLIP_TOP, "inset(0)") }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.1 }}
        >
          <motion.picture className="block h-full w-full" style={{ scale: at(imgScale, 1.18, 1) }}>
            <source media="(max-width: 767px)" srcSet={hero.posterMobile} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.poster}
              alt="Portrait of Anuvamshi Shetty"
              className="h-full w-full object-cover object-[50%_28%]"
              fetchPriority="high"
            />
          </motion.picture>
          {/* bottom shade so the tagline reads over the photo */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(25,23,20,0.55),rgba(25,23,20,0)_45%)]"
            style={{ opacity: at(shade, 0, 1) }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="eyebrow absolute inset-x-0 text-center"
          style={{ top: "calc(var(--nav-h) + var(--safe-t) + 4vh)", opacity: at(nameOpacity, 1, 1) }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
        >
          {hero.label}
        </motion.p>

        {/* Name: cream + difference blend = dark on cream, light on the photo */}
        <motion.h1
          aria-label={hero.name}
          className="serif pointer-events-none absolute inset-x-0 top-[81%] -translate-y-1/2 text-center md:top-1/2 text-[19.5vw] text-cream mix-blend-difference md:text-[13.5vw]"
          style={{ y: at(nameY, "0%", "0%"), scale: at(nameScale, 1, 1), opacity: at(nameOpacity, 1, 1) }}
        >
          <span aria-hidden className="block">{letters(first, 0)}</span>
          <span aria-hidden className="block italic md:-mt-[0.12em] md:pl-[18vw]">{letters(last, first.length)}</span>
        </motion.h1>

        {/* Tagline arrives once the window is fully open */}
        <motion.div
          className="absolute inset-x-0 px-6 text-center text-cream md:px-10"
          style={{
            bottom: "calc(var(--safe-b) + 9vh)",
            opacity: at(tagOpacity, 0, 1),
            y: at(tagY, 30, 0),
          }}
        >
          <p className="serif text-[clamp(2.6rem,7vw,6.5rem)] italic">{hero.tagline}</p>
          <p className="mt-4 text-[15px] text-cream/80">Founder, Lighthouse Capital</p>
        </motion.div>

        {/* Scroll cue */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 hidden flex-col items-center gap-2 text-ink-soft md:flex"
            style={{ bottom: "calc(var(--safe-b) + 3vh)", opacity: at(cueOpacity, 1, 0) }}
          >
            <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-ink"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
