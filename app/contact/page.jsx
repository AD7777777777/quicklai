import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BookCallButton from "@/components/BookCallButton";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Get in touch with Quicklai — leave your details and we'll get back to you about AI solutions for your small or medium business.",
};

// AEO: page-level schema + breadcrumbs, linked to the Organization entity.
const thisPageSchema = pageSchema({
  type: "ContactPage",
  path: "/contact",
  name: "Contact Quicklai",
  description: metadata.description,
});
const crumbs = breadcrumbSchema([{ name: "Contact", path: "/contact" }]);

export default function Contact() {
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
      <section className="max-w-[560px] mx-auto px-5 pt-16 pb-8 text-center">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          Let's talk.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          Leave your details and we'll get back to you however suits you best —
          call, WhatsApp, or email. It's free and there's no obligation.
        </p>
        <div className="mt-6">
          <BookCallButton source="contact page" />
        </div>
      </section>

      <ContactForm />

      <Footer />
    </main>
  );
}
