import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

// PHASE 2 NOTE: Hebrew blog post translations aren't built yet. This page is
// a real, honest placeholder rather than an empty or broken page — once the
// 36 posts are translated (see lib/content/he-posts.js, to be created), this
// page swaps to a <BlogList> the same way the English blog index works.

export const metadata = {
  alternates: {
    canonical: "/he/blog",
    languages: { en: "/blog", he: "/he/blog", "x-default": "/blog" },
  },
  title: "בלוג",
  description:
    "מדריכים מעשיים על שימוש ב-AI לניהול ולשיווק עסק קטן — שירות לקוחות, מעקב אחרי לידים, שיווק, אוטומציה וצמיחה.",
};

const blogFaqsHe = [
  {
    q: "מה יש בבלוג של Quicklai?",
    a: "תשובות מעשיות על שימוש ב-AI בעסק קטן או בינוני — שירות לקוחות, מעקב אחרי לידים, שיווק, תוכן, אוטומציה ותפעול יומיומי. בקרוב גם בעברית.",
  },
  {
    q: "האם Quicklai יכולה לבנות את כלי ה-AI המתוארים בבלוג?",
    a: "כן. Quicklai בונה פתרונות AI מותאמים אישית, סוכני AI וכלי אוטומציה לעסקים קטנים ובינוניים. השאירו פרטים ואנחנו נחזור אליכם כדי לדבר על מה שיתאים לעסק שלכם.",
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

      <section className="max-w-[680px] mx-auto px-5 pt-16 pb-8">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          תשובות לבעלי עסקים.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          תשובות ישירות על שימוש ב-AI לניהול ולשיווק העסק שלכם.
        </p>
      </section>

      <section className="max-w-[680px] mx-auto px-5 pb-16">
        <div className="bg-[#F5F5F7] rounded-2xl p-8 text-center">
          <h2 className="text-[20px] font-semibold text-gray-900 mb-2">
            המדריכים בעברית בדרך.
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
            אנחנו עובדים על תרגום כל המדריכים לעברית. בינתיים, אפשר לעיין
            בבלוג באנגלית, או לשוחח עם היועץ הדיגיטלי שלנו בעברית ולקבל תשובה
            מיידית לשאלה שלכם.
          </p>
          <Link
            href="/blog"
            className="inline-block text-brand-blue underline text-[15px] font-medium"
          >
            למעבר לבלוג באנגלית ←
          </Link>
        </div>
      </section>

      <div className="text-center pb-8">
        <BookCallButton source="blog index (he)" locale="he" />
      </div>

      <FAQ items={blogFaqsHe} locale="he" />

      <Footer locale="he" />
    </main>
  );
}
