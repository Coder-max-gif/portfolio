/** Film grain (animated at 8fps via steps()) + soft vignette over everything. */
export default function Atmosphere() {
  return (
    <>
      <div className="vignette" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
        <div className="grain" />
      </div>
    </>
  );
}
