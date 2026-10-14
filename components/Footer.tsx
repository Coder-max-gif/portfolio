import { footer, socials, contact, isPlaceholder } from "@/content.config";
import Logo from "./Logo";

export default function Footer() {
  const links = [
    ...socials.filter((s) => !isPlaceholder(s.href)),
    ...(!isPlaceholder(contact.email) ? [{ label: "Email", href: `mailto:${contact.email}` }] : []),
  ];
  return (
    <footer className="bg-[#07080B] px-6 pb-10 md:px-14">
      <div className="mx-auto max-w-[1280px] border-t border-ivory/10 pt-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 text-ivory-dim">
            <Logo className="h-6 w-6" />
            <span className="text-xs">{footer.copyright}</span>
          </div>
          <ul className="flex gap-6 text-xs text-ivory-dim">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="link-draw hover:text-ivory"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-[80ch] text-[11px] leading-relaxed text-ivory-dim/70">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
