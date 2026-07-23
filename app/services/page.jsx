import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BookCallButton from "@/components/BookCallButton";
import { pageSchema, breadcrumbSchema, serviceListSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Quicklai offers instant AI guidance for small and medium business owners — plus custom AI solutions, AI agents, and automation tools for management and marketing. Leave your details and we'll get back to you.",
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
    a: "The AI advisor and the first conversation are free. Ongoing advisory is discussed then, based on what your business actually needs.",
  },
  {
    q: "What areas does Quicklai advise on?",
    a: "Quicklai focuses on business management and marketing — customer service, lead generation and follow-up, marketing and content, automation, and operations — always with an eye to where AI and automation can help.",
  },
  {
    q: "How do I get started?",
    a: "Ask the AI advisor a question on the homepage, or leave your details and we'll get back to you.",
  },
  {
    q: "What AI solutions does Quicklai build?",
    a: "Quicklai builds custom AI solutions, AI agents, and automation tools for small and medium businesses — including chat assistants, lead qualification and follow-up agents, and workflow automation that removes repetitive manual work.",
  },
];

// AEO: page-level schema + breadcrumbs, linked to the Organization entity.
const thisPageSchema = pageSchema({
  type: "WebPage",
  path: "/services",
  name: "Quicklai services",
  description: metadata.description,
});
const crumbs = breadcrumbSchema([{ name: "Services", path: "/services" }]);
// Each offering as a Service entity, so AI engines can answer questions
// like "who builds AI agents for small businesses".
const servicesSchema = serviceListSchema(services);

export default function Services() {
  return (
    <main>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(thisPageSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(crumbs)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(servicesSchema)}
      />
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
