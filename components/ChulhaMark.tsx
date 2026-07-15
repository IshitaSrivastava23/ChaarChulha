// ─────────────────────────────────────────────────────────────
// SIGNATURE ELEMENT: the "four hearths" mark.
// Four dots set like stove burners on a diamond axis — a nod to
// "Chaar Chulha" (four stoves). Used as the logo glyph and, in a
// muted wide-spaced form, as a section divider throughout the page.
// ─────────────────────────────────────────────────────────────
export function ChulhaMark({ className = "", animate = false }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="8" r="4.5" className={animate ? "fill-saffron-400 animate-flicker" : "fill-saffron-400"} />
      <circle cx="32" cy="20" r="4.5" className={animate ? "fill-clay-500 animate-flicker" : "fill-clay-500"} style={{ animationDelay: "0.3s" }} />
      <circle cx="20" cy="32" r="4.5" className={animate ? "fill-saffron-400 animate-flicker" : "fill-saffron-400"} style={{ animationDelay: "0.6s" }} />
      <circle cx="8" cy="20" r="4.5" className={animate ? "fill-clay-500 animate-flicker" : "fill-clay-500"} style={{ animationDelay: "0.9s" }} />
      <circle cx="20" cy="20" r="3" className="fill-charcoal-900" />
    </svg>
  );
}

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-clay-500" />
      <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-clay-500" />
    </div>
  );
}
