import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/config";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Quicklai, or book a free 30-minute business mapping call for your small or medium business.",
};

export default function Contact() {
  return (
    <main>
      <Nav />
      <section className="max-w-[560px] mx-auto px-5 pt-16 pb-8 text-center">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          Let's talk.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          Book a free business mapping call, or send us a message and we'll get
          back to you.
        </p>
        <a
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-brand-blue hover:bg-brand-bluehover text-white rounded-full px-7 py-3 text-[16px] font-medium transition-colors"
        >
          Book your free call →
        </a>
      </section>

      <ContactForm />

      <Footer />
    </main>
  );
}
