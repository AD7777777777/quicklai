import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";
import { HOME_FAQS, SITE } from "@/lib/content/he";

export const metadata = {
  alternates: {
    canonical: "/he",
    languages: {
      en: "/",
      he: "/he",
      "x-default": "/",
    },
  },
};

export default function HomeHe() {
  return (
    <main>
      <Nav locale="he" />

      <section className="max-w-[980px] mx-auto px-5 pt-16 pb-6 text-center bg-white">
        <h1 className="text-[40px] sm:text-[48px] font-semibold text-gray-900 tracking-tight leading-tight">
          שוחחו עם היועץ שלכם לפתרונות ‎AI‎.
        </h1>
        <p className="text-[19px] text-gray-500 mt-3 max-w-[560px] mx-auto leading-relaxed">
          ייעוץ מותאם אישית, וכלי ‎AI‎ שהופכים אותו למעשי — לניהול ושיווק
          חכמים יותר לעסק שלכם. שאלו כל שאלה כדי להתחיל.
        </p>
      </section>

      <section className="max-w-[980px] mx-auto px-5 pb-10">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
          <ChatWidget locale="he" />
        </div>
      </section>

      {/* Answer-first definition block — same AEO purpose as the English
          version, giving engines a clean, quotable "What is Quicklai?". */}
      <section className="max-w-[680px] mx-auto px-5 py-12 text-center bg-white">
        <h2 className="text-[24px] font-semibold text-gray-900 tracking-tight mb-3">
          מה זה Quicklai?
        </h2>
        <p className="text-[17px] text-gray-600 leading-relaxed mb-5">
          {SITE.definition}
        </p>
        <BookCallButton source="homepage (he)" variant="inline" locale="he" />
      </section>

      <FAQ items={HOME_FAQS} locale="he" />

      <Footer locale="he" />
    </main>
  );
}
