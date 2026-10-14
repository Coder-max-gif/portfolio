"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about, images } from "@/content.config";
import Reveal from "./Reveal";

/** Stage photo with inner parallax, a smaller portrait floating over its corner, her words beside. */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} id="about" className="mx-auto max-w-[1200px] px-6 py-28 md:px-8 md:py-44">
      <Reveal as="p" className="eyebrow mb-6">About</Reveal>
      <Reveal as="h2" className="serif mb-16 text-[clamp(3rem,9vw,8.5rem)] md:mb-24">
        Ambition <em className="ink-gradient pr-2">deserves</em>
        <br className="hidden md:block" /> access.
      </Reveal>

      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-7">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-cream-2" y={40}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={images.stage}
              alt="Anuvamshi Shetty speaking on stage"
              loading="lazy"
              className="absolute inset-0 h-[116%] w-full object-cover object-[60%_30%]"
              style={{ y: imgY, top: "-8%" }}
            />
          </Reveal>
          {/* floating portrait: deliberately breaks the grid */}
          <motion.div
            style={{ y: floatY }}
            className="card absolute -bottom-10 right-4 w-[38%] overflow-hidden !rounded-[22px] p-1.5 md:-right-16 md:-bottom-16 md:w-[34%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.portrait} alt="" loading="lazy" className="block aspect-[4/5] w-full rounded-[17px] object-cover" />
          </motion.div>
        </div>

        <div className="md:col-span-4 md:col-start-9 md:pt-6">
          <div className="space-y-6 text-[17px] leading-[1.7] text-ink-soft">
            {about.map((para, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} className={i === 0 ? "text-[1.25rem] leading-[1.5] text-ink" : ""}>
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
