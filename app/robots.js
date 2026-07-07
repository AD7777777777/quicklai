import { SITE } from "@/lib/config";

export default function robots() {
  return {
    rules: [
      {
        // Explicitly welcome AI answer-engine crawlers plus everyone else.
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
