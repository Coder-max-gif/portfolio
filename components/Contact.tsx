"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, socials, isPlaceholder } from "@/content.config";
import { ease } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ name, label, type = "text", textarea, autoComplete }: { name: string; label: string; type?: string; textarea?: boolean; autoComplete?: string }) {
  const props = { name, id: `f-${name}`, required: true, placeholder: " ", className: "field peer", autoComplete };
  return (
    <div className="relative">
      {textarea ? <textarea rows={4} {...props} className="field peer resize-none" /> : <input type={type} {...props} />}
      <label htmlFor={`f-${name}`} className="float-label">{label}</label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState(contact.roles[0]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), role };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const links = [
    ...socials.filter((s) => !isPlaceholder(s.href)),
    ...(!isPlaceholder(contact.email) ? [{ label: "Email", href: `mailto:${contact.email}` }] : []),
  ];

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-4 pb-20 pt-10 md:px-8 md:pb-32">
      <div className="px-2 md:px-0">
        <Reveal as="p" className="eyebrow mb-6">Contact</Reveal>
        <Reveal as="h2" className="headline max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.8rem)]">
          If you&apos;re building something meaningful, or investing in people who are,{" "}
          <span className="serif font-normal italic text-gold-deep">I&apos;d love to connect.</span>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
        <Reveal className="card !rounded-[32px] p-6 sm:p-8 md:col-span-8 md:p-12" y={40}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="done"
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease }}
                role="status"
              >
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
                  <motion.circle cx="36" cy="36" r="34" stroke="#A47E45" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease }} />
                  <motion.path d="M23 37 L32 46 L50 27" stroke="#191714" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease, delay: 0.6 }} />
                </svg>
                <p className="serif mt-8 text-[3rem]">{contact.success}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="grid gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field name="name" label="Name" autoComplete="name" />
                  <Field name="email" label="Email" type="email" autoComplete="email" />
                </div>
                <fieldset>
                  <legend className="mb-3 text-[15px] text-ink-mute">I am a</legend>
                  <div className="flex flex-wrap gap-2">
                    {contact.roles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        aria-pressed={role === r}
                        onClick={() => setRole(r)}
                        className={`relative h-11 rounded-full border px-5 text-[15px] transition-colors duration-300 ${
                          role === r ? "border-ink text-cream" : "border-ink/15 text-ink-soft hover:border-ink/40"
                        }`}
                      >
                        {role === r && (
                          <motion.span layoutId="role-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                        )}
                        <span className="relative">{r}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <Field name="message" label="Message" textarea />
                {/* honeypot for bots */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[14px] text-ink-mute" role="status">
                    {status === "error" && "Something went wrong. Please try again."}
                    {status === "sending" && "Sending…"}
                  </p>
                  <MagneticButton type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
                    {contact.button}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        {links.length > 0 && (
          <div className="flex flex-col justify-end gap-1 px-2 md:col-span-4 md:px-0">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={0.1 + i * 0.06}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-ink/10 py-4 text-[1.35rem] font-medium tracking-[-0.02em]"
                >
                  {l.label}
                  <span aria-hidden className="text-ink-mute transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
                    &#8599;
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
