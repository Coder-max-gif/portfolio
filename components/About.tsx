import { about } from "@/content.config";

/** Portrait in a gold offset frame, her own words beside it. */
export default function About() {
  return (
    <section data-index="03 / About" className="relative mx-auto max-w-[1280px] px-6 py-40 md:px-14 md:py-60">
      <div className="grid gap-20 md:grid-cols-12 md:gap-10">
        <figure className="relative md:col-span-5 md:col-start-1">
          <div className="relative">
          <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/60" />
          <div className="relative overflow-hidden bg-ink-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-img
              src="/images/portrait.jpg"
              alt="Anuvamshi Shetty"
              width={960}
              height={1200}
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
          </div>
          <figcaption className="label mt-8">Anuvamshi Shetty</figcaption>
        </figure>

        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <p className="label mb-10" data-reveal>About</p>
          {/* oversized line pulls left across the gutter: deliberate grid break */}
          <p
            data-reveal
            className="display mb-14 text-[clamp(2.4rem,4.6vw,4.4rem)] text-ivory md:-ml-[18%] md:bg-ink/0"
          >
            Ambition <em className="text-gold">deserves</em> access.
          </p>
          <div className="prose-col space-y-6 text-ivory-dim">
            {about.map((p, i) => (
              <p key={i} data-reveal data-delay={i * 0.08}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
