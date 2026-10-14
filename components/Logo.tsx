/** Monogram: a thin "A" whose crossbar becomes a beam of light. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none" stroke="currentColor">
      <path d="M8 34 L20 6 L32 34" strokeWidth="1" />
      <path d="M13.2 22 H39" strokeWidth="1" className="text-gold" stroke="currentColor" />
      <circle cx="20" cy="6" r="1.4" fill="currentColor" stroke="none" className="text-gold" />
    </svg>
  );
}
