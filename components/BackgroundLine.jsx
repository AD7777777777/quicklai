// A single thin diagonal accent line, positioned at the top of the page and
// scrolling away naturally with the page content (not pinned to the
// viewport). The container is a generous fixed height (well beyond one
// screen) so the line stays visible behind content that starts lower down
// on pages with more copy above it — like a blog list or an About page's
// prose — not just on the homepage where the hero fits in one screen.
//
// The y1/y2 values are percentages of that 1600px-tall container, not of
// the viewport — so they're deliberately much smaller than they'd be for a
// one-screen-tall container. If you change the container height, these
// need to scale with it: y% = (target pixel position / container height) * 100.
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
      className="absolute top-0 left-0 w-full h-[1600px] pointer-events-none -z-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        x1={mirror ? "0" : "100"}
        y1="18"
        x2={mirror ? "100" : "0"}
        y2="43"
        stroke="#F59E0B"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
