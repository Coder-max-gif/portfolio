# Anuvamshi Shetty: Portfolio

This is a warm cream, Apple-style portfolio for the founder of Lighthouse Capital. It was built from the prompt pack in `prompt-pack/`, and the lighthouse "beam" idea still appears in the services cards and the night-time Beliefs section.

Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lenis (desktop wheel smoothing only).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
|---|---|
| All copy, links, numbers, image paths | `content.config.ts` |
| Colours, type, buttons, cards, form | `app/globals.css` |
| Sections (in page order) | `components/Hero.tsx`, `Origin.tsx`, `About.tsx`, `Services.tsx`, `Principles.tsx`, `Audience.tsx`, `Beliefs.tsx`, `Beyond.tsx`, `Credentials.tsx`, `Contact.tsx` |
| Shared | `Nav.tsx` (frosted bar + phone menu), `Reveal.tsx`, `MagneticButton.tsx`, `SmoothScroll.tsx`, `lib/motion.ts` |
| Contact endpoint | `app/api/contact/route.ts` |
| Images | `public/images/` |

## Signature effects

- **Hero:** her portrait opens from a rounded window to full-screen as you scroll. Her name is set in cream with `mix-blend-mode: difference`, so it reads dark on the cream background and light on the photo.
- **Origin:** a pinned paragraph whose words fill from faint to ink as you scroll.
- **Services:** cards that stick and stack, with earlier cards settling back.
- **Principles:** each row comes into full ink as it reaches the middle of the screen.
- **For founders / For investors:** an iOS-style segmented control with a sliding pill.
- **Beliefs:** the night section. A warm beam follows the cursor on desktop and drifts by itself on phones.
- **Beyond the boardroom:** a native swipe rail on phones; drag or arrows on desktop.

## Phones (iPhone and Android)

The site was tested in WebKit (iPhone 14) and Chrome (Pixel 7) as well as on desktop.

- `100svh` sizing, `viewport-fit=cover` and safe-area padding handle the notch and home bar.
- Form fields use 16px text, so iOS doesn't zoom in when you tap one.
- Nothing depends on hover. The founders/investors switch, menu and rail are all tap and swipe.
- Phones keep native momentum scrolling; Lenis only smooths mouse wheels.
- The iOS / Android "Reduce motion" setting is respected through `MotionConfig reducedMotion="user"`.

## Photography

- `hero.jpg`, `hero-mobile.jpg`, `portrait.jpg`: from the supplied portrait, graded warm, with the AI-generator watermark cropped out.
- `stage.jpg`, `stage-portrait.jpg`, `cafe.jpg`: her own photos from financewithanuvamshi.com, graded to match. Confirm she's happy to reuse them.
- To add more photo cards, add entries to `beyond.items` in `content.config.ts`.

## PLACEHOLDERS: replace before launch

Never invent numbers, deals or clients. Content still marked `[PLACEHOLDER]` is hidden on the live site until you fill it in.

1. `site.url`: the final domain (used for OG + JSON-LD).
2. `contact.email`: the email address. The Email link appears once this is set.
3. `socials`: the Instagram URL. LinkedIn, YouTube and the CFA WhatsApp group are already set.
4. `credentials.stats`: years of experience, founders supported and capital facilitated (they count up on scroll). Use plain numbers in `value` (e.g. `"8"`) and put any unit in `suffix` (e.g. `"+"`, `" Cr"`).
5. `principles[].descriptor`: one line each, written by Anuvamshi herself.
6. `footer.disclaimer`: confirm the exact wording with a compliance advisor.
7. `app/api/contact/route.ts`: connect an email provider (e.g. Resend or Postmark). Submissions are only logged to the server console for now.
8. Credentials: have her confirm each row.
9. Press, logos, sectors: not included. Add them only with her approval.

## Final review

Go through `prompt-pack/06_ANTI_AI_CHECKLIST.md` before launch.
