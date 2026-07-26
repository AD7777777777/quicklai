"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Computes the equivalent URL in the other language and links to it.
// Blog POST pages don't have Hebrew equivalents yet (Phase 2), so from an
// English blog post the Hebrew link falls back to the Hebrew blog index
// rather than a page that doesn't exist yet.
export default function LocaleSwitcher({ locale }) {
  const pathname = usePathname() || "/";

  let targetHref;
  let targetLabel;

  if (locale === "he") {
    // On a Hebrew page → link to the English equivalent.
    targetHref = pathname.replace(/^\/he/, "") || "/";
    targetLabel = "EN";
  } else {
    // On an English page → link to the Hebrew equivalent.
    const isBlogPost = /^\/blog\/.+/.test(pathname);
    targetHref = isBlogPost ? "/he/blog" : `/he${pathname === "/" ? "" : pathname}`;
    targetLabel = "עברית";
  }

  return (
    <Link
      href={targetHref}
      className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 rounded-full px-3 py-1"
    >
      {targetLabel}
    </Link>
  );
}
