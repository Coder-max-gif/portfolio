"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, hero, socials, isPlaceholder } from "@/content.config";
import { ease } from "@/lib/motion";
import Logo from "./Logo";

/** Apple-style frosted bar. Hides on scroll down, returns on scroll up. Full-screen sheet on phones. */
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 200 && y > prev && !open);
    setSolid(y > 24);
  });

  // lock page scroll behind the open sheet
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [...nav, { label: "Contact", href: "#contact" }];

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: "var(--safe-t)" }}
      >
        <div
          className={`absolute inset-0 transition-[opacity] duration-500 ${solid || open ? "opacity-100" : "opacity-0"} frost border-b border-ink/[0.06]`}
          aria-hidden
        />
        <nav aria-label="Primary" className="relative mx-auto flex h-[var(--nav-h)] max-w-[1200px] items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Anuvamshi Shetty, home" onClick={() => setOpen(false)}>
            <Logo className="h-7 w-7 text-ink" />
            <span className="font-display text-[19px] tracking-tight">Anuvamshi Shetty</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-draw text-[13.5px] text-ink-soft transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn btn-dark !min-h-[34px] !px-4 !text-[13px]">
                {hero.cta}
              </a>
            </li>
          </ul>

          {/* Phone menu button: two lines that fold into an X */}
          <button
            type="button"
            className="relative -mr-2 grid h-11 w-11 place-items-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <motion.span
              className="absolute h-[1.5px] w-5 bg-ink"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.45, ease }}
            />
            <motion.span
              className="absolute h-[1.5px] w-5 bg-ink"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.45, ease }}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-cream/[0.97] px-6 backdrop-blur-xl md:hidden"
            style={{ paddingTop: "calc(var(--nav-h) + var(--safe-t) + 24px)", paddingBottom: "calc(var(--safe-b) + 28px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
            transition={{ duration: 0.4 }}
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.06 + i * 0.05, duration: 0.7, ease } }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="headline block py-2 text-[2.6rem]">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink-soft"
            >
              {socials
                .filter((s) => !isPlaceholder(s.href))
                .map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="py-2">
                    {s.label}
                  </a>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
