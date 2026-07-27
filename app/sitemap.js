import { SITE, BLOG_POSTS } from "@/lib/config";
import { POST_CONTENT } from "@/lib/posts";
import { BLOG_POSTS_HE } from "@/lib/content/he-blog-meta";
import { POST_CONTENT_HE } from "@/lib/content/he-posts";

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

  // Hebrew pages (now fully live, including the blog — priority matches
  // English since the Hebrew blog is no longer a thinner placeholder).
  const hePages = pageDefs.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}/he${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // English blog posts use their refreshed date when present — a real
  // freshness signal.
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

  // Hebrew blog posts — same treatment, same slugs, same freshness logic.
  const blogPagesHe = BLOG_POSTS_HE.map((post) => {
    const full = POST_CONTENT_HE[post.slug];
    const modified = (full && full.updated) || post.date;
    return {
      url: `${SITE.url}/he/blog/${post.slug}`,
      lastModified: new Date(modified),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [...enPages, ...hePages, ...blogPages, ...blogPagesHe];
}
