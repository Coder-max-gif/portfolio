/**
 * All copy, links and numbers for the site live here.
 * Source: 04_COPY_DECK.md (Anuvamshi's own words, lightly edited).
 *
 * RULE: never invent numbers, deals, clients or awards.
 * Anything not yet confirmed is marked PLACEHOLDER and is hidden on the
 * live site until it is replaced (see `isPlaceholder`).
 */

export const PLACEHOLDER = "[PLACEHOLDER]";
export const isPlaceholder = (v: string | null | undefined) =>
  !v || v.includes("[PLACEHOLDER");

export const site = {
  url: "https://anuvamshishetty.com", // [PLACEHOLDER: final domain]
  title: "Anuvamshi Shetty | Founder, Lighthouse Capital",
  description:
    "Founder of Lighthouse Capital, a boutique investment bank built on one belief: ambition deserves access.",
  name: "Anuvamshi Shetty",
  company: "Lighthouse Capital",
};

export const hero = {
  label: "Founder, Lighthouse Capital",
  name: "Anuvamshi Shetty",
  tagline: "Ambition deserves access.",
  cta: "Get in touch",
  // Drop real footage here when the shoot is done (see 05_VIDEO_SHOOT_BRIEF.md).
  // Leave null to use the graded portrait + animated beam fallback.
  video: null as null | { webm: string; mp4: string; mobileMp4?: string },
  poster: "/images/hero.jpg",
  posterMobile: "/images/hero-mobile.jpg",
};

/** Photography. Stage + cafe photos come from her existing site (financewithanuvamshi.com). */
export const images = {
  portrait: "/images/portrait.jpg",
  stage: "/images/stage.jpg",
  stagePortrait: "/images/stage-portrait.jpg",
  cafe: "/images/cafe.jpg",
};

export const origin = [
  "No elite network.",
  "No VC circles.",
  "No safety nets.",
  "Just curiosity, resilience, and a conviction.",
  "Founders who build from scratch deserve the same opportunities as anyone else.",
];

export const about = [
  "I'm the founder of Lighthouse Capital, a boutique investment bank built on a simple belief: ambition deserves access.",
  "I started without the “traditional pedigree”: no elite alumni network, no VC circles, no safety nets. What I did have was curiosity, resilience, and a conviction that founders who build from scratch deserve the same opportunities as anyone else.",
  "Over the years, I've worked with early-stage companies, investors, and operators across sectors, helping founders raise capital, refine strategy, navigate compliance, and access the right people at the right time.",
];

export const services = {
  label: "What Lighthouse does",
  items: [
    { title: "Raise capital", body: "Helping founders reach the right investors, at the right stage." },
    { title: "Refine strategy", body: "Sharper positioning, clearer plans, stronger stories." },
    { title: "Navigate compliance", body: "Getting the structure and the paperwork right." },
    { title: "Access the right people", body: "The right people, at the right time." },
  ],
  supporting:
    "Deal sourcing. Investment facilitation. Government incentives. An ecosystem where founders and investors create meaningful outcomes together.",
};

export const principles = [
  // Descriptors: ask Anuvamshi to write these herself. Empty = hidden.
  { title: "Clarity over chaos", descriptor: "" },
  { title: "Execution over noise", descriptor: "" },
  { title: "Ethics over shortcuts", descriptor: "" },
  { title: "Long-term over instant wins", descriptor: "" },
];

export const split = {
  founders: {
    label: "For founders",
    body: "First-time or established, you deserve the credibility, capital and connections your idea has earned.",
    cta: "Get in touch",
  },
  investors: {
    label: "For investors",
    body: "Scouting your next opportunity? Meet founders who build with intention.",
    cta: "Get in touch",
  },
  closing:
    "My goal remains consistent: to help good ideas get the credibility, capital, and connections they deserve.",
};

/** `key` is the word rendered in italic gold. */
export const beliefs = [
  { text: "I believe in building with intention, not virality.", key: "intention," },
  { text: "I believe consistency compounds.", key: "compounds." },
  {
    text: "And I believe the right people always find each other when the work speaks for itself.",
    key: "itself.",
  },
];

export const beyond = {
  label: "Beyond the boardroom",
  body: "Outside work, I'm deeply invested in self-growth, fitness, storytelling, and mental performance, because entrepreneurship is not just a business journey, it's a psychological one.",
  // Replace `src` with real photography. null = typographic panel.
  items: [
    { caption: "Self-growth", src: "/images/cafe.jpg" as string | null },
    { caption: "Storytelling", src: "/images/stage-portrait.jpg" as string | null },
  ],
};

export const credentials = {
  rows: [
    { title: "Former investment banker", detail: "" },
    { title: "Equity research analyst", detail: "" },
    { title: "CFA Level 3 candidate", detail: "" },
    { title: "Founder, AccelRevenue", detail: "Connecting women founders with investors." },
    { title: "Educator on YouTube", detail: "@AnuvamshiShetty", href: "https://www.youtube.com/@AnuvamshiShetty" },
    {
      title: "CFA preparation material",
      detail: "Join the WhatsApp group",
      href: "https://chat.whatsapp.com/GbIZ8FGaUT43KHjmvSTVZl",
    },
  ] as { title: string; detail: string; href?: string }[],
  // Numbers count up once on scroll. Rows with a PLACEHOLDER value are hidden.
  stats: [
    { value: "[PLACEHOLDER]", suffix: "", label: "Years of experience" },
    { value: "[PLACEHOLDER]", suffix: "", label: "Founders supported" },
    { value: "[PLACEHOLDER]", suffix: "", label: "Capital facilitated" },
  ],
};

export const contact = {
  headline:
    "If you're building something meaningful, or investing in people who are, I'd love to connect.",
  roles: ["Founder", "Investor", "Other"],
  button: "Send",
  success: "Received. Thank you.",
  email: "[PLACEHOLDER: email address]",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anuvamshi-shetty-354aa7113/" },
  { label: "Instagram", href: "[PLACEHOLDER: Instagram URL]" },
  { label: "YouTube", href: "https://www.youtube.com/@AnuvamshiShetty" },
  { label: "CFA WhatsApp group", href: "https://chat.whatsapp.com/GbIZ8FGaUT43KHjmvSTVZl" },
];

export const footer = {
  copyright: "© 2026 Anuvamshi Shetty · Lighthouse Capital",
  // [PLACEHOLDER: confirm exact wording with compliance advisor]
  disclaimer:
    "Information on this site is for general purposes only and is not investment advice or an offer of securities.",
};

export const nav = [
  { label: "Story", href: "#origin" },
  { label: "Work", href: "#work" },
  { label: "Principles", href: "#principles" },
  { label: "Credentials", href: "#credentials" },
];
