"use client";

import { useEffect, useState } from "react";

/** Margin label ("02 / Origin") that updates as sections pass the viewport centre. */
export default function SectionIndex() {
  const [label, setLabel] = useState("01 / Lighthouse");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setLabel((e.target as HTMLElement).dataset.index!));
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className="label pointer-events-none fixed bottom-8 left-6 z-40 hidden origin-bottom-left -rotate-90 translate-x-4 lg:block"
    >
      <span key={label} className="inline-block animate-[fadeIn_0.9s_var(--ease)]">{label}</span>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
