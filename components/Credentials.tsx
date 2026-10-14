"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { credentials, isPlaceholder } from "@/content.config";
import { ease } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

function Count({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  useEffect(() => {
    const end = parseFloat(value);
    if (!inView || Number.isNaN(end) || !ref.current) return;
    const decimals = (value.split(".")[1] || "").length;
    const c = animate(0, end, {
      duration: 1.6,
      ease,
      onUpdate: (v) => ref.current && (ref.current.textContent = v.toFixed(decimals)),
    });
    return () => c.stop();
  }, [inView, value]);
  return (
    <>
      <span ref={ref} className="tabular-nums">{value}</span>
      {suffix}
    </>
  );
}

export default function Credentials() {
  const isGroup = (href?: string) => !!href && href.includes("chat.whatsapp");
  const rows = credentials.rows.filter((r) => !isGroup(r.href));
  const group = credentials.rows.find((r) => isGroup(r.href));
  const stats = credentials.stats.filter((s) => !isPlaceholder(s.value));

  return (
    <section
      id="credentials"
      className="relative z-10 -mt-10 rounded-t-[36px] bg-cream md:-mt-14 md:rounded-t-[56px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal as="p" className="eyebrow mb-6">Credentials &amp; ventures</Reveal>
            <Reveal as="h2" className="headline text-[clamp(2.2rem,4vw,3.6rem)]">
              The work, <span className="serif font-normal italic text-gold-deep">quietly</span> listed.
            </Reveal>
          </div>

          <ul className="md:col-span-7 md:col-start-6">
            {rows.map((r, i) => (
              <li key={r.title} className="relative">
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 block h-px origin-left bg-ink/15"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease, delay: i * 0.06 }}
                />
                <Reveal delay={i * 0.06} className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-[1.35rem] font-medium tracking-[-0.02em] md:text-[1.6rem]">{r.title}</span>
                  {r.detail &&
                    (r.href ? (
                      <a href={r.href} target="_blank" rel="noreferrer" className="link-draw text-[15px] text-ink-soft hover:text-ink">
                        {r.detail} <span aria-hidden>&#8599;</span>
                      </a>
                    ) : (
                      <span className="text-[15px] text-ink-soft">{r.detail}</span>
                    ))}
                </Reveal>
              </li>
            ))}
            <li aria-hidden className="h-px bg-ink/15" />
          </ul>
        </div>

        {stats.length > 0 && (
          <dl className="mt-24 grid gap-12 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="eyebrow mt-3">{s.label}</dt>
                <dd className="headline text-[clamp(3.4rem,7vw,6rem)]">
                  <Count value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        {group && (
          <Reveal className="card mt-20 flex flex-col gap-8 !rounded-[32px] p-8 md:mt-28 md:flex-row md:items-center md:justify-between md:p-12" y={40}>
            <div>
              <p className="eyebrow mb-4">For CFA candidates</p>
              <p className="headline text-[clamp(1.9rem,3.6vw,3rem)]">{group.title}</p>
              <p className="mt-3 text-[17px] text-ink-soft">Shared in her WhatsApp group.</p>
            </div>
            <MagneticButton href={group.href} external className="self-start md:self-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3Z" />
              </svg>
              Join the WhatsApp group
            </MagneticButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}
