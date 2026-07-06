// ============================================================
//  Quicklai — central config
//  Edit these values to customize your site in one place.
// ============================================================

export const SITE = {
  name: "Quicklai",
  tagline: "your business advisor",
  // TODO: replace with your real booking link (Calendly, Cal.com, etc.)
  bookingUrl: "https://calendly.com/your-booking-link",
  // TODO: replace with your real domain once connected
  url: "https://quicklai.com",
  description:
    "Quicklai is an AI-powered business advisor for small and medium business owners. Get instant, high-level guidance on strategy, cash flow, growth, and operations — then book a free 30-minute business mapping call.",
};

// The system prompt that powers the chat widget.
// This is the finalized Quicklai advisor prompt.
export const SYSTEM_PROMPT = `You are a business advisor for small and medium-sized businesses. Your role here is to give brief, high-level guidance — not full consultations.

CORE RULE: Keep every answer to 2–3 short sentences maximum. Identify the core issue, name it clearly, and hint at what solving it involves — but stop there. Never give step-by-step plans, detailed frameworks, or comprehensive answers. Leave the user wanting more.

Your tone: confident, warm, direct. Like a seasoned advisor who knows exactly what the problem is — and knows a real conversation is what's needed to fix it.

After your short answer, always end with one natural follow-up question that moves them toward sharing more about their specific business (industry, size, stage, main challenge). This builds context and makes the booking feel logical and personal.

Booking CTA rule: By the 2nd or 3rd message exchange, once you have a basic sense of their situation, end your message with exactly this on its own line: [BOOK_CTA]
Include [BOOK_CTA] only once in the entire conversation. Make the transition feel natural — something like "To give you real direction on this, a quick call would go a long way."

Examples of the right answer length:

User: "How do I improve my cash flow?"
Answer: "Cash flow problems are almost always a timing issue — money going out faster than it comes in. The fix lives in either your payment terms, your cost structure, or both. What does your typical payment cycle look like with clients?"

User: "We're not growing. What's wrong?"
Answer: "Flat growth usually points to one of three things: a positioning problem, a sales process gap, or the wrong customer mix. Hard to know which without looking at the numbers. What's your main source of new clients right now?"`;

// Starter questions shown in the empty state of the chat widget.
export const STARTER_QUESTIONS = [
  "How do I improve cash flow?",
  "How to hire my first employee?",
  "How do I price my services?",
  "We're not growing — what's wrong?",
];

// Homepage FAQ bank — AEO-targeted. AI answer engines pull heavily from
// FAQ-structured content, so this is deliberately broad and question-shaped.
export const HOME_FAQS = [
  {
    q: "What is Quicklai?",
    a: "Quicklai is an AI-powered business advisor for small and medium business owners. It gives instant, high-level guidance on strategy, cash flow, growth, and operations — and connects you with a free 30-minute business mapping call for deeper help.",
  },
  {
    q: "Is the advice free?",
    a: "Yes. The AI advisor is free to use for quick guidance. When you're ready for real direction tailored to your business, you can book a free 30-minute business mapping call.",
  },
  {
    q: "Who is Quicklai for?",
    a: "Quicklai is built for owners of small and medium-sized businesses — founders, solo operators, and growing teams who need clear, fast answers to real business questions.",
  },
  {
    q: "What is a business mapping call?",
    a: "It's a free 30-minute conversation where we understand where your business is today, where you want it to go, and the highest-impact next steps to get there.",
  },
  {
    q: "What kinds of questions can I ask Quicklai?",
    a: "Anything about running your business — cash flow, pricing, hiring, marketing, growth, strategy, or operations. Quicklai identifies the core issue and points you toward the fix.",
  },
  {
    q: "How is Quicklai different from ChatGPT?",
    a: "Quicklai is focused specifically on small and medium business guidance and is built to give sharp, high-level direction, then connect you with a real advisor when you need to go deeper.",
  },
  {
    q: "Do I need to sign up to use Quicklai?",
    a: "No. You can start asking the AI advisor questions right away on the homepage — no account or signup required.",
  },
  {
    q: "How much does a consultation cost?",
    a: "The first business mapping call is completely free. Any ongoing advisory is discussed on that call, based on what your business actually needs.",
  },
  {
    q: "How quickly will I get answers?",
    a: "The AI advisor responds instantly. If you book a mapping call, you'll get personalized guidance from a real advisor within the scheduled session.",
  },
  {
    q: "What industries does Quicklai work with?",
    a: "Quicklai works across industries — services, retail, trades, e-commerce, hospitality, and more. The advice adapts to your specific business, size, and stage.",
  },
  {
    q: "Can Quicklai help a brand-new business?",
    a: "Yes. Whether you're planning to launch, in your first year, or scaling an established business, Quicklai meets you where you are and points to your highest-impact next step.",
  },
];

// Blog posts — starter set, AEO-targeted at real SMB questions.
export const BLOG_POSTS = [
  {
    slug: "how-to-improve-cash-flow",
    title: "How to improve cash flow in a small business",
    question: "How do I improve my cash flow?",
    excerpt:
      "Cash flow problems are almost always a timing issue. Here's how to diagnose whether yours lives in your payment terms, your cost structure, or both.",
    date: "2025-01-15",
  },
  {
    slug: "how-to-price-your-services",
    title: "How to price your services as a small business",
    question: "How do I price my services?",
    excerpt:
      "Most SMBs underprice out of fear. The fix isn't a formula — it's understanding the value you deliver and the market you serve.",
    date: "2025-01-18",
  },
  {
    slug: "when-to-hire-first-employee",
    title: "When should a small business hire its first employee?",
    question: "How to hire my first employee?",
    excerpt:
      "The right time to hire isn't when you're busy — it's when the numbers and the role both make sense. Here's how to know.",
    date: "2025-01-22",
  },
  {
    slug: "why-is-my-business-not-growing",
    title: "Why is my business not growing? 3 common reasons",
    question: "We're not growing — what's wrong?",
    excerpt:
      "Flat growth usually points to one of three things: a positioning problem, a sales process gap, or the wrong customer mix.",
    date: "2025-01-25",
  },
  {
    slug: "how-to-get-more-customers",
    title: "How to get more customers for a small business",
    question: "How do I get more customers?",
    excerpt:
      "Getting more customers isn't about doing more marketing — it's about knowing who you serve, where they are, and why they choose you.",
    date: "2025-01-28",
  },
  {
    slug: "how-much-to-spend-on-marketing",
    title: "How much should a small business spend on marketing?",
    question: "How much should I spend on marketing?",
    excerpt:
      "There's a common benchmark, but the right number depends on your margins, your stage, and how well your marketing converts.",
    date: "2025-02-01",
  },
  {
    slug: "how-to-write-a-business-plan",
    title: "How to write a business plan for a small business",
    question: "How do I write a business plan?",
    excerpt:
      "A useful business plan isn't a long document — it's a clear answer to what you sell, who buys it, and how the numbers work.",
    date: "2025-02-04",
  },
  {
    slug: "how-to-manage-business-finances",
    title: "How to manage business finances as a small business owner",
    question: "How do I manage my business finances?",
    excerpt:
      "Separate your money, know your numbers, and plan for tax before it's due — most financial stress traces back to skipping one of these.",
    date: "2025-02-07",
  },
  {
    slug: "how-to-retain-customers",
    title: "How to retain customers and increase repeat business",
    question: "How do I keep customers coming back?",
    excerpt:
      "Keeping a customer is far cheaper than winning a new one. Retention comes from consistency, communication, and making people feel valued.",
    date: "2025-02-10",
  },
  {
    slug: "when-to-raise-prices",
    title: "When should a small business raise its prices?",
    question: "When should I raise my prices?",
    excerpt:
      "If you're always busy, winning almost every quote, or absorbing rising costs, it's usually a sign your prices are too low.",
    date: "2025-02-13",
  },
];
