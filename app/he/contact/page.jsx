import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BookCallButton from "@/components/BookCallButton";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "/he/contact",
    languages: { en: "/contact", he: "/he/contact", "x-default": "/contact" },
  },
  title: "צור קשר",
  description:
    "צרו קשר עם Quicklai — השאירו פרטים ואנחנו נחזור אליכם בנוגע לפתרונות AI לעסק הקטן או הבינוני שלכם.",
};

const thisPageSchema = pageSchema({
  type: "ContactPage",
  path: "/he/contact",
  name: "צור קשר עם Quicklai",
  description: metadata.description,
  inLanguage: "he",
});
const crumbs = breadcrumbSchema([{ name: "צור קשר", path: "/he/contact" }], "he");

export default function ContactHe() {
  return (
    <main>
      <Nav locale="he" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(thisPageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />

      <section className="max-w-[560px] mx-auto px-5 pt-16 pb-8 text-center">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          בואו נדבר.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          השאירו פרטים ואנחנו נחזור אליכם בדרך שהכי נוחה לכם — טלפון, וואטסאפ
          או אימייל. זה בחינם וללא שום התחייבות.
        </p>
        <div className="mt-6">
          <BookCallButton source="contact page (he)" locale="he" />
        </div>
      </section>

      <ContactForm locale="he" />

      <Footer locale="he" />
    </main>
  );
}
