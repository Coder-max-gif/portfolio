import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { site, socials } from "@/content.config";

// next/font downloads at build time and self-hosts with font-display: swap
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "profile",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0A0C10" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: site.company },
      url: site.url,
      image: `${site.url}/images/portrait.jpg`,
      sameAs: socials.map((s) => s.href).filter((h) => h.startsWith("http") && !h.includes("chat.whatsapp")),
    },
    {
      "@type": "Organization",
      name: site.company,
      description: "Boutique investment bank. Ambition deserves access.",
      founder: { "@type": "Person", name: site.name },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
