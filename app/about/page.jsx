import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { pageSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Quicklai helps small and medium business owners get clear, fast, expert guidance — and turn that clarity into action with AI tools we build for them.",
};

const aboutFaqs = [
  {
    q: "Why did Quicklai start?",
    a: "Most SMB owners know AI could help but don't have time to figure out where. Quicklai bridges that gap — it pinpoints your real management and marketing challenges, then recommends specific AI tools it can build to solve them.",
  },
  {
    q: "How is Quicklai different from a search engine?",
    a: "Search gives you generic articles. Quicklai reads your specific situation, then recommends concrete AI tools and automations it can build to fix it — and gets back to you to make it real.",
  },
];

// AEO: page-level schema + breadcrumbs, linked to the Organization entity.
const thisPageSchema = pageSchema({
  type: "AboutPage",
  path: "/about",
  name: "About Quicklai",
  description: metadata.description,
});
const crumbs = breadcrumbSchema([{ name: "About", path: "/about" }]);

export default function About() {
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
            build to solve them. When you're ready, leave your details and we'll
            get back to you to turn those recommendations into a real plan.
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
