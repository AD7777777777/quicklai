import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "/he/privacy",
    languages: { en: "/privacy", he: "/he/privacy", "x-default": "/privacy" },
  },
  title: "מדיניות פרטיות",
  description:
    "איך Quicklai אוספת, משתמשת, שומרת ומגנה על המידע שאתם משתפים — כולל הפרטים שאתם מספקים כדי שנוכל לחזור אליכם.",
};

// NOTE: This is a clear, honest starting policy written in plain language.
// It is NOT legal advice. Translated from the English version — before you
// launch, and especially before relying on the "selected partners"
// data-sharing clause, have a lawyer review BOTH language versions against
// Israel's Privacy Protection Law and the GDPR (if you serve EU users).

const sections = [
  {
    h: "מה מדיניות זו מכסה",
    p: [
      "מדיניות זו מסבירה אילו מידע Quicklai אוספת כאשר אתם משתמשים ביועץ הדיגיטלי ובאתר שלנו, איך אנחנו משתמשים בו, כמה זמן אנחנו שומרים אותו, ומה הבחירות העומדות בפניכם. בשימוש ב-Quicklai או בהשארת פרטים, אתם מסכימים לנהלים המתוארים כאן.",
    ],
  },
  {
    h: "מידע שאנחנו אוספים",
    p: [
      "כשאתם משוחחים עם היועץ הדיגיטלי, אנחנו מעבדים את ההודעות שאתם שולחים כדי שהיועץ יוכל להגיב ולתת הכוונה רלוונטית.",
      "כשאתם מבקשים שנחזור אליכם, אנחנו אוספים את פרטי הקשר שאתם מספקים — שם, מספר טלפון, אימייל אופציונלי, ואיך תרצו שניצור קשר — יחד עם סיכום של ההקשר העסקי מהשיחה שלכם, כדי שנוכל לחזור אליכם בצורה מועילה.",
      "אנחנו עשויים גם לאסוף מידע טכני בסיסי באופן אוטומטי, כגון נתוני שימוש כלליים, כדי לשמור על תפקוד האתר ולשפר אותו.",
    ],
  },
  {
    h: "איך אנחנו משתמשים במידע שלכם",
    p: [
      "אנחנו משתמשים במידע שלכם כדי להגיב לשאלות שלכם, לחזור אליכם כפי שביקשתם, להתכונן לשיחה הזו, ולשפר את השירות שלנו.",
      "אנחנו משתמשים בהקשר העסקי מהשיחה שלכם רק כדי לתת לכם ייעוץ רלוונטי יותר ולהפוך את הייעוץ למועיל.",
    ],
  },
  {
    h: "שיתוף עם שותפים",
    p: [
      "כשאתם משאירים פרטים כדי לבקש ייעוץ, אתם מסכימים — כחלק מההסכמה שאתם נותנים באותו רגע — שאנחנו רשאים לשתף את הפרטים שלכם עם שותפים נבחרים כדי שיוכלו להציג הצעות רלוונטיות.",
      "תוכלו לבטל את ההסכמה הזו בכל עת על ידי פנייה אלינו, ואנחנו נפסיק לשתף את הפרטים שלכם מאותו רגע ואילך. אם תעדיפו לבקש ייעוץ בלי להסכים לשיתוף עם שותפים, פנו אלינו ישירות ונסדר זאת.",
    ],
  },
  {
    h: "כמה זמן אנחנו שומרים את המידע שלכם",
    p: [
      "אנחנו שומרים את פרטי הקשר ורישומי הייעוץ שלכם כל עוד נדרש כדי לספק את השירותים שלנו ולשמור תיעוד של ההסכמה שלכם, אלא אם תבקשו שנמחק אותם מוקדם יותר.",
    ],
  },
  {
    h: "הזכויות שלכם",
    p: [
      "יש לכם את הזכות לשאול אילו פרטים אישיים אנחנו מחזיקים עליכם, לתקן אותם, ולבקש שנמחק אותם. תוכלו גם לבטל כל הסכמה שנתתם. כדי לממש את הזכויות האלה, פנו אלינו בפרטים המופיעים למטה.",
    ],
  },
  {
    h: "איך אנחנו מגנים על המידע שלכם",
    p: [
      "אנחנו נוקטים באמצעים סבירים כדי לשמור על המידע שלכם מאובטח ולהגביל את הגישה אליו. אין מערכת מאובטחת לחלוטין, אבל אנחנו פועלים כדי להגן על הפרטים שלכם מפני גישה בלתי מורשית, אובדן או שימוש לרעה.",
    ],
  },
  {
    h: "צרו קשר",
    p: [
      "אם יש לכם שאלות לגבי מדיניות זו, או שתרצו לגשת למידע שלכם, לתקן אותו או למחוק אותו, פנו אלינו דרך עמוד יצירת הקשר שלנו.",
    ],
  },
];

const thisPageSchema = pageSchema({
  type: "WebPage",
  path: "/he/privacy",
  name: "מדיניות הפרטיות של Quicklai",
  description: metadata.description,
  inLanguage: "he",
});
const crumbs = breadcrumbSchema([{ name: "פרטיות", path: "/he/privacy" }], "he");

export default function PrivacyHe() {
  return (
    <main>
      <Nav locale="he" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(thisPageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />

      <article className="max-w-[680px] mx-auto px-5 pt-16 pb-8">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          מדיניות פרטיות
        </h1>
        <p className="text-[14px] text-gray-400 mb-10">
          עודכן לאחרונה:{" "}
          {new Date().toLocaleDateString("he-IL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-[20px] font-medium text-gray-900 mb-3">{s.h}</h2>
              <div className="flex flex-col gap-3">
                {s.p.map((para, j) => (
                  <p key={j} className="text-[16px] text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <Footer locale="he" />
    </main>
  );
}
