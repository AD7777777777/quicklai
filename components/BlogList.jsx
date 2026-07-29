"use client";

import { useState } from "react";
import { getUI } from "@/lib/content/ui";

const PER_PAGE = 7;

// Paginated blog list. Shows 7 posts per page with "< 1-7 >" style controls.
// All posts still live in the DOM via the hidden crawlable links in the parent
// page, so pagination here is purely a display convenience and doesn't affect AEO.
export default function BlogList({ posts, locale = "en" }) {
  const t = getUI(locale).blogList;
  const isRTL = locale === "he";

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / PER_PAGE);

  const start = page * PER_PAGE;
  const end = Math.min(start + PER_PAGE, posts.length);
  const visible = posts.slice(start, end);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  // In RTL reading order, "previous" points toward the right and "next"
  // toward the left — the opposite of LTR — so the icons swap with locale.
  const prevPoints = isRTL ? "9 18 15 12 9 6" : "15 18 9 12 15 6";
  const nextPoints = isRTL ? "15 18 9 12 15 6" : "9 18 15 12 9 6";

  return (
    <div>
      <div className="rounded-2xl border border-gray-100 divide-y divide-gray-100 px-5 bg-white">
        {visible.map((post) => (
          <article key={post.slug} className="py-6">
            <p className="text-[12px] text-gray-400 mb-1">
              {new Date(post.date).toLocaleDateString(isRTL ? "he-IL" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-[22px] font-medium text-gray-900 mb-1.5">
              {post.title}
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => canPrev && setPage(page - 1)}
          disabled={!canPrev}
          aria-label={t.prevAria}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={prevPoints} />
          </svg>
        </button>

        <span className="text-[14px] text-gray-500 tabular-nums min-w-[64px] text-center">
          {start + 1}–{end}
          <span className="text-gray-300"> {t.of} </span>
          {posts.length}
        </span>

        <button
          onClick={() => canNext && setPage(page + 1)}
          disabled={!canNext}
          aria-label={t.nextAria}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={nextPoints} />
          </svg>
        </button>
      </div>
    </div>
  );
}
