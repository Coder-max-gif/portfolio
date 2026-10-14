# MASTER PROMPT (paste this first)

You are a senior creative developer at a luxury design studio. Build a cinematic,
luxury personal portfolio website for **Anuvamshi Shetty**, founder of
**Lighthouse Capital**, a boutique investment bank built on one belief:
**"Ambition deserves access."**

## Who she is (use only this, do not invent facts)
- Founder of Lighthouse Capital, a boutique investment bank.
- Started without a "traditional pedigree": no elite alumni network, no VC circles, no safety nets.
  What she had: curiosity, resilience, and conviction that founders who build from scratch deserve the same opportunities as anyone else.
- Works with early-stage companies, investors and operators across sectors: helping founders raise capital, refine strategy, navigate compliance, and access the right people at the right time.
- Experience spans deal sourcing, investment facilitation, government incentives, and building an ecosystem where founders and investors create meaningful outcomes together.
- Approach: 1. Clarity over chaos  2. Execution over noise  3. Ethics over shortcuts  4. Long-term over instant wins.
- Believes: building with intention, not virality. Consistency compounds. The right people always find each other when the work speaks for itself.
- Outside work: self-growth, fitness, storytelling, mental performance ("entrepreneurship is a psychological journey").
- Also: former investment banker, equity research analyst, CFA Level 3 candidate, finance educator (YouTube: @AnuvamshiShetty), founder of AccelRevenue (connects women founders with investors).
- Existing site for reference only: financewithanuvamshi.com

## Audience
1. Founders (first-time and established) looking for capital and credibility.
2. Investors scouting opportunities.
3. Operators, partners, press, and speaking organisers.
Primary goal: make a visitor feel "this person is serious, calm, ethical and well connected" within 5 seconds, then make them want to get in touch.

## Creative concept: "THE BEAM"
Lighthouse Capital = a lighthouse. A single warm beam of light slowly sweeps across a dark,
quiet screen and reveals content as it passes. This is the signature of the whole site.
- It replaces generic gradient blobs.
- It echoes the spotlight in Apple launches and the single-light product shots in
  Armani / Gucci / luxury watch (Rolex, Patek Philippe) films.
- The beam reveals her name in the hero, follows the cursor on desktop, and
  tilts with the phone on mobile (subtle, optional).
Tone: quiet, confident, cinematic, expensive. Slow. Silent. Lots of negative space.
Less on screen, always. It must feel hand-crafted by a design studio, NOT template-made.

## Pages / sections (single scrolling page + small subpages)
1. **Hero**: fullscreen dark cinematic video loop (slot for real footage; fallback = animated beam on near-black).
   Name in large serif, revealed letter by letter by the beam. Tagline: "Ambition deserves access."
   Small label: "Founder, Lighthouse Capital". Scroll cue = thin gold line.
2. **Origin story** (pinned scroll, Apple-style, ONE sentence per screen):
   "No elite network." / "No VC circles." / "No safety nets." / "Just curiosity, resilience, and conviction."
   / "Founders who build from scratch deserve the same opportunities as anyone else."
3. **What Lighthouse does**: the work: Raise capital, Refine strategy, Navigate compliance,
   Access the right people. Plus deal sourcing, investment facilitation, government incentives.
   Present as an asymmetric layout with 4 glass panels, NOT three equal cards.
4. **Principles**: the 4 principles as huge numbered typographic rows (01-04), each revealing on scroll with a gold hairline.
5. **For founders / For investors**: split screen, hovering one side dims the other, each with its own short pitch and CTA.
6. **Beliefs**: three full-screen statements, one at a time:
   "Building with intention, not virality." / "Consistency compounds." /
   "The right people always find each other when the work speaks for itself."
7. **Beyond the boardroom**: self-growth, fitness, storytelling, mental performance. Short, personal, image-led.
8. **Credentials & ventures**: former investment banker, equity research analyst, CFA Level 3 candidate,
   AccelRevenue, YouTube. Use a quiet list with thin dividers, not badges. [PLACEHOLDER: logos, numbers]
9. **Contact**: closing screen, near-black, the beam slowly settling on one line:
   "If you're building something meaningful, or investing in people who are, I'd love to connect."
   Simple form (name, email, "I am a: Founder / Investor / Other", message) + LinkedIn, Instagram, YouTube, email.

## Rules about facts
- Do NOT invent deal sizes, client names, awards, testimonials, or statistics.
- Any number or logo is a clearly marked [PLACEHOLDER] in a single `content.config` file.
- Compliance/ethics are brand values: include a small, tasteful disclaimer in the footer
  ("Information on this site is for general purposes and is not investment advice or an offer of securities.")
  [PLACEHOLDER: have her confirm exact wording with her compliance advisor].

## Tech
Next.js (App Router) + TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis smooth scroll,
Framer Motion for micro-interactions, optional Three.js/OGL shader for the beam (fallback to CSS).
All copy, stats and links in one `content.config.ts`. Componentised, commented, clean.
Responsive mobile-first (most traffic comes from Instagram/LinkedIn on phones).
Performance: Lighthouse 90+, hero video < 4 MB (webm + mp4), lazy-load everything below the fold,
poster image, `prefers-reduced-motion` disables the beam sweep and pinned scroll.
Accessibility: AA contrast, focus states, keyboard nav, alt text, semantic HTML.
SEO: title, meta, Open Graph image (dark, gold name), JSON-LD Person + Organization.

## Deliverables
Full project code, README with setup, a list of every [PLACEHOLDER], and notes on where
real photography/video should go.

Also follow: 02_DESIGN_SYSTEM.md, 03_MOTION_SPEC.md, 04_COPY_DECK.md, 06_ANTI_AI_CHECKLIST.md
