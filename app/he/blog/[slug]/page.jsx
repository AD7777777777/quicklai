import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import { POST_CONTENT_HE } from "@/lib/content/he-posts";
import { SITE } from "@/lib/content/he";

export function generateStaticParams() {
  return Object.keys(POST_CONTENT_HE).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = POST_CONTENT_HE[params.slug];
  if (!post) return {};
  const modified = post.updated || post.date;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE.url}/he/blog/${params.slug}`,
      languages: {
        en: `/blog/${params.slug}`,
        he: `/he/blog/${params.slug}`,
        "x-default": `/blog/${params.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: modified,
      url: `${SITE.url}/he/blog/${params.slug}`,
      locale: "he_IL",
    },
  };
}

export default function BlogPostHe({ params }) {
  const post = POST_CONTENT_HE[params.slug];
  if (!post) notFound();

  const modified = post.updated || post.date;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/he/blog/${params.slug}/#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: modified,
    inLanguage: "he",
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/he/blog/${params.slug}`,
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "בית", item: `${SITE.url}/he` },
      { "@type": "ListItem", position: 2, name: "בלוג", item: `${SITE.url}/he/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/he/blog/${params.slug}`,
      },
    ],
  };

  return (
    <main>
      <Nav locale="he" />
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
          href="/he/blog"
          className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          → כל הפוסטים
        </Link>
        <p className="text-[12px] text-gray-400 mt-6 mb-2">
          {new Date(post.date).toLocaleDateString("he-IL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.updated && post.updated !== post.date && (
            <span>
              {" · עודכן "}
              {new Date(post.updated).toLocaleDateString("he-IL", {
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

        <p className="text-[19px] text-gray-700 leading-relaxed mb-8 font-medium">
          {post.lead}
        </p>

        {post.takeaways && post.takeaways.length > 0 && (
          <div className="mb-10 bg-[#F5F5F7] rounded-2xl p-6">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">
              נקודות עיקריות
            </h2>
            <ul className="flex flex-col gap-2">
              {post.takeaways.map((t, i) => (
                <li
                  key={i}
                  className="text-[15px] text-gray-600 leading-relaxed flex gap-2.5"
                >
                  <span className="text-brand-amber flex-shrink-0">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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

        <div className="mt-14 pt-10 border-t border-gray-100">
          <h2 className="text-[24px] font-semibold text-gray-900 mb-6">
            שאלות נפוצות
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

        <div className="mt-12 bg-[#F5F5F7] rounded-2xl p-8 text-center">
          <h2 className="text-[22px] font-semibold text-gray-900 mb-2">
            רוצים להפעיל ‎AI‎ בעסק שלכם?
          </h2>
          <p className="text-[15px] text-gray-500 mb-5 max-w-[420px] mx-auto leading-relaxed">
            השאירו פרטים ואנחנו נחזור אליכם בנוגע לכלי הבינה המלאכותית
            הספציפיים ש-Quicklai יכולה לבנות עבור העסק שלכם.
          </p>
          <BookCallButton source={`blog: ${post.title} (he)`} locale="he" />
        </div>
      </article>

      <Footer locale="he" />
    </main>
  );
}
