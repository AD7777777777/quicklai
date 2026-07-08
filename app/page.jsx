import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FAQ from "@/components/FAQ";
import { HOME_FAQS } from "@/lib/config";

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Hero: minimal text, then the widget takes the stage */}
      <section className="max-w-[980px] mx-auto px-5 pt-16 pb-6 text-center">
        <h1 className="text-[40px] sm:text-[48px] font-semibold text-gray-900 tracking-tight leading-tight">
          Chat with your business advisor.
        </h1>
        <p className="text-[19px] text-gray-500 mt-3 max-w-[560px] mx-auto leading-relaxed">
          Instant, expert guidance for small and medium businesses. Ask anything —
          strategy, cash flow, growth, hiring.
        </p>
      </section>

      {/* The widget — centerpiece of the whole site */}
      <section className="max-w-[980px] mx-auto px-5 pb-10">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
          <ChatWidget />
        </div>
      </section>

      <FAQ items={HOME_FAQS} />

      <Footer />
    </main>
  );
}
