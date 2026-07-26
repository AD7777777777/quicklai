import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "/he/about",
    languages: { en: "/about", he: "/he/about", "x-default": "/about" },
  },
  title: "אודות",
  description:
    "Quicklai עוזרת לבעלי עסקים קטנים ובינוניים לקבל הכוונה ברורה ומהירה — והופכת את הבהירות הזו לפעולה עם כלי AI שאנחנו בונים עבורם.",
};

const aboutFaqs = [
  {
    q: "למה Quicklai קמה?",
    a: "רוב בעלי העסקים הקטנים והבינוניים יודעים ש-AI יכול לעזור, אבל אין להם זמן להבין איפה. Quicklai גשרה על הפער הזה — היא מזהה את אתגרי הניהול והשיווק האמיתיים שלכם, ואז ממליצה על כלי AI ספציפיים שהיא יכולה לבנות כדי לפתור אותם.",
  },
  {
    q: "במה Quicklai שונה ממנוע חיפוש?",
    a: "חיפוש נותן לכם מאמרים כלליים. Quicklai קוראת את הסיטואציה הספציפית שלכם, ואז ממליצה על כלי AI ואוטומציות קונקרטיים שהיא יכולה לבנות כדי לפתור אותה — וחוזרת אליכם כדי להפוך את זה למציאות.",
  },
];

const thisPageSchema = pageSchema({
  type: "AboutPage",
  path: "/he/about",
  name: "אודות Quicklai",
  description: metadata.description,
  inLanguage: "he",
});
const crumbs = breadcrumbSchema([{ name: "אודות", path: "/he/about" }], "he");

export default function AboutHe() {
  return (
    <main>
      <Nav locale="he" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(thisPageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />

      <article className="max-w-[680px] mx-auto px-5 pt-16 pb-4">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-6">
          ייעוץ ברור, בנוי עבור בעלי עסקים.
        </h1>
        <div className="prose text-[17px] text-gray-600 leading-relaxed flex flex-col gap-5">
          <p>
            ניהול עסק קטן או בינוני דורש קבלת החלטות גדולות בזמן מוגבל — ומתוך
            ידיעה ש-AI יכול לעזור, אבל בלי לדעת מאיפה להתחיל. Quicklai קיימת
            כדי לשנות את זה.
          </p>
          <p>
            היועץ הדיגיטלי שלנו מגיע לליבת אתגרי הניהול והשיווק שלכם, ואז
            ממליץ על כלי AI ואוטומציות ספציפיים שאנחנו יכולים לבנות כדי לפתור
            אותם. כשתהיו מוכנים, השאירו פרטים ואנחנו נחזור אליכם כדי להפוך את
            ההמלצות האלה לתוכנית אמיתית.
          </p>
          <p>
            בלי ז'רגון. בלי הייפ. רק ייעוץ מעשי ו-AI שבאמת מקדם את העסק שלכם
            קדימה.
          </p>
        </div>
      </article>

      <FAQ items={aboutFaqs} locale="he" />
      <Footer locale="he" />
    </main>
  );
}
