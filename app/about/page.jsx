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
    a: "Most SMB owners know AI could help but don't have time to figure out where. Quicklai bridges that gap — it pinpoints your real management and marketing challenges, then recommends specific AI tools it can build to solve them.",
  },
  {
    q: "How is Quicklai different from a search engine?",
    a: "Search gives you generic articles. Quicklai reads your specific situation, then recommends concrete AI tools and automations it can build to fix it — plus a free business mapping call to make it real.",
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
            limited time — and knowing AI could help, but not where to start.
            Quicklai exists to change that.
          </p>
          <p>
            Our AI advisor gets to the core of your management and marketing
            challenges, then recommends specific AI tools and automations we can
            build to solve them. When you're ready, a free 30-minute business
            mapping call turns those recommendations into a real plan.
          </p>
          <p>
            No jargon. No hype. Just practical advice and AI that actually moves
            your business forward.
          </p>
        </div>
      </article>
      <FAQ items={aboutFaqs} />
      <Footer />
    </main>
  );
}
