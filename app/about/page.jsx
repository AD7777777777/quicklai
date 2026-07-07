import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "About",
  description:
    "Quicklai helps small and medium business owners get clear, fast, expert guidance — and turn that clarity into action with a free business mapping call.",
};

const aboutFaqs = [
  {
    q: "Why did Quicklai start?",
    a: "Most SMB owners can't afford a full-time advisor, and generic advice online doesn't fit their specific situation. Quicklai bridges that gap — instant guidance first, then a real human conversation when it matters.",
  },
  {
    q: "How is Quicklai different from a search engine?",
    a: "Search gives you articles. Quicklai gives you a direct read on your specific problem in plain language, then a path to real help — a free business mapping call.",
  },
];

export default function About() {
  return (
    <main>
      <Nav />
      <article className="max-w-[680px] mx-auto px-5 pt-16 pb-4">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-6">
          Clear advice, built for business owners.
        </h1>
        <div className="prose text-[17px] text-gray-600 leading-relaxed flex flex-col gap-5">
          <p>
            Running a small or medium business means making big decisions with
            limited time and no one to check your thinking. Quicklai exists to
            change that.
          </p>
          <p>
            We combine an AI business advisor — trained to cut straight to the
            core of your challenge — with real human consultation. The AI gives
            you fast, high-level direction. When you need to go deeper, a free
            30-minute business mapping call turns that direction into a plan.
          </p>
          <p>
            No jargon. No fluff. Just the kind of straight talk that helps you
            move forward with confidence.
          </p>
        </div>
      </article>
      <FAQ items={aboutFaqs} />
      <Footer />
    </main>
  );
}
