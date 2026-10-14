# Anuvamshi Shetty: Portfolio

This site was built from the prompt pack in `prompt-pack/`. The concept is **THE BEAM**: one warm light that sweeps a dark screen and reveals the content.

Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
|---|---|
| All copy, links, numbers | `content.config.ts` |
| Colours, type, glass, beam, grain | `app/globals.css` |
| Sections (in page order) | `components/Hero.tsx`, `Origin.tsx`, `About.tsx`, `Services.tsx`, `Principles.tsx`, `Split.tsx`, `Beliefs.tsx`, `Beyond.tsx`, `Credentials.tsx`, `Contact.tsx` |
| Global behaviour | `SmoothScroll.tsx` (Lenis), `Preloader.tsx`, `Cursor.tsx`, `Nav.tsx`, `SectionIndex.tsx`, `Reveals.tsx`, `Atmosphere.tsx` |
| Contact endpoint | `app/api/contact/route.ts` |
| Images | `public/images/` (`hero.jpg`, `portrait.jpg`, `og.jpg`) |

The portrait was graded from the supplied photo into a low-key ink-to-gold duotone with a side-lit vignette. The AI-generator watermark in the bottom-right corner was cropped out.

## PLACEHOLDERS: replace before launch

Never invent numbers, deals or clients. Content still marked `[PLACEHOLDER]` is hidden on the live site until you fill it in.

1. `site.url`: the final domain (used for OG + JSON-LD).
2. `contact.email`: the email address. The Email link appears once this is set.
3. `socials`: the LinkedIn and Instagram URLs. YouTube is already set to `@AnuvamshiShetty`.
4. `credentials.stats`: years of experience, founders supported and capital facilitated (they count up on scroll). Use plain numbers in `value` (e.g. `"8"`) and put any unit in `suffix` (e.g. `"+"`, `" Cr"`).
5. `principles[].descriptor`: one line each, written by Anuvamshi herself.
6. `footer.disclaimer`: confirm the exact wording with a compliance advisor.
7. `app/api/contact/route.ts`: connect an email provider (e.g. Resend or Postmark). Submissions are only logged to the server console for now.
8. Credentials: have her confirm each row.
9. Press, logos, sectors: not included. Add them only with her approval.

## Photography and video

- **Hero video**: set `hero.video` in `content.config.ts` to `{ webm, mp4 }` files in `public/video/`. The hero switches from the portrait to the video automatically, keeps the beam on top, and pauses the video off-screen. Target under 4 MB, no audio. See `prompt-pack/05_VIDEO_SHOOT_BRIEF.md`.
- **Beyond the boardroom**: set `beyond.items[].src` to real photos (self-growth, fitness, storytelling, mental performance), 4:5 portrait. Until then the panels are typographic.
- **More portraits**: replace `public/images/portrait.jpg` (960x1200) with a real low-key shoot when available.
- **OG image**: `public/images/og.jpg` (1200x630). Regenerate it if the portrait changes.

## Motion and accessibility

- `prefers-reduced-motion` turns off the beam sweep, pinned scroll, Lenis and every reveal. Content then renders statically.
- On touch devices the cursor is hidden and the beam sweeps automatically. The horizontal gallery becomes a vertical stack below 768px.
- Animations only touch transform, opacity, clip-path and filter. ScrollTriggers are killed on unmount.

## Final review

Go through `prompt-pack/06_ANTI_AI_CHECKLIST.md` before launch.
