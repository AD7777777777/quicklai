import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";

export const metadata = {
  title: "Services",
  description:
    "Quicklai offers instant AI business guidance and free 30-minute business mapping calls for small and medium business owners — covering strategy, cash flow, growth, hiring, and operations.",
};

const services = [
  {
    title: "Instant AI guidance",
    desc: "Ask any business question and get a clear, high-level read on the core issue — in seconds, free.",
  },
  {
    title: "Business mapping call",
    desc: "A free 30-minute call to understand where your business is, where you want it to go, and the highest-impact next steps.",
  },
  {
    title: "Ongoing advisory",
    desc: "For owners who want a advisor in their corner — deeper, continued support tailored to your business.",
  },
];

const serviceFaqs = [
  {
    q: "How much does Quicklai cost?",
    a: "The AI advisor and the first business mapping call are free. Ongoing advisory is discussed on the call, based on what your business actually needs.",
  },
  {
    q: "What areas does Quicklai advise on?",
    a: "Strategy, cash flow and profitability, growth and marketing, hiring and team structure, pricing, and day-to-day operations.",
  },
  {
    q: "How do I get started?",
    a: "Ask the AI advisor a question on the homepage, or book a free 30-minute business mapping call directly.",
  },
];

export default function Services() {
  return (
    <main>
      <Nav />
      <section className="max-w-[980px] mx-auto px-5 pt-16 pb-6 text-center">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          How Quicklai helps.
        </h1>
        <p className="text-[19px] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
          From a quick question to a full plan — guidance that meets you where
          you are.
        </p>
      </section>

      <section className="max-w-[980px] mx-auto px-5 py-8 grid sm:grid-cols-3 gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white border border-gray-100 rounded-2xl p-6"
          >
            <h2 className="text-[19px] font-medium text-gray-900 mb-2">
              {s.title}
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      <div className="text-center py-8">
        <BookCallButton source="services page" />
      </div>

      <FAQ items={serviceFaqs} />
      <Footer />
    </main>
  );
}
