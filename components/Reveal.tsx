"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "p" | "h2" | "h3" | "li" | "span" };

/** Fades + rises into view once. Respects reduced motion via <MotionConfig reducedMotion="user">. */
export default function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: Props) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
