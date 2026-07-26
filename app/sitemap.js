import { SITE, BLOG_POSTS } from "@/lib/config";
import { POST_CONTENT } from "@/lib/posts";

export default function sitemap() {
  // Priority reflects importance to AI/search crawlers: home first, then the
  // pages that answer real questions.
  const pageDefs = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  // English pages (unprefixed, at root).
  const enPages = pageDefs.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Hebrew pages (Phase 1 core site — /he/blog is a placeholder until Phase 2
  // adds translated posts, but the page itself is real and live, so it belongs
  // in the sitemap like any other page).
  const hePages = pageDefs.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}/he${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority: priority * 0.95, // fractionally lower while content is newer/thinner
  }));

  // English blog posts use their refreshed date when present — a real
  // freshness signal. (Hebrew posts are Phase 2, not in the sitemap yet.)
  const blogPages = BLOG_POSTS.map((post) => {
    const full = POST_CONTENT[post.slug];
    const modified = (full && full.updated) || post.date;
    return {
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(modified),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [...enPages, ...hePages, ...blogPages];
}
