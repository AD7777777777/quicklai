import { SITE, BLOG_POSTS } from "@/lib/config";
import { POST_CONTENT } from "@/lib/posts";

export default function sitemap() {
  // Priority reflects importance to AI/search crawlers: home first, then the
  // pages that answer real questions.
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Blog posts use their refreshed date when present — a real freshness signal.
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

  return [...staticPages, ...blogPages];
}
