"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { principles } from "@/content.config";
import Reveal from "./Reveal";

function Row({ i, title, descriptor }: { i: number; title: string; descriptor: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // full ink in the middle of the screen, faint at the edges
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.92], [0.18, 1, 1, 0.18]);
  const x = useTransform(scrollYProgress, [0.1, 0.45], [-24, 0]);
  const line = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const [a, b] = title.split(" over ");

  return (
    <li ref={ref} className="relative py-10 md:py-14">
      <motion.span aria-hidden className="absolute inset-x-0 top-0 block h-px origin-left bg-ink/15" style={{ scaleX: line }} />
      <motion.div style={{ opacity, x }} className="grid items-baseline gap-3 md:grid-cols-12">
        <span className="serif text-[2.2rem] text-gold md:col-span-2 md:text-[3.4rem]">0{i + 1}</span>
        <h3 className="headline text-[clamp(2.3rem,6.6vw,6rem)] md:col-span-10">
          {a} <span className="serif font-normal italic text-ink-mute">over</span> {b}
        </h3>
        {descriptor && <p className="lede md:col-span-8 md:col-start-3">{descriptor}</p>}
      </motion.div>
    </li>
  );
}

export default function Principles() {
  return (
    <section id="principles" className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-40">
      <Reveal as="p" className="eyebrow mb-10 md:mb-16">The approach</Reveal>
      <ol>
        {principles.map((p, i) => (
          <Row key={p.title} i={i} title={p.title} descriptor={p.descriptor} />
        ))}
      </ol>
    </section>
  );
}
