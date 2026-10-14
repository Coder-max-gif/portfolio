"use client";

import { useEffect, useRef, useState } from "react";
import { nav, hero } from "@/content.config";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";

/** Glass nav. Hides on scroll down, returns on scroll up. */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last.current);
      setSolid(y > 40);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-700 ease-expo md:px-8 md:pt-6"
      style={{ transform: hidden ? "translateY(-130%)" : "none" }}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 transition-[background,border-color,box-shadow] duration-700 md:px-7 ${
          solid ? "glass !rounded-full" : "border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-3 text-ivory" aria-label="Anuvamshi Shetty, home">
          <Logo className="h-7 w-7" />
          <span className="hidden font-display text-lg tracking-wide sm:inline">A. Shetty</span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="link-draw text-[13px] tracking-wide text-ivory-dim hover:text-ivory">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <MagneticButton href="#contact" className="!px-5 !py-2.5 !text-[11px]">
          {hero.cta}
        </MagneticButton>
      </nav>
    </header>
  );
}
