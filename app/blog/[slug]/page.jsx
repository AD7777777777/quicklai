import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import { POST_CONTENT } from "@/lib/posts";
import { SITE } from "@/lib/config";

export function generateStaticParams() {
  return Object.keys(POST_CONTENT).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = POST_CONTENT[params.slug];
  if (!post) return {};
  const modified = post.updated || post.date;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE.url}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: modified,
      url: `${SITE.url}/blog/${params.slug}`,
    },
  };
}

export default function BlogPost({ params }) {
  const post = POST_CONTENT[params.slug];
  if (!post) notFound();

  // AEO: BlogPosting schema + FAQPage schema on every post.
  // dateModified is a key freshness signal — engines treat pages without it as
  // potentially stale. It defaults to the published date but uses post.updated
  // when you've refreshed a post (bump that date when you edit content).
  const modified = post.updated || post.date;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${params.slug}/#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/blog/${params.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Breadcrumb schema gives engines a clean map of where this page sits.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/blog/${params.slug}`,
      },
    ],
  };

  return (
    <main>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-[680px] mx-auto px-5 pt-16 pb-8">
        <Link
          href="/blog"
          className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← All posts
        </Link>
        <p className="text-[12px] text-gray-400 mt-6 mb-2">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.updated && post.updated !== post.date && (
            <span>
              {" · Updated "}
              {new Date(post.updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </p>
        <h1 className="text-[36px] font-semibold text-gray-900 tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Lead answer — direct, quotable by AI engines */}
        <p className="text-[19px] text-gray-700 leading-relaxed mb-8 font-medium">
          {post.lead}
        </p>

        <div className="flex flex-col gap-8">
          {post.body.map((section, i) => (
            <div key={i}>
              <h2 className="text-[22px] font-medium text-gray-900 mb-2">
                {section.h}
              </h2>
              <p className="text-[17px] text-gray-600 leading-relaxed">
                {section.p}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ section — visible + schema */}
        <div className="mt-14 pt-10 border-t border-gray-100">
          <h2 className="text-[24px] font-semibold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {post.faqs.map((f, i) => (
              <div key={i} className="py-5">
                <h3 className="text-[17px] font-medium text-gray-900 mb-2">
                  {f.q}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-12 bg-[#F5F5F7] rounded-2xl p-8 text-center">
          <h2 className="text-[22px] font-semibold text-gray-900 mb-2">
            Want real direction on this?
          </h2>
          <p className="text-[15px] text-gray-500 mb-5 max-w-[420px] mx-auto leading-relaxed">
            A free 30-minute business mapping call turns this advice into a plan
            built for your business.
          </p>
          <BookCallButton source={`blog: ${post.title}`} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
