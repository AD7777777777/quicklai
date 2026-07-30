// A single thin diagonal accent line, fixed to the viewport — stays in
// place while the page scrolls, rather than moving with the content.
//
// Uses `fixed inset-0` (all four edges pinned to 0) rather than separate
// width/height classes — this is the most robust way to guarantee the SVG
// covers the full viewport edge-to-edge with no risk of clipping on narrow
// (mobile) screens, since it doesn't depend on resolving a percentage width
// against a containing block that could be ambiguous in some layouts.
//
// Purely decorative — pointer-events are disabled so it never blocks
// clicks, and it renders behind everything (-z-10), which is what lets it
// show through in the empty space around content while staying invisible
// wherever a card sits on top of it.
//
// Mirrors horizontally on English pages, so English and Hebrew show the
// line running in opposite diagonal directions.
export default function BackgroundLine({ locale = "en" }) {
  const mirror = locale === "en";
  return (
    <svg
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        x1={mirror ? "0" : "100"}
        y1="15"
        x2={mirror ? "100" : "0"}
        y2="62"
        stroke="#F59E0B"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
