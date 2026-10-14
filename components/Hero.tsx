"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content.config";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Wait for the preloader to finish before starting the hero intro. */
function onIntro(cb: () => void) {
  if ((window as unknown as { __introDone?: boolean }).__introDone) {
    cb();
    return () => {};
  }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const beam = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const [first, last] = hero.name.split(" ");

  useEffect(() => {
    const section = root.current!;
    const letters = Array.from(section.querySelectorAll<HTMLElement>("[data-letter]"));
    const setBeam = (x: number, y: number) => {
      beam.current!.style.setProperty("--beam-x", `${x}%`);
      beam.current!.style.setProperty("--beam-y", `${y}%`);
      // the conic shaft aims from off-screen left toward the pool of light
      beam.current!.style.setProperty("--beam-angle", `${90 + (y - 50) * 0.6 + (x - 50) * 0.08}deg`);
    };

    if (prefersReducedMotion()) {
      letters.forEach((l) => (l.style.opacity = "1"));
      gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
      setBeam(32, 62);
      return;
    }

    const ctx = gsap.context(() => {});
    let cleanupMove = () => {};
    let sweepTween: gsap.core.Tween | null = null;

    const stop = onIntro(() => {
      ctx.add(() => {
        // slow settle of the portrait/video, 1.08 -> 1.0 over 12s
        gsap.fromTo(media.current, { scale: 1.08 }, { scale: 1, duration: 12, ease: "power2.out" });

        // letter centres as % of the hero width, so the beam can "light" them
        const box = section.getBoundingClientRect();
        const pos = letters.map((l) => {
          const r = l.getBoundingClientRect();
          return ((r.left + r.width / 2 - box.left) / box.width) * 100;
        });

        const beamState = { x: -25, y: 64 };
        const render = () => {
          setBeam(beamState.x, beamState.y);
          letters.forEach((l, i) => {
            if (l.dataset.lit) return;
            if (beamState.x + 6 >= pos[i]) {
              l.dataset.lit = "1";
              gsap.to(l, { opacity: 1, duration: 1.1, ease: "power2.out" });
            }
          });
        };

        const tl = gsap.timeline();
        tl.to(beamState, { x: 110, duration: 4.2, ease: "power2.inOut", onUpdate: render })
          .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, "-=0.6")
          .add(() => {
            letters.forEach((l) => gsap.to(l, { opacity: 1, duration: 0.6 }));
            const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            if (fine) {
              // Desktop: beam follows the cursor with ~0.6s lag
              gsap.to(beamState, { x: 62, y: 46, duration: 1.4, ease: "expo.out", onUpdate: () => setBeam(beamState.x, beamState.y) });
              const qx = gsap.quickTo(beamState, "x", { duration: 0.6, ease: "power3.out", onUpdate: () => setBeam(beamState.x, beamState.y) });
              const qy = gsap.quickTo(beamState, "y", { duration: 0.6, ease: "power3.out" });
              const move = (e: PointerEvent) => {
                const r = section.getBoundingClientRect();
                if (e.clientY > r.bottom) return;
                qx(((e.clientX - r.left) / r.width) * 100);
                qy(((e.clientY - r.top) / r.height) * 100);
              };
              window.addEventListener("pointermove", move);
              cleanupMove = () => window.removeEventListener("pointermove", move);
            } else {
              // Touch: slow auto-sweep with a long pause at each end
              sweepTween = gsap.fromTo(
                beamState,
                { x: -20 },
                { x: 120, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true, repeatDelay: 2.5, onUpdate: () => setBeam(beamState.x, beamState.y) }
              );
            }
          });
      });
    });

    // Pause the background video when the hero is off-screen
    const video = section.querySelector("video");
    const io = video
      ? new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()))
      : null;
    if (video && io) io.observe(section);

    return () => {
      stop();
      cleanupMove();
      sweepTween?.kill();
      io?.disconnect();
      ctx.revert();
    };
  }, []);

  const renderWord = (word: string, italic = false) =>
    word.split("").map((ch, i) => (
      <span key={i} data-letter className={`inline-block opacity-[0.08] ${italic ? "italic" : ""}`}>
        {ch}
      </span>
    ));

  return (
    <section
      id="top"
      ref={root}
      data-index="01 / Lighthouse"
      className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden bg-ink"
    >
      {/* Media: real footage when available, graded portrait as fallback */}
      <div ref={media} className="absolute inset-0 will-change-transform md:left-[22%]">
        {hero.video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={hero.poster}
          >
            <source src={hero.video.webm} type="video/webm" />
            <source src={hero.video.mp4} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.poster}
            alt="Portrait of Anuvamshi Shetty, lit by a single warm light"
            className="h-full w-full object-cover object-[60%_30%] md:object-center"
            fetchPriority="high"
          />
        )}
      </div>
      {/* Fade the portrait into ink so the type can breathe */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_8%,rgba(10,12,16,0.55)_40%,rgba(10,12,16,0.15)_70%)] md:bg-[linear-gradient(90deg,var(--color-ink)_18%,rgba(10,12,16,0.75)_38%,rgba(10,12,16,0)_62%),linear-gradient(to_top,var(--color-ink),transparent_35%)]"
      />

      <div ref={beam} className="beam" aria-hidden />

      <div className="relative z-10 w-full px-6 pb-20 md:px-14 md:pb-24 lg:px-20">
        <p data-hero-fade className="label mb-6 translate-y-6 opacity-0 md:mb-10">
          {hero.label}
        </p>
        <h1 className="display display-xl text-ivory" aria-label={hero.name}>
          <span aria-hidden className="block">{renderWord(first)}</span>
          {/* deliberate off-grid indent */}
          <span aria-hidden className="block pl-[12vw] md:pl-[9vw]">{renderWord(last, true)}</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="translate-y-6 font-display text-2xl italic text-ivory/90 opacity-0 md:text-3xl">
            {hero.tagline}
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-0 right-8 z-10 flex flex-col items-center gap-3 md:right-14">
        <span className="label [writing-mode:vertical-rl]">Scroll</span>
        <span className="block h-[60px] w-px origin-top animate-[cue_2.4s_var(--ease)_infinite] bg-gold" />
        <style>{`@keyframes cue{0%{transform:scaleY(.3);opacity:.4}50%{transform:scaleY(1);opacity:1}100%{transform:scaleY(.3);opacity:.4}}`}</style>
      </div>
    </section>
  );
}
