import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BookCallButton from "@/components/BookCallButton";

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
        <div className="mt-6">
          <BookCallButton source="contact page" />
        </div>
      </section>

      <ContactForm />

      <Footer />
    </main>
  );
}
