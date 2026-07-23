import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FAQ from "@/components/FAQ";
import { HOME_FAQS, SITE } from "@/lib/config";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Hero: minimal text, then the widget takes the stage */}
      <section className="max-w-[980px] mx-auto px-5 pt-16 pb-6 text-center">
        <h1 className="text-[40px] sm:text-[48px] font-semibold text-gray-900 tracking-tight leading-tight">
          Chat with your AI solutions advisor.
        </h1>
        <p className="text-[19px] text-gray-500 mt-3 max-w-[560px] mx-auto leading-relaxed">
          Tailored advice and the AI tools to act on it — for smarter business
          management and marketing. Ask anything to get started.
        </p>
      </section>

      {/* The widget — centerpiece of the whole site */}
      <section className="max-w-[980px] mx-auto px-5 pb-10">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
          <ChatWidget />
        </div>
      </section>

      {/* Answer-first definition block. Kept compact to preserve the clean
          hero, but gives AI engines a clear, quotable "What is Quicklai?"
          statement — a strong signal for definition-style queries. */}
      <section className="max-w-[680px] mx-auto px-5 py-12 text-center">
        <h2 className="text-[24px] font-semibold text-gray-900 tracking-tight mb-3">
          What is Quicklai?
        </h2>
        <p className="text-[17px] text-gray-600 leading-relaxed">
          {SITE.definition}
        </p>
      </section>

      <FAQ items={HOME_FAQS} />

      <Footer />
    </main>
  );
}
