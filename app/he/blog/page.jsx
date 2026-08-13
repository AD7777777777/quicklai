import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";
import { BLOG_POSTS_HE } from "@/lib/content/he-blog-meta";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { rtlMeta } from "@/lib/content/he";

export const metadata = {
  alternates: {
    canonical: "/he/blog",
    languages: { en: "/blog", he: "/he/blog", "x-default": "/blog" },
  },
  title: rtlMeta("בלוג"),
  description: rtlMeta(
    "מדריכים מעשיים על שימוש ב‎AI‎ לניהול ולשיווק עסק קטן — שירות לקוחות, מעקב אחרי לידים, שיווק, אוטומציה וצמיחה."
  ),
};

const blogFaqsHe = [
  {
    q: "מה יש בבלוג של Quicklai?",
    a: "תשובות מעשיות על שימוש ב‎AI‎ בעסק קטן או בינוני — שירות לקוחות, מעקב אחרי לידים, שיווק, תוכן, אוטומציה ותפעול יומיומי.",
  },
  {
    q: "האם Quicklai יכולה לבנות את כלי הבינה המלאכותית המתוארים בבלוג?",
    a: "כן. Quicklai בונה פתרונות ‎AI‎ מותאמים אישית, סוכני ‎AI‎ וכלי אוטומציה לעסקים קטנים ובינוניים. השאירו פרטים ואנחנו נחזור אליכם כדי לדבר על מה שיתאים לעסק שלכם.",
  },
];

const thisPageSchema = pageSchema({
  type: "CollectionPage",
  path: "/he/blog",
  name: "הבלוג של Quicklai",
  description: metadata.description,
  inLanguage: "he",
});
const crumbs = breadcrumbSchema([{ name: "בלוג", path: "/he/blog" }], "he");

export default function BlogHe() {
  return (
    <main>
      <Nav locale="he" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(thisPageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />

      <section className="max-w-[680px] mx-auto px-5 pt-16 pb-8 bg-white">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          תשובות לבעלי עסקים.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          תשובות ישירות על שימוש ב‎AI‎ לניהול ולשיווק העסק שלכם.
        </p>
      </section>

      {/* Paginated list: 7 posts per page with < 1–7 > controls (arrow
          direction auto-mirrors for RTL inside BlogList). */}
      <section className="max-w-[680px] mx-auto px-5 pb-16">
        <BlogList posts={BLOG_POSTS_HE} locale="he" />
      </section>

      {/* AEO: hidden crawlable links to every post — same pattern as the
          English blog index. */}
      <nav aria-hidden="true" className="sr-only">
        {BLOG_POSTS_HE.map((post) => (
          <Link key={post.slug} href={`/he/blog/${post.slug}`}>
            {post.title}
          </Link>
        ))}
      </nav>

      <div className="text-center pb-8">
        <BookCallButton source="blog index (he)" locale="he" />
      </div>

      <FAQ items={blogFaqsHe} locale="he" />

      <Footer locale="he" />
    </main>
  );
}
