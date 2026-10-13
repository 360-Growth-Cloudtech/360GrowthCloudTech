/**
 * Light hero background: warm cream base, soft logo-coloured glows, a faint
 * grid and two thin rings echoing the "360" mark. Pure CSS, no image to load.
 */
export function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fffaf5 0%, #fff3ea 100%)" }}
      aria-hidden
    >
      {/* Glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(249,93,22,0.16) 0%, transparent 70%), radial-gradient(ellipse 40% 45% at 95% 80%, rgba(255,168,0,0.16) 0%, transparent 70%), radial-gradient(ellipse 40% 45% at 0% 75%, rgba(234,67,12,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Faint grid, fading out towards the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 65% 60% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      {/* "360" rings */}
      <div className="absolute left-1/2 top-[42%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900/[0.06]" />
      <div className="absolute left-1/2 top-[42%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/20" />
    </div>
  );
}
