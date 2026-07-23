import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import FAQ from "@/components/FAQ";
import { BLOG_POSTS, BLOG_FAQS } from "@/lib/config";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog",
  description:
    "Practical answers on using AI to manage and market a small business — customer service, lead follow-up, marketing, automation, and growth.",
};

// AEO: page-level schema + breadcrumbs, linked to the Organization entity.
const thisPageSchema = pageSchema({
  type: "CollectionPage",
  path: "/blog",
  name: "Quicklai blog",
  description: metadata.description,
});
const crumbs = breadcrumbSchema([{ name: "Blog", path: "/blog" }]);

export default function Blog() {
  return (
    <main>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(thisPageSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(crumbs)}
      />
      <section className="max-w-[680px] mx-auto px-5 pt-16 pb-8">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          Answers for business owners.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          Straight answers on using AI to manage and market your business.
        </p>
      </section>

      {/* Paginated list: 7 posts per page with < 1–7 > controls. */}
      <section className="max-w-[680px] mx-auto px-5 pb-16">
        <BlogList posts={BLOG_POSTS} />
      </section>

      {/*
        AEO: hidden crawlable links to every post. Posts aren't clickable in the
        visible UI (per design), but AI answer engines and search crawlers still
        need a path to each post page — these keep them discoverable and indexed.
      */}
      <nav aria-hidden="true" className="sr-only">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        ))}
      </nav>

      <FAQ items={BLOG_FAQS} />

      <Footer />
    </main>
  );
}
