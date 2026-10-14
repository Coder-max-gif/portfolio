# MOTION SPEC

Global easing: cubic-bezier(0.16, 1, 0.3, 1) ("expo out"). Secondary: power3.inOut.
Durations: 0.9-1.4s for reveals, 0.4s for hovers. Nothing snappy, nothing bouncy.
Smooth scroll: Lenis (lerp 0.08). Sync Lenis with GSAP ticker / ScrollTrigger.
All motion off or simplified when `prefers-reduced-motion: reduce`.

## 0. Preloader (2.2s max, skip on repeat visit via sessionStorage)
Black screen. A single gold hairline draws across center (0.9s). Text "Lighthouse Capital" fades in
below, then whole screen lifts away upward (clip-path) revealing the hero.

## 1. Hero
- Background video loop (muted, playsinline), slow scale 1.08 -> 1.0 over 12s.
- THE BEAM: a soft conical gold light (radial/conic gradient or fragment shader, mix-blend-mode: screen)
  sweeps left-to-right over 6s, loops with long ease pause. It "lights" the name:
  each letter of "Anuvamshi Shetty" goes from opacity 0.08 -> 1 as the beam passes (stagger from beam position).
- Desktop: after intro, beam center follows the cursor with 0.6s lag.
- Mobile: beam auto-sweeps; optional gentle tilt with device orientation (only if permission granted).
- Tagline "Ambition deserves access." fades up 24px, 0.2s after name finishes.
- Scroll cue: 1px gold line, 60px tall, pulsing scaleY 0.3 -> 1.

## 2. Origin story (pinned section, ~500vh)
ScrollTrigger pin + scrub. One statement per viewport, centered:
each line: opacity 0 -> 1, y 40 -> 0, blur 12px -> 0; previous line fades up and out.
Background slowly darkens/brightens between lines. A thin vertical gold progress line on the left.
Final line is larger and settles on the beam.

## 3. What Lighthouse does
Panels enter with staggered clip-path reveals (inset 100% -> 0), offset vertical positions (asymmetric).
Parallax: panels move at different speeds (0.9x, 1.0x, 1.1x).
Hover: border brightens, inner light follows cursor, content shifts 4px.

## 4. Principles (01-04)
Each row: giant number outlines in, hairline draws across, title slides up from a mask,
descriptor fades. On hover the other rows dim to 30%.

## 5. Founders / Investors split
Hover left: left expands to 62%, right shrinks to 38% and dims. Reverse for right. 0.8s ease.
Mobile: stacked, tap to expand.

## 6. Beliefs (full-screen statements)
Word-by-word reveal as the section scrubs. Key word (e.g. "intention", "compounds") in italic gold.

## 7. Beyond the boardroom
Horizontal scroll gallery (pinned) of 4-5 images with captions: self-growth, fitness, storytelling, mental performance.
Images have slow inner parallax and a gold frame offset.

## 8. Credentials
Rows reveal with hairline draw; numbers (if provided) count up once, 1.6s, tabular numerals.

## 9. Contact
Beam slows and settles on the closing line. Form fields: underline-only inputs, gold on focus.
Submit button: magnetic. Success state: the beam brightens once and a line says "Received. Thank you."

## Page transitions
Fade through ink (0.5s out, 0.7s in) between subpages.

## Micro
- Nav hide/show on scroll direction.
- Section label (e.g. "02 / Origin") in the margin updates as you scroll.
- Images: fade + 1.12 -> 1.0 scale on enter.
- Never animate more than 2-3 things at once. Silence is part of the luxury.

## Performance guardrails
Animate only transform and opacity (plus clip-path/filter sparingly). will-change on pinned items only.
Kill ScrollTriggers on unmount. Cap DPR at 1.5 for the shader. Pause video when off screen.
