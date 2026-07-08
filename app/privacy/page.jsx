import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/config";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Quicklai collects, uses, stores, and protects the information you share — including the details you provide to book a free consultation.",
};

// NOTE: This is a clear, honest starting policy written in plain language.
// It is NOT legal advice. Before you launch — and especially before relying on
// the "selected partners" data-sharing clause — have a lawyer review it against
// Israel's Privacy Protection Law and the GDPR (if you serve EU users).

const sections = [
  {
    h: "What this policy covers",
    p: [
      "This policy explains what information Quicklai collects when you use our AI advisor and our website, how we use it, how long we keep it, and the choices you have. By using Quicklai or submitting your details, you agree to the practices described here.",
    ],
  },
  {
    h: "Information we collect",
    p: [
      "When you chat with the AI advisor, we process the messages you send so the advisor can respond and give relevant guidance.",
      "When you ask to book a free consultation, we collect the contact details you provide — your name and phone number — together with a summary of the business context from your conversation, so we can prepare for and schedule your call.",
      "We may also collect basic technical information automatically, such as general usage data, to keep the site working and improve it.",
    ],
  },
  {
    h: "How we use your information",
    p: [
      "We use your information to respond to your questions, to contact you about the free consultation you requested, to schedule and prepare for that call, and to improve our service.",
      "We use the business context from your conversation only to give you more relevant advice and to make your consultation useful.",
    ],
  },
  {
    h: "Sharing with partners",
    p: [
      "When you submit your details to request a consultation, you agree — as part of the consent you give at that point — that we may share your details with selected partners so they can present relevant offers.",
      "You can withdraw this consent at any time by contacting us, and we will stop sharing your details going forward. If you would prefer to request a consultation without agreeing to partner sharing, contact us directly and we'll arrange it.",
    ],
  },
  {
    h: "How long we keep your information",
    p: [
      "We keep your contact details and consultation records for as long as needed to provide our services and to maintain a record of your consent, unless you ask us to delete them sooner.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You have the right to ask what personal information we hold about you, to correct it, and to request that we delete it. You can also withdraw any consent you have given. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    h: "How we protect your information",
    p: [
      "We take reasonable measures to keep your information secure and to limit access to it. No system is perfectly secure, but we work to protect your details from unauthorized access, loss, or misuse.",
    ],
  },
  {
    h: "Contact us",
    p: [
      "If you have any questions about this policy, or you want to access, correct, or delete your information, please reach out through our contact page.",
    ],
  },
];

export default function Privacy() {
  return (
    <main>
      <Nav />
      <article className="max-w-[680px] mx-auto px-5 pt-16 pb-8">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-gray-400 mb-10">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-[20px] font-medium text-gray-900 mb-3">
                {s.h}
              </h2>
              <div className="flex flex-col gap-3">
                {s.p.map((para, j) => (
                  <p
                    key={j}
                    className="text-[16px] text-gray-600 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  );
}
