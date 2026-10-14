import { footer } from "@/content.config";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="px-6 md:px-8" style={{ paddingBottom: "calc(var(--safe-b) + 28px)" }}>
      <div className="mx-auto max-w-[1200px] border-t border-ink/10 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-ink-soft">
            <Logo className="h-6 w-6 text-ink" />
            <span className="text-[13px]">{footer.copyright}</span>
          </div>
          <a href="#top" className="link-draw self-start text-[13px] text-ink-soft sm:self-auto">
            Back to top &uarr;
          </a>
        </div>
        <p className="mt-6 max-w-[80ch] text-[12px] leading-relaxed text-ink-mute">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
