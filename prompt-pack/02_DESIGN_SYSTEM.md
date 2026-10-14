# DESIGN SYSTEM

## Mood
Midnight harbour. Dark water, one warm light. Think: watch ad shot on black velvet,
a Gucci campaign in a dim marble hall, an Apple keynote title slide.

## Colors (CSS variables)
--ink:        #0A0C10   /* main background, near-black with a hint of blue */
--ink-2:      #12151B   /* raised surfaces */
--ivory:      #F3EEE4   /* primary text */
--ivory-dim:  #A9A59B   /* secondary text */
--gold:       #C9A96E   /* the beam, hairlines, key accents */
--gold-soft:  rgba(201,169,110,0.18)
--bronze:     #7A6340   /* borders, subtle details */
Rules: gold is ONLY for the beam, hairlines, numbers and one CTA. Never gold text for paragraphs.
No purple, no blue-purple gradients, no neon, no pure white backgrounds.
Optional light "paper" section (#EFE9DD background, ink text) used once for contrast, e.g. Principles.

## Typography
- Display: Cormorant Garamond (300/400, italic for emphasis) OR "Fraunces" light. Size clamp(3rem, 9vw, 9rem), leading 0.95, tracking -0.02em.
- Body/UI: DM Sans 400/500, 16-18px, leading 1.7, max line length 62ch.
- Labels: DM Sans 500, 11-12px, UPPERCASE, letter-spacing 0.22em, ivory-dim.
- Numbers (01-04, stats): display serif, very large, outlined or gold.
- Self-host fonts, `font-display: swap`.

## Layout
- 12-col grid, but deliberately break it: oversized type bleeding off edges, text overlapping images, asymmetric panels.
- Generous spacing: sections min-height 100vh, 160-240px vertical padding.
- Max content width 1280px; hero and statements full-bleed.
- Subtle film grain overlay (2-4% opacity, animated at 8fps) and a soft vignette.

## Glassmorphism (strict use)
Allowed ONLY on: top nav, the 4 "What Lighthouse does" panels, contact form card.
.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(22px) saturate(140%);
  border: 1px solid rgba(201,169,110,0.22);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.5);
  border-radius: 20px;
}
Add a faint moving highlight on hover that follows the cursor inside the card.
Provide a solid fallback where backdrop-filter is unsupported.

## Components
- Buttons: pill, 1px gold border, transparent, text ivory; on hover the gold fills from the cursor point, text turns ink. Magnetic effect (8-12px).
- Links: underline draws left to right in gold.
- Cursor (desktop): small 8px gold dot + 40px ring that grows over interactive items. Hide on touch.
- Nav: logo mark (a minimal lighthouse/beam monogram "A" or "LC"), 4 links, "Get in touch" button. Hides on scroll down, returns on scroll up.
- Footer: tiny, calm, disclaimer + socials.

## Imagery
- Real photography only: black & white or warm low-key portraits, hands, notebooks, city at night, coastline/lighthouse, gym/focus details.
- Grade: deep blacks, warm highlights, slight desaturation. Duotone ink+gold for any stock fallback.
- Use thin 1px gold frames offset by 12px behind portraits for a "framed" luxury look.
