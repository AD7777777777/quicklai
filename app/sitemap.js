import { SITE, BLOG_POSTS } from "@/lib/config";

export default function sitemap() {
  const staticPages = ["", "/about", "/services", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
    })
  );

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...blogPages];
}
