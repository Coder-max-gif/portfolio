"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { services } from "@/content.config";
import Reveal from "./Reveal";

const tones = [
  { bg: "#FBF8F2", fg: "#191714", sub: "#5E574D", line: "rgba(25,23,20,0.12)" },
  { bg: "#E9DFCC", fg: "#191714", sub: "#4F483E", line: "rgba(25,23,20,0.14)" },
  { bg: "#191714", fg: "#F4EFE6", sub: "#B9B0A2", line: "rgba(244,239,230,0.16)" },
  { bg: "#D8C6A6", fg: "#191714", sub: "#4A4237", line: "rgba(25,23,20,0.16)" },
];

/** A beam of light at a different angle per card: the only "icon" on the site. */
function Beam({ i, color }: { i: number; color: string }) {
  const angle = [-18, -6, 8, 20][i];
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <circle cx="30" cy="100" r="4" fill={color} />
      <g transform={`rotate(${angle} 30 100)`}>
        <path d="M30 100 L200 70 L200 130 Z" fill={color} opacity="0.12" />
        <path d="M30 100 L200 88 L200 112 Z" fill={color} opacity="0.18" />
        <line x1="30" y1="100" x2="200" y2="100" stroke={color} strokeWidth="0.8" opacity="0.6" />
      </g>
    </svg>
  );
}

function Card({ i, n, progress }: { i: number; n: number; progress: MotionValue<number> }) {
  const s = services.items[i];
  const t = tones[i];
  // as later cards arrive, earlier ones settle back
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.045]);
  return (
    <div className="sticky h-[78svh] md:h-[72vh]" style={{ top: `calc(var(--nav-h) + var(--safe-t) + 3vh + ${i * 14}px)` }}>
      <motion.article
        style={{ scale, backgroundColor: t.bg, color: t.fg, transformOrigin: "50% 0%" }}
        className="relative flex h-[min(68svh,560px)] flex-col justify-between overflow-hidden rounded-[32px] p-7 shadow-[0_40px_80px_-40px_rgba(60,45,20,0.35)] md:h-[min(62vh,560px)] md:flex-row md:p-14"
      >
        <div className="flex flex-col justify-between md:w-[55%]">
          <span className="text-[13px] font-medium tracking-[0.18em]" style={{ color: t.sub }}>
            0{i + 1} / 0{n}
          </span>
          <div>
            <h3 className="headline text-[clamp(2.4rem,5.4vw,4.8rem)]">{s.title}</h3>
            <p className="mt-4 max-w-[34ch] text-[17px] md:text-[19px]" style={{ color: t.sub }}>
              {s.body}
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-0 h-[55%] w-[85%] md:static md:h-auto md:w-[40%]">
          <Beam i={i} color={t.fg} />
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = services.items.length;

  return (
    <section id="work" className="mx-auto max-w-[1200px] px-4 pb-24 pt-10 md:px-8 md:pb-40">
      <div className="px-2 md:px-0">
        <Reveal as="p" className="eyebrow mb-6">{services.label}</Reveal>
        <Reveal as="h2" className="headline mb-14 max-w-[16ch] text-[clamp(2.4rem,6vw,5.4rem)] md:mb-20">
          Credibility, capital and <span className="serif italic font-normal text-gold-deep">connections.</span>
        </Reveal>
      </div>

      <div ref={ref} className="relative">
        {services.items.map((_, i) => (
          <Card key={i} i={i} n={n} progress={scrollYProgress} />
        ))}
      </div>

      <Reveal as="p" className="lede mx-2 mt-16 md:mx-0 md:ml-[40%] md:mt-24">
        {services.supporting}
      </Reveal>
    </section>
  );
}
