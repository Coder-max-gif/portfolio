"use client";

import { useEffect, useRef } from "react";
import { credentials, isPlaceholder } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Quiet list with hairlines, no badges. Stats only render once real numbers are filled in. */
export default function Credentials() {
  const root = useRef<HTMLElement>(null);
  const stats = credentials.stats.filter((s) => !isPlaceholder(s.value));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const raw = el.dataset.count!;
        const end = parseFloat(raw);
        if (Number.isNaN(end)) return;
        const decimals = (raw.split(".")[1] || "").length;
        const o = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = o.v.toFixed(decimals);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="credentials"
      ref={root}
      data-index="09 / Credentials"
      className="mx-auto max-w-[1280px] px-6 py-40 md:px-14 md:py-56"
    >
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label mb-8" data-reveal>
            Credentials &amp; ventures
          </p>
          <p data-reveal className="display text-[clamp(2.2rem,3.6vw,3.6rem)]">
            The work, <em className="text-gold">quietly</em> listed.
          </p>
        </div>
        <ul className="md:col-span-7 md:col-start-6">
          {credentials.rows.map((r) => (
            <li key={r.title} className="relative py-7">
              <span data-hairline aria-hidden className="absolute inset-x-0 top-0 block h-px origin-left bg-ivory/15" />
              <div data-reveal className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <span className="font-display text-2xl md:text-3xl">{r.title}</span>
                {r.detail &&
                  (r.href ? (
                    <a href={r.href} target="_blank" rel="noreferrer" className="link-draw text-sm text-ivory-dim hover:text-ivory">
                      {r.detail} <span aria-hidden className="text-gold">&rarr;</span>
                    </a>
                  ) : (
                    <span className="text-sm text-ivory-dim">{r.detail}</span>
                  ))}
              </div>
            </li>
          ))}
          <li aria-hidden>
            <span data-hairline className="block h-px origin-left bg-ivory/15" />
          </li>
        </ul>
      </div>

      {stats.length > 0 && (
        <dl className="mt-32 grid gap-14 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="label mt-4">{s.label}</dt>
              <dd className="display text-[clamp(3.5rem,7vw,7rem)] tabular-nums text-gold">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
