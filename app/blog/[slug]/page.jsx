import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { POST_CONTENT } from "@/lib/posts";
import { SITE } from "@/lib/config";

export function generateStaticParams() {
  return Object.keys(POST_CONTENT).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = POST_CONTENT[params.slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default function BlogPost({ params }) {
  const post = POST_CONTENT[params.slug];
  if (!post) notFound();

  // AEO: Article schema + FAQPage schema on every post.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
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
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-blue hover:bg-brand-bluehover text-white rounded-full px-7 py-3 text-[16px] font-medium transition-colors"
          >
            Book your free call →
          </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}
