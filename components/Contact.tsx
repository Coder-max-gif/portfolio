"use client";

import { useEffect, useRef, useState } from "react";
import { contact, socials, isPlaceholder } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";

type Status = "idle" | "sending" | "sent" | "error";

/** Closing screen: the beam slows and settles on one line, then a quiet form. */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const beam = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const b = { x: -20 };
      gsap.to(b, {
        x: 42,
        ease: "power3.out",
        onUpdate: () => beam.current?.style.setProperty("--beam-x", `${b.x}%`),
        scrollTrigger: { trigger: root.current, start: "top 80%", end: "top 10%", scrub: 1.2 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      // the beam brightens once
      if (beam.current && !prefersReducedMotion()) {
        gsap.fromTo(
          beam.current,
          { filter: "blur(6px) brightness(1)" },
          { filter: "blur(6px) brightness(2)", duration: 0.8, yoyo: true, repeat: 1, ease: "sine.inOut" }
        );
      }
    } catch {
      setStatus("error");
    }
  }

  const links = [
    ...socials.filter((s) => !isPlaceholder(s.href)),
    ...(!isPlaceholder(contact.email) ? [{ label: "Email", href: `mailto:${contact.email}` }] : []),
  ];

  return (
    <section
      id="contact"
      ref={root}
      data-index="10 / Contact"
      className="relative overflow-hidden bg-[#07080B] px-6 pb-24 pt-40 md:px-14 md:pt-60"
    >
      <div
        ref={beam}
        className="beam"
        style={{ "--beam-y": "22%", "--beam-x": "42%" } as React.CSSProperties}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <p className="label mb-10" data-reveal>
          Contact
        </p>
        <h2 data-reveal className="display max-w-[18ch] text-[clamp(2.6rem,6.4vw,6.6rem)]">
          {contact.headline}
        </h2>

        <div className="mt-28 grid gap-16 md:grid-cols-12">
          <form
            onSubmit={submit}
            onPointerMove={track}
            className="glass glass-light p-8 md:col-span-7 md:col-start-6 md:row-start-1 md:p-12"
          >
            {status === "sent" ? (
              <p className="display py-20 text-center text-5xl" role="status">
                {contact.success}
              </p>
            ) : (
              <div className="grid gap-8">
                <label className="block">
                  <span className="label">Name</span>
                  <input name="name" required autoComplete="name" className="field" />
                </label>
                <label className="block">
                  <span className="label">Email</span>
                  <input name="email" type="email" required autoComplete="email" className="field" />
                </label>
                <fieldset>
                  <legend className="label mb-4">I am a</legend>
                  <div className="flex flex-wrap gap-3">
                    {contact.roles.map((r, i) => (
                      <label key={r} className="relative">
                        <input type="radio" name="role" value={r} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="inline-block rounded-full border border-ivory/20 px-5 py-2 text-sm text-ivory-dim transition-colors duration-500 peer-checked:border-gold peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-gold">
                          {r}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block">
                  <span className="label">Message</span>
                  <textarea name="message" required rows={4} className="field resize-none" />
                </label>
                {/* honeypot for bots */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <div className="flex items-center justify-between gap-6 pt-4">
                  <p className="text-sm text-ivory-dim" role="status">
                    {status === "error" && "Something went wrong. Please try again."}
                    {status === "sending" && "Sending…"}
                  </p>
                  <MagneticButton type="submit" disabled={status === "sending"}>
                    {contact.button}
                  </MagneticButton>
                </div>
              </div>
            )}
          </form>

          {links.length > 0 && (
            <ul className="flex flex-col gap-4 md:col-span-3 md:col-start-1 md:row-start-1 md:self-end">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="link-draw font-display text-2xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
