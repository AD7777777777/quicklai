import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";
import { pageSchema, breadcrumbSchema, serviceListSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "/he/services",
    languages: { en: "/services", he: "/he/services", "x-default": "/services" },
  },
  title: "שירותים",
  description:
    "‎Quicklai‎ מציעה ייעוץ ‎AI‎ מיידי לבעלי עסקים קטנים ובינוניים — יחד עם פתרונות ‎AI‎ מותאמים אישית, סוכני ‎AI‎ וכלי אוטומציה לניהול ולשיווק. השאירו פרטים ואנחנו נחזור אליכם.",
};

const services = [
  {
    title: "ייעוץ ‎AI‎ מיידי",
    desc: "שאלו כל שאלה עסקית וקבלו קריאה ברורה וממוקדת על הבעיה המרכזית — תוך שניות, בחינם.",
  },
  {
    title: "עוזר שיווק ‎AI‎",
    desc: "שומר על שיווק עקבי — כותב ומתזמן פוסטים ואימיילים בסגנון שלכם, והופך רעיון אחד לתוכן בכל הערוצים.",
  },
  {
    title: "ייעוץ מתמשך",
    desc: "לבעלים שרוצים יועץ בצד שלהם — תמיכה מעמיקה ומתמשכת המותאמת לעסק שלכם.",
  },
  {
    title: "פתרונות ‎AI‎",
    desc: "כלי ‎AI‎ מותאמים אישית שנבנים סביב העסק שלכם — מעוזרי צ'אט חכמים ועד תמיכה בקבלת החלטות שמתאימה לאופן שבו אתם באמת עובדים.",
  },
  {
    title: "סוכני ‎AI‎",
    desc: "סוכנים אוטונומיים שמבצעים משימות אמיתיות עבורכם: מענה ללקוחות, סינון לידים, מעקב ועוד — מסביב לשעון.",
  },
  {
    title: "כלי אוטומציה",
    desc: "ייעלו את העבודה החוזרת שאוכלת לכם את היום — חברו את הכלים שלכם, הסירו שלבים ידניים ותנו לעבודה השגרתית לרוץ מעצמה.",
  },
];

const serviceFaqs = [
  {
    q: "כמה עולה ‎Quicklai‎?",
    a: "היועץ הדיגיטלי והשיחה הראשונה חינמיים. ייעוץ מתמשך נדון בהמשך, בהתאם למה שהעסק שלכם באמת צריך.",
  },
  {
    q: "באילו תחומים ‎Quicklai‎ מייעצת?",
    a: "‎Quicklai‎ מתמקדת בניהול ושיווק עסקי — שירות לקוחות, יצירת לידים ומעקב, שיווק ותוכן, אוטומציה ותפעול — תמיד מתוך מבט על היכן ‎AI‎ ואוטומציה יכולים לעזור.",
  },
  {
    q: "איך מתחילים?",
    a: "שאלו את היועץ הדיגיטלי שאלה בעמוד הבית, או השאירו פרטים ואנחנו נחזור אליכם.",
  },
  {
    q: "אילו פתרונות ‎AI‎ ‎Quicklai‎ בונה?",
    a: "‎Quicklai‎ בונה פתרונות ‎AI‎ מותאמים אישית, סוכני ‎AI‎ וכלי אוטומציה לעסקים קטנים ובינוניים — כולל עוזרי צ'אט, סוכני סינון ומעקב אחרי לידים, ואוטומציה שמסירה עבודה ידנית חוזרת.",
  },
];

const thisPageSchema = pageSchema({
  type: "WebPage",
  path: "/he/services",
  name: "שירותי ‎Quicklai‎",
  description: metadata.description,
  inLanguage: "he",
});
const crumbs = breadcrumbSchema([{ name: "שירותים", path: "/he/services" }], "he");
const servicesSchema = serviceListSchema(services, "he");

export default function ServicesHe() {
  return (
    <main>
      <Nav locale="he" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(thisPageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(servicesSchema)} />

      <section className="max-w-[980px] mx-auto px-5 pt-16 pb-6 text-center bg-white">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          איך ‎Quicklai‎ עוזרת.
        </h1>
        <p className="text-[19px] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
          משאלה מהירה ועד תוכנית מלאה — ליווי שנפגש איתכם איפה שאתם נמצאים.
        </p>
      </section>

      <section className="max-w-[980px] mx-auto px-5 py-8 grid sm:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-[19px] font-medium text-gray-900 mb-2">{s.title}</h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      <div className="text-center py-8">
        <BookCallButton source="services page (he)" locale="he" />
      </div>

      <FAQ items={serviceFaqs} locale="he" />
      <Footer locale="he" />
    </main>
  );
}
