/** Monogram: a thin "A" whose crossbar becomes a beam of light. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none">
      <path d="M8 34 L20 6 L32 34" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.2 22 H39" stroke="#A47E45" strokeWidth="1.4" />
      <circle cx="20" cy="6" r="1.6" fill="#A47E45" />
    </svg>
  );
}
