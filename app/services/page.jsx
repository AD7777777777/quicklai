import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";

export const metadata = {
  title: "Services",
  description:
    "Quicklai offers instant AI guidance and free 30-minute business mapping calls for small and medium business owners — plus custom AI solutions, AI agents, and automation tools for management and marketing.",
};

const services = [
  {
    title: "Instant AI guidance",
    desc: "Ask any business question and get a clear, high-level read on the core issue — in seconds, free.",
  },
  {
    title: "AI marketing assistant",
    desc: "Keeps your marketing consistent — drafting and scheduling posts and emails in your voice, and repurposing one idea across every channel.",
  },
  {
    title: "Ongoing advisory",
    desc: "For owners who want an advisor in their corner — deeper, continued support tailored to your business.",
  },
  {
    title: "AI solutions",
    desc: "Custom AI tools built around your business — from smart chat assistants to decision support that fits how you actually work.",
  },
  {
    title: "AI agents",
    desc: "Autonomous agents that handle real tasks for you: answering customers, qualifying leads, following up, and more — around the clock.",
  },
  {
    title: "Automation tools",
    desc: "Streamline the repetitive work that eats your day — connect your tools, remove manual steps, and let the busywork run itself.",
  },
];

const serviceFaqs = [
  {
    q: "How much does Quicklai cost?",
    a: "The AI advisor and the first business mapping call are free. Ongoing advisory is discussed on the call, based on what your business actually needs.",
  },
  {
    q: "What areas does Quicklai advise on?",
    a: "Quicklai focuses on business management and marketing — customer service, lead generation and follow-up, marketing and content, automation, and operations — always with an eye to where AI and automation can help.",
  },
  {
    q: "How do I get started?",
    a: "Ask the AI advisor a question on the homepage, or book a free 30-minute business mapping call directly.",
  },
  {
    q: "What AI solutions does Quicklai build?",
    a: "Quicklai builds custom AI solutions, AI agents, and automation tools for small and medium businesses — including chat assistants, lead qualification and follow-up agents, and workflow automation that removes repetitive manual work.",
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
